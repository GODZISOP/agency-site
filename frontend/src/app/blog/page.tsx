import Image from 'next/image';
import Link from 'next/link';
import { blogPosts } from '@/data/content';
import styles from './Blog.module.css';
import GSAPWrapper from '@/components/GSAPWrapper';
import { supabase } from '@/lib/supabase';

// Use zero config for revalidation to ensure fresh data
export const revalidate = 0;

export default async function BlogPage() {
  // Fetch dynamic blogs from Supabase
  const { data: dynamicBlogs } = await supabase.from('blogs').select('*').order('created_at', { ascending: false });
  
  // Format dynamic blogs to match the expected structure
  const formattedDynamicBlogs = (dynamicBlogs || []).map(b => ({
    title: b.title,
    date: b.date,
    url: b.slug,
    image: b.image_url,
    comments: 0
  }));

  // Combine dynamic and static blogs
  const allPosts = [...formattedDynamicBlogs, ...blogPosts];

  return (
    <GSAPWrapper>
      <div className={styles.blogPage}>
        <section className="section-padding">
          <div className="container">
            <div className={`${styles.header} reveal`}>
              <span className={styles.tagline}>Insights & News</span>
              <h1 className={styles.title}>Our <span className="gradient-text">Journal</span></h1>
              <p className={styles.subtitle}>Stay updated with the latest trends and strategies in the e-commerce world.</p>
            </div>

            <div className={styles.blogGrid}>
              {allPosts.map((post, index) => (
                <div key={index} className={`${styles.blogCard} reveal`}>
                  <div className={styles.imageWrapper}>
                    <Image 
                      src={post.image || `https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=60&w=800&sig=${index}`} 
                      alt={post.title}
                      fill
                      style={{ objectFit: 'cover' }}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      quality={50}
                    />
                  </div>
                  <div className={styles.content}>
                    <span className={styles.date}>{post.date}</span>
                    <h3 className={styles.postTitle}>{post.title}</h3>
                    <Link href={`/blog/${post.url}`} className={styles.readMore}>
                      Read Article <span>&rarr;</span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </GSAPWrapper>
  );
}
