import { faqs } from '@/data/content';
import styles from './FAQs.module.css';
import GSAPWrapper from '@/components/GSAPWrapper';

export default function FAQsPage() {
  return (
    <GSAPWrapper>
      <div className={styles.faqsPage}>
        <section className="section-padding">
          <div className="container">
            <div className={`${styles.header} reveal`}>
              <span className={styles.tagline}>Common Questions</span>
              <h1 className={styles.title}>Everything You Need to <span className="gradient-text">Know</span></h1>
              <p className={styles.subtitle}>Find answers to the most common questions about our services and e-commerce management.</p>
            </div>

            <div className={styles.faqGrid}>
              {faqs.map((faq, index) => (
                <div key={index} className={`${styles.faqCard} reveal`}>
                  <h3 className={styles.question}>{faq.q}</h3>
                  <p className={styles.answer}>{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Still have questions? */}
        <section className={`${styles.contactSection} section-padding reveal`}>
          <div className="container">
            <div className={styles.contactBox}>
              <h2>Still Have Questions?</h2>
              <p>Our team of experts is ready to help you with your specific e-commerce needs.</p>
              <a href="/contact" className="btn-primary">Get in Touch</a>
            </div>
          </div>
        </section>
      </div>
    </GSAPWrapper>
  );
}
