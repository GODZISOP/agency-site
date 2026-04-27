"use client";
import styles from './Contact.module.css';
import GSAPWrapper from '@/components/GSAPWrapper';

export default function ContactPage() {
  return (
    <GSAPWrapper>
      <div className={styles.contactPage}>
        <section className="section-padding">
          <div className="container">
            <div className={styles.grid}>
              <div className="reveal">
                <span className={styles.tagline}>Get In Touch</span>
                <h1 className={styles.title}>Ready to <span className="gradient-text">Launch</span>?</h1>
                <p className={styles.description}>
                  Fill out the form below or reach out directly to schedule a free consultation with our e-commerce experts.
                </p>
                
                <div className={styles.info}>
                  <div className={styles.infoItem}>
                    <h4>Email</h4>
                    <p>hello@ecomjump.com</p>
                  </div>
                  <div className={styles.infoItem}>
                    <h4>Phone</h4>
                    <p>+1 (555) 123-4567</p>
                  </div>
                  <div className={styles.infoItem}>
                    <h4>Global Offices</h4>
                    <p>USA, UK, UAE, Pakistan</p>
                  </div>
                </div>
              </div>

              <div className={`${styles.formWrapper} reveal`}>
                <form className={styles.form}>
                  <div className={styles.inputGroup}>
                    <label>Full Name</label>
                    <input type="text" placeholder="John Doe" required />
                  </div>
                  <div className={styles.inputGroup}>
                    <label>Email Address</label>
                    <input type="email" placeholder="john@example.com" required />
                  </div>
                  <div className={styles.inputGroup}>
                    <label>Service Interested In</label>
                    <select>
                      <option>E-Commerce Account</option>
                      <option>Business & Legal</option>
                      <option>Product Research</option>
                      <option>Marketing & Growth</option>
                    </select>
                  </div>
                  <div className={styles.inputGroup}>
                    <label>Message</label>
                    <textarea placeholder="Tell us about your project..."></textarea>
                  </div>
                  <button type="submit" className="btn-primary" onClick={(e) => e.preventDefault()}>Send Message</button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </GSAPWrapper>
  );
}
