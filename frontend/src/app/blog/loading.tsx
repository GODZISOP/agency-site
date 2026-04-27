import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import styles from "@/app/blog/Blog.module.css";

export default function BlogLoading() {
  const cards = Array.from({ length: 6 });

  return (
    <SkeletonTheme baseColor="#f0f0f0" highlightColor="#e8e8e8">
      <div style={{ paddingTop: "150px" }}>
        <div className="section-padding">
          <div className="container">
            {/* Header skeleton */}
            <div style={{ marginBottom: "4rem", textAlign: "center" }}>
              <Skeleton width={120} height={16} borderRadius={8} style={{ marginBottom: "1rem" }} />
              <Skeleton width={300} height={50} borderRadius={12} style={{ marginBottom: "1rem" }} />
              <Skeleton width={500} height={20} borderRadius={8} />
            </div>

            {/* Cards grid */}
            <div className={styles.blogGrid}>
              {cards.map((_, i) => (
                <div
                  key={i}
                  style={{
                    borderRadius: "24px",
                    overflow: "hidden",
                    background: "#fff",
                    border: "1px solid rgba(0,0,0,0.06)",
                    boxShadow: "0 4px 6px -1px rgba(0,0,0,0.04)",
                  }}
                >
                  <Skeleton height={240} borderRadius={0} />
                  <div style={{ padding: "1.75rem" }}>
                    <Skeleton width={100} height={14} borderRadius={8} style={{ marginBottom: "0.75rem" }} />
                    <Skeleton height={24} borderRadius={8} style={{ marginBottom: "0.5rem" }} />
                    <Skeleton width="70%" height={20} borderRadius={8} style={{ marginBottom: "1.25rem" }} />
                    <Skeleton width={120} height={16} borderRadius={8} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SkeletonTheme>
  );
}
