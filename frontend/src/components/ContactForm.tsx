"use client";

import { useState } from "react";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import styles from "./ContactForm.module.css";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "E-Commerce Account",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      // 1. Save to Supabase
      const { error: supabaseError } = await supabase
        .from("contacts")
        .insert([
          {
            name: formData.name,
            email: formData.email,
            service: formData.service,
            message: formData.message,
          },
        ]);

      if (supabaseError) throw supabaseError;

      // 2. Send Email via Formsubmit.co using the secure token
      const emailResponse = await fetch("https://formsubmit.co/ajax/3ea7e17d3f4981ac81c48d6ac0b05abc", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          _subject: `New Lead: ${formData.name} - ${formData.service}`,
          _template: "box", // Sends a professionally styled HTML email
          _replyto: formData.email, // Allows you to reply directly to the sender
          "Client Name": formData.name,
          "Contact Email": formData.email,
          "Requested Service": formData.service,
          "Project Details": formData.message,
        }),
      });

      if (!emailResponse.ok) throw new Error("Failed to send email");

      setStatus("success");
      setFormData({ name: "", email: "", service: "E-Commerce Account", message: "" });
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  return (
    <section className={`${styles.contactSection} section-padding reveal`}>
      <div className="container">
        <div className={styles.grid}>
          <div className={styles.imageWrapper}>
            <Image
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800"
              alt="Contact EcomJump Team"
              fill
              style={{ objectFit: "cover" }}
              className={styles.image}
            />
            <div className={styles.imageOverlay}>
              <h3>Let's Build Together</h3>
              <p>Our experts will get back to you within 24 hours.</p>
            </div>
          </div>

          <div className={styles.formContainer}>
            <h2 className={styles.title}>
              Get In <span className="gradient-text">Touch</span>
            </h2>
            <p className={styles.subtitle}>Ready to scale your e-commerce business? Drop us a line.</p>

            {status === "success" ? (
              <div className={styles.successMessage}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                <p>Message sent successfully! We will contact you soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.inputGroup}>
                  <label htmlFor="name">Full Name</label>
                  <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required placeholder="John Doe" />
                </div>
                <div className={styles.inputGroup}>
                  <label htmlFor="email">Email Address</label>
                  <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required placeholder="john@example.com" />
                </div>
                <div className={styles.inputGroup}>
                  <label htmlFor="service">Service Interested In</label>
                  <select id="service" name="service" value={formData.service} onChange={handleChange}>
                    <option value="E-Commerce Account">E-Commerce Account</option>
                    <option value="Business & Legal">Business & Legal</option>
                    <option value="Product & Market Research">Product & Market Research</option>
                    <option value="Store Development & Branding">Store Development & Branding</option>
                    <option value="Marketing & Growth">Marketing & Growth</option>
                    <option value="Operations & Logistics">Operations & Logistics</option>
                    <option value="Training & Consultancy">Training & Consultancy</option>
                  </select>
                </div>
                <div className={styles.inputGroup}>
                  <label htmlFor="message">Message</label>
                  <textarea id="message" name="message" value={formData.message} onChange={handleChange} required placeholder="Tell us about your project..."></textarea>
                </div>
                
                {status === "error" && <p className={styles.errorText}>Something went wrong. Please try again.</p>}

                <button type="submit" className="btn-primary" disabled={status === "loading"} style={{ width: "100%" }}>
                  {status === "loading" ? "Sending..." : "Send Message"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
