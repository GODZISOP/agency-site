import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.grid}>
          <div className={styles.brand}>
            <Link href="/" className={styles.logo}>
              ECOM<span>JUMP</span>
            </Link>
            <p>Empowering global e-commerce sellers with end-to-end account management, legal support, and growth strategies.</p>
          </div>
          
          <div className={styles.links}>
            <h4 className={styles.title}>Quick Links</h4>
            <ul>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/faqs">FAQs</Link></li>
              <li><Link href="/blog">Blog</Link></li>
              <li><Link href="/contact">Contact Us</Link></li>
            </ul>
          </div>
          
          <div className={styles.contact}>
            <h4 className={styles.title}>Connect</h4>
            <p>Email: hello@ecomjump.com</p>
            <p>Location: USA, UK, UAE, Pakistan</p>
            <div className={styles.socials}>
              {/* Social icons would go here */}
            </div>
          </div>
        </div>
        
        <div className={styles.bottom}>
          <p>&copy; {new Date().getFullYear()} ECOMJUMP. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
