import { blogPosts } from '@/data/content';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import styles from './BlogPost.module.css';
import GSAPWrapper from '@/components/GSAPWrapper';
import { supabase } from '@/lib/supabase';

// Use zero config for revalidation to ensure fresh data
export const revalidate = 0;

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  // Try fetching from Supabase first
  const { data: dbPost } = await supabase.from('blogs').select('*').eq('slug', slug).single();
  
  // Fallback to static post
  const staticPost = blogPosts.find((p) => p.url === slug);
  
  if (!dbPost && !staticPost) {
    notFound();
  }

  // Normalize data format
  const post = dbPost ? {
    title: dbPost.title,
    date: dbPost.date,
    image: dbPost.image_url,
    content: dbPost.content
  } : {
    title: staticPost!.title,
    date: staticPost!.date,
    image: `https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200`,
    content: `At EcomJump, we believe that success in e-commerce requires a blend of creativity, data, and persistence. This article explores how you can leverage modern digital strategies to grow your brand across global marketplaces like Amazon, TikTok Shop, and Shopify.\n\nKey Takeaways:\n- Understanding platform-specific algorithms is crucial for visibility.\n- Data-driven market research reduces the risk of failed product launches.\n- Compliance and legal stability are the foundations of long-term business growth.\n\nWhether you are just starting or looking to scale an existing business, our team is here to support you every step of the way. From account setup to performance marketing, we handle the complexities so you can focus on your vision.`
  };

  return (
    <GSAPWrapper>
      <div className={styles.postPage}>
        <section className="section-padding">
          <div className="container">
            <div className={styles.postHeader}>
              <span className={styles.date}>{post.date}</span>
              <h1 className={styles.title}>{post.title}</h1>
            </div>
            
            <div className={styles.imageWrapper}>
              <Image 
                src={post.image || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200"} 
                alt={post.title}
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>

            <div className={styles.content}>
              {/* Render content dynamically. If it's plain text with newlines, we can use CSS white-space pre-wrap or split by newline. */}
              <div style={{ whiteSpace: 'pre-wrap', lineHeight: '1.8', fontSize: '1.2rem', color: 'var(--text-main)' }}>
                {post.content}
              </div>
            </div>
          </div>
        </section>
      </div>
    </GSAPWrapper>
  );
}
