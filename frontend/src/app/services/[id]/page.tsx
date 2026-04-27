import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { services } from '@/data/content';
import styles from './Service.module.css';
import GSAPWrapper from '@/components/GSAPWrapper';

export default async function ServicePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const service = services.find((s) => s.id === id);

  if (!service) {
    notFound();
  }

  return (
    <GSAPWrapper>
      <div className={styles.servicePage}>
        {/* Service Hero */}
        <section className={styles.hero}>
          <div className={styles.heroBg}>
            {service.heroImage && (
              <Image 
                src={service.heroImage} 
                alt={`${service.title} Hero`} 
                fill 
                style={{ objectFit: 'cover' }} 
                priority
                sizes="100vw"
                quality={60}
              />
            )}
            <div className={styles.heroOverlay}></div>
          </div>
          <div className="container relative z-10">
            <div className={`${styles.heroContent} hero-content`}>
              <span className={styles.tagline}>{service.tagline}</span>
              <h1 className={styles.headline}>{service.headline}</h1>
              <p className={styles.description}>{service.description}</p>
              <div className={styles.statBadge}>{service.stat}</div>
            </div>
          </div>
        </section>

        {/* Sub-Services Grid */}
        <section className="section-padding">
          <div className="container">
            <h2 className={`${styles.sectionTitle} reveal`}>Our <span className="gradient-text">Expertise</span></h2>
            <div className={styles.subServicesGrid}>
              {service.subServices.map((sub, index) => (
                <div key={index} className="glass-card reveal" style={{ padding: 0, overflow: 'hidden' }}>
                  <div className={styles.subImageWrapper}>
                    {sub.image && (
                      <Image 
                        src={sub.image} 
                        alt={sub.name} 
                        fill 
                        style={{ objectFit: 'cover' }} 
                        sizes="(max-width: 768px) 100vw, 33vw"
                        quality={50}
                      />
                    )}
                  </div>
                  <div className={styles.subContent}>
                    <h3 className={styles.subTitle}>{sub.name}</h3>
                    <ul className={styles.subList}>
                      {sub.details.map((detail, dIndex) => (
                        <li key={dIndex}>{detail}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4 Key Pillars with Stats Image */}
        <section className={`${styles.pillarsSection} section-padding`}>
          <div className="container">
            <div className={styles.statsGrid}>
              <div className={`${styles.statsImageWrapper} reveal`}>
                {service.statsImage && (
                  <Image 
                    src={service.statsImage} 
                    alt={`${service.title} Stats`} 
                    fill 
                    style={{ objectFit: 'cover' }} 
                    sizes="(max-width: 1200px) 100vw, 40vw"
                    quality={60}
                  />
                )}
              </div>
              <div className={styles.pillarsContainer}>
                <h2 className="reveal">Why Choose Our {service.title}?</h2>
                <div className={styles.pillarsGrid}>
                  {service.pillars.map((pillar, index) => (
                    <div key={index} className={`${styles.pillarCard} reveal`}>
                      <div className={styles.pillarNumber}>0{index + 1}</div>
                      <p>{pillar}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section-padding reveal">
          <div className="container">
            <div className={styles.ctaBox}>
              <h2>{service.cta}</h2>
              <Link href={service.ctaLink} className="btn-primary">Connect with an Expert</Link>
            </div>
          </div>
        </section>
      </div>
    </GSAPWrapper>
  );
}

export async function generateStaticParams() {
  return services.map((service) => ({
    id: service.id,
  }));
}
