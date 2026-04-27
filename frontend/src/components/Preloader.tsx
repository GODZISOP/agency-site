"use client";

import { useEffect, useState } from "react";
import styles from "./Preloader.module.css";

export default function Preloader() {
  const [visible, setVisible] = useState(true);
  const [hiding, setHiding] = useState(false);

  useEffect(() => {
    // Start hiding after 1s
    const hideTimer = setTimeout(() => setHiding(true), 1000);
    // Remove from DOM after fade-out completes
    const removeTimer = setTimeout(() => setVisible(false), 1600);
    return () => {
      clearTimeout(hideTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div className={`${styles.preloader} ${hiding ? styles.hide : ""}`}>
      <div className={styles.inner}>
        <div className={styles.logo}>
          <span className={styles.orange}>Ecom</span>Jump
        </div>
        <div className={styles.bar}>
          <div className={styles.barFill} />
        </div>
        <p className={styles.tagline}>Powering Your E-Commerce Growth</p>
      </div>
    </div>
  );
}
