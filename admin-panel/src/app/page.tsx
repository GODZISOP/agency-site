"use client";

import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import styles from "./page.module.css";

type Blog = {
  id: string;
  slug: string;
  title: string;
  date: string;
  content: string;
  image_url: string;
  created_at: string;
};

type FormState = { title: string; slug: string; date: string; image_url: string; content: string };

const ADMIN_PASSWORD = "admin123";

// ─── Utility: format today's date e.g. "April 27, 2025" ───
function todayFormatted() {
  return new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

// ─── EXTRACTED OUTSIDE COMPONENT — fixes typing issue ───
function BlogForm({
  form,
  onSubmit,
  onChange,
  onCancel,
  status,
  statusMsg,
  title,
}: {
  form: FormState;
  onSubmit: (e: React.FormEvent) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onCancel: () => void;
  status: string;
  statusMsg: string;
  title: string;
}) {
  return (
    <div className={styles.formWrap}>
      <div className={styles.formHeader}>
        <button className={styles.backBtn} onClick={onCancel}>← Back</button>
        <h2>{title}</h2>
      </div>
      <form onSubmit={onSubmit} className={styles.form}>
        <div className={styles.field}>
          <label>Post Title *</label>
          <input
            name="title"
            value={form.title}
            onChange={onChange}
            required
            placeholder="e.g. 10 Tips for Amazon FBA Success"
          />
        </div>
        <div className={styles.row}>
          <div className={styles.field}>
            <label>URL Slug (auto-generated)</label>
            <input
              name="slug"
              value={form.slug}
              onChange={onChange}
              required
              placeholder="10-tips-for-amazon-fba"
            />
          </div>
          <div className={styles.field}>
            <label>Publish Date</label>
            <input
              name="date"
              value={form.date}
              onChange={onChange}
              required
              placeholder="e.g. April 27, 2025"
            />
            <small style={{ color: "var(--text-dim)", fontSize: "0.78rem" }}>Auto-filled with today. You can edit it.</small>
          </div>
        </div>
        <div className={styles.field}>
          <label>Cover Image URL *</label>
          <input
            name="image_url"
            value={form.image_url}
            onChange={onChange}
            required
            placeholder="https://images.unsplash.com/photo-..."
          />
          {form.image_url && (
            <div className={styles.preview}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={form.image_url}
                alt="Preview"
                onError={(e) => (e.currentTarget.style.display = "none")}
              />
            </div>
          )}
        </div>
        <div className={styles.field}>
          <label>Content *</label>
          <textarea
            name="content"
            value={form.content}
            onChange={onChange}
            required
            placeholder="Write your full blog post here..."
          />
        </div>
        {status === "success" && <div className={styles.success}>{statusMsg}</div>}
        {status === "error" && <div className={styles.error}>{statusMsg}</div>}
        <div className={styles.actions}>
          <button type="button" className={styles.cancelBtn} onClick={onCancel}>Cancel</button>
          <button type="submit" className={styles.submitBtn} disabled={status === "loading"}>
            {status === "loading" ? "Saving..." : "Save Post"}
          </button>
        </div>
      </form>
    </div>
  );
}

// ─── MAIN ADMIN PAGE ───
export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [view, setView] = useState<"list" | "add" | "edit">("list");
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [statusMsg, setStatusMsg] = useState("");

  const newForm = (): FormState => ({
    title: "",
    slug: "",
    date: todayFormatted(),
    image_url: "",
    content: "",
  });

  const [form, setForm] = useState<FormState>(newForm);

  const fetchBlogs = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from("blogs")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      setBlogs(data || []);
    } catch (err: any) {
      console.error("Error fetching blogs:", err);
      setStatus("error");
      setStatusMsg("Failed to load blogs: " + err.message);
    }
  }, []);

  useEffect(() => {
    if (authed) fetchBlogs();
  }, [authed, fetchBlogs]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) setAuthed(true);
    else alert("Wrong password!");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "title"
        ? { slug: value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") }
        : {}),
    }));
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    const { error } = await supabase.from("blogs").insert([form]);
    if (error) { setStatus("error"); setStatusMsg(error.message); return; }
    setStatus("success");
    setStatusMsg("✅ Blog published successfully!");
    setForm(newForm());
    fetchBlogs();
    setTimeout(() => { setStatus("idle"); setView("list"); }, 1800);
  };

  const handleEditOpen = (blog: Blog) => {
    setEditingBlog(blog);
    setForm({ title: blog.title, slug: blog.slug, date: blog.date, image_url: blog.image_url, content: blog.content });
    setView("edit");
  };

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBlog) return;
    setStatus("loading");
    try {
      const { error } = await supabase.from("blogs").update(form).eq("id", editingBlog.id);
      if (error) throw error;
      setStatus("success");
      setStatusMsg("✅ Blog updated successfully!");
      await fetchBlogs();
      setTimeout(() => { setStatus("idle"); setView("list"); }, 1500);
    } catch (err: any) {
      setStatus("error");
      setStatusMsg(err.message || "Failed to update blog");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this blog post?")) return;
    try {
      const { error } = await supabase.from("blogs").delete().eq("id", id);
      if (error) throw error;
      await fetchBlogs();
    } catch (err: any) {
      alert("Error deleting blog: " + err.message);
    }
  };

  const handleRefresh = async () => {
    setStatus("loading");
    await fetchBlogs();
    setStatus((prev) => (prev === "loading" ? "idle" : prev));
  };

  const goToAdd = () => { setForm(newForm()); setStatus("idle"); setView("add"); };
  const goToList = () => { setStatus("idle"); setView("list"); };

  /* ─── Login Screen ─── */
  if (!authed)
    return (
      <div className={styles.loginWrap}>
        <div className={styles.loginCard}>
          <div className={styles.loginLogo}>
            <span className={styles.orange}>Ecom</span>Jump
          </div>
          <h1>Admin Panel</h1>
          <p>Sign in to manage your blog content</p>
          <form onSubmit={handleLogin} className={styles.loginForm}>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">Sign In</button>
          </form>
          <small>Default password: <strong>admin123</strong></small>
        </div>
      </div>
    );

  /* ─── Main Admin UI ─── */
  return (
    <div className={styles.wrap}>
      {/* Mobile Header */}
      <header className={styles.mobileHeader}>
        <div className={styles.logo}>EcomJump</div>
        <button onClick={() => setAuthed(false)}>Logout</button>
      </header>

      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarLogo}>
          <span className={styles.orange}>Ecom</span>Jump
        </div>
        <nav className={styles.nav}>
          <button
            className={`${styles.navItem} ${view === "list" ? styles.active : ""}`}
            onClick={goToList}
          >
            📝 Blog Posts
          </button>
          <button
            className={`${styles.navItem} ${view === "add" ? styles.active : ""}`}
            onClick={goToAdd}
          >
            ➕ Add New Post
          </button>
        </nav>
        <div className={styles.sidebarFooter}>
          <button onClick={() => setAuthed(false)} className={styles.logoutBtn}>
            🚪 Logout
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className={styles.main}>
        {/* Blog List */}
        {view === "list" && (
          <div>
            <div className={styles.pageHeader}>
              <div>
                <h1>Blog Posts</h1>
                <p>{blogs.length} post{blogs.length !== 1 ? "s" : ""} published</p>
              </div>
              <div style={{ display: "flex", gap: "10px" }}>
                <button className={styles.cancelBtn} onClick={handleRefresh}>
                  🔄 Refresh
                </button>
                <button className={styles.addBtn} onClick={goToAdd}>
                  + New Post
                </button>
              </div>
            </div>
            {blogs.length === 0 ? (
              <div className={styles.empty}>
                <p>No blog posts yet.</p>
                <button className={styles.addBtn} onClick={goToAdd}>
                  Create your first post
                </button>
              </div>
            ) : (
              <div className={styles.table}>
                <div className={styles.tableHead}>
                  <span>Title</span>
                  <span>Date</span>
                  <span>Actions</span>
                </div>
                {blogs.map((blog) => (
                  <div key={blog.id} className={styles.tableRow}>
                    <div className={styles.blogTitle}>
                      {blog.image_url && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={blog.image_url}
                          alt=""
                          className={styles.thumb}
                          onError={(e) => (e.currentTarget.style.display = "none")}
                        />
                      )}
                      <div>
                        <strong>{blog.title}</strong>
                        <small>/{blog.slug}</small>
                      </div>
                    </div>
                    <span className={styles.date}>{blog.date}</span>
                    <div className={styles.rowActions}>
                      <button className={styles.editBtn} onClick={() => handleEditOpen(blog)}>
                        Edit
                      </button>
                      <button className={styles.deleteBtn} onClick={() => handleDelete(blog.id)}>
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {view === "add" && (
          <BlogForm
            form={form}
            onSubmit={handleAdd}
            onChange={handleChange}
            onCancel={goToList}
            status={status}
            statusMsg={statusMsg}
            title="Add New Post"
          />
        )}
        {view === "edit" && (
          <BlogForm
            form={form}
            onSubmit={handleEdit}
            onChange={handleChange}
            onCancel={goToList}
            status={status}
            statusMsg={statusMsg}
            title="Edit Post"
          />
        )}
      </main>
    </div>
  );
}
