"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import styles from './Navbar.module.css';
import { services } from '@/data/content';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.body.style.overflow = 'unset';
    };
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      setActiveDropdown(null);
    }
  }, [isMenuOpen]);

  return (
    <nav className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          ECOM<span>JUMP</span>
        </Link>
        
        <ul className={`${styles.navLinks} ${isMenuOpen ? styles.mobileMenuOpen : ''}`}>
          <li><Link href="/" onClick={() => setIsMenuOpen(false)}>Home</Link></li>
          <li className={`${styles.dropdown} ${activeDropdown === 'services' ? styles.dropdownOpen : ''}`}>
            <span 
              className={styles.dropdownToggle} 
              onClick={() => setActiveDropdown(activeDropdown === 'services' ? null : 'services')}
            >
              Our Services
            </span>
            <div className={styles.dropdownMenu}>
              <ul className={styles.dropdownList}>
                {services.map((service) => (
                  <li key={service.id} className={styles.dropdownItem}>
                    <Link 
                      href={`/services/${service.id}`} 
                      className={styles.dropdownLink}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {service.title}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className={styles.dropdownFeatured}>
                <Image 
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600" 
                  alt="EcomJump Services" 
                  fill 
                  style={{ objectFit: 'cover' }} 
                />
                <div className={styles.dropdownFeaturedContent}>
                  <h4>Scale Your Brand</h4>
                  <p>Discover how we help sellers reach 7-figures and beyond.</p>
                </div>
              </div>
            </div>
          </li>
          <li><Link href="/faqs" onClick={() => setIsMenuOpen(false)}>FAQs</Link></li>
          <li><Link href="/blog" onClick={() => setIsMenuOpen(false)}>Blog</Link></li>
          <li><Link href="/contact" className="btn-primary" onClick={() => setIsMenuOpen(false)}>Get Started</Link></li>
        </ul>

        <button className={styles.burger} onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <span className={isMenuOpen ? styles.open : ''}></span>
          <span className={isMenuOpen ? styles.open : ''}></span>
          <span className={isMenuOpen ? styles.open : ''}></span>
        </button>
      </div>
    </nav>
  );
}
