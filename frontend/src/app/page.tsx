import Link from 'next/link';
import Image from 'next/image';
import styles from './page.module.css';
import { services } from '@/data/content';
import GSAPWrapper from '@/components/GSAPWrapper';

import ContactForm from '@/components/ContactForm';

export default function Home() {
  return (
    <GSAPWrapper>
      <div className={styles.home}>
        {/* Hero Section */}
        <section className={`${styles.hero} hero-section`}>
          <div className={`${styles.heroBg} hero-bg-img`}>
            <Image 
              src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=60&w=1200" 
              alt="ECOMJUMP Growth" 
              fill 
              priority
              sizes="(max-width: 991px) 100vw, 50vw"
              style={{ objectFit: 'cover' }}
            />
          </div>
          <div className="container">
            <div className={`${styles.heroContent} hero-content`}>
              <span className={styles.tagline}>Leading E-Commerce Agency</span>
              <h1 className={styles.headline}>
                Accelerate Your <span className="gradient-text">Global Sales</span>
              </h1>
              <p className={styles.description}>
                Trusted by 500+ sellers worldwide to manage accounts, legal compliance, 
                and performance marketing on Amazon, TikTok Shop, and Shopify.
              </p>
              <div className={styles.ctaGroup}>
                <Link href="/contact" className="btn-primary" prefetch={true}>Get Started Now</Link>
                <Link href="/services/e-commerce-account" className={styles.btnSecondary} prefetch={true}>View Our Services</Link>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <div className="container">
          <section className={`${styles.stats} reveal`}>
            <div className={styles.statsGrid}>
              <div className={styles.statItem}>
                <div className={styles.statValue}>96%</div>
                <div className={styles.statLabel}>Success Rate</div>
              </div>
              <div className={styles.statItem}>
                <div className={styles.statValue}>10+</div>
                <div className={styles.statLabel}>Marketplaces</div>
              </div>
              <div className={styles.statItem}>
                <div className={styles.statValue}>500+</div>
                <div className={styles.statLabel}>Global Clients</div>
              </div>
              <div className={styles.statItem}>
                <div className={styles.statValue}>24/7</div>
                <div className={styles.statLabel}>Expert Support</div>
              </div>
            </div>
          </section>
        </div>

        {/* Services Overview */}
        <section className="section-padding">
          <div className="container">
            <div className="reveal">
              <h2 className={styles.sectionTitle}>Our <span className="gradient-text">Core Solutions</span></h2>
              <p className={styles.sectionSub}>End-to-end expertise for every stage of your e-commerce journey.</p>
            </div>
            
            <div className={styles.servicesGrid}>
              {services.map((service) => (
                <Link href={`/services/${service.id}`} key={service.id} className="glass-card reveal" prefetch={true}>
                  <div className={styles.serviceIcon}>
                    <div className={styles.iconCircle}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                    </div>
                  </div>
                  <h3 className={styles.serviceTitle}>{service.title}</h3>
                  <p className={styles.serviceDesc}>{service.tagline}</p>
                  <span className={styles.learnMore}>Explore Solution <span>&rarr;</span></span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Feature Section with Unsplash Image */}
        <section className={`${styles.whyUs} section-padding`}>
          <div className="container">
            <div className={styles.whyGrid}>
              <div className="reveal">
                <h2 className={styles.whyTitle}>Why <span className="gradient-text">EcomJump</span>?</h2>
                <div className={styles.pillarList}>
                  <div className={styles.pillar}>
                    <div className={styles.pillarInfo}>
                      <h4 className={styles.pillarTitle}>Global Reach & Compliance</h4>
                      <p className={styles.pillarText}>We handle legalities in USA, UK, UAE, and beyond so you can sell without borders.</p>
                    </div>
                  </div>
                  <div className={styles.pillar}>
                    <div className={styles.pillarInfo}>
                      <h4 className={styles.pillarTitle}>Data-Driven Growth</h4>
                      <p className={styles.pillarText}>Our research team identifies high-demand niches and winning products using real marketplace data.</p>
                    </div>
                  </div>
                  <div className={styles.pillar}>
                    <div className={styles.pillarInfo}>
                      <h4 className={styles.pillarTitle}>Account Reinstatement</h4>
                      <p className={styles.pillarText}>Experts in getting suspended accounts back online quickly and safely.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className={`${styles.whyImage} reveal`}>
                <Image 
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=60&w=800" 
                  alt="Data Analytics" 
                  fill 
                  loading="lazy"
                  sizes="(max-width: 991px) 100vw, 50vw"
                  style={{ objectFit: 'cover' }}
                />
                <div className={`${styles.floatingCard} floating-card`}>
                  <p>92% ROI <br/>Improvement</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <ContactForm />
      </div>
    </GSAPWrapper>
  );
}
