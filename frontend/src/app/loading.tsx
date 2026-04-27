import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function RootLoading() {
  return (
    <SkeletonTheme baseColor="#f0f0f0" highlightColor="#e8e8e8">
      <div style={{ padding: "100px 0" }}>
        {/* Hero Skeleton */}
        <div className="section-padding" style={{ minHeight: "80vh", display: "flex", alignItems: "center" }}>
          <div className="container">
            <Skeleton width={200} height={20} borderRadius={8} style={{ marginBottom: "1.5rem" }} />
            <Skeleton width="60%" height={80} borderRadius={12} style={{ marginBottom: "1.5rem" }} />
            <Skeleton width="40%" height={30} borderRadius={8} style={{ marginBottom: "3rem" }} />
            <div style={{ display: "flex", gap: "20px" }}>
              <Skeleton width={180} height={56} borderRadius={50} />
              <Skeleton width={180} height={56} borderRadius={50} />
            </div>
          </div>
        </div>

        {/* Features Skeleton */}
        <div className="section-padding" style={{ background: "#f8f9fa" }}>
          <div className="container">
            <div style={{ textAlign: "center", marginBottom: "4rem" }}>
              <Skeleton width={150} height={20} borderRadius={8} style={{ marginBottom: "1rem" }} />
              <Skeleton width={400} height={50} borderRadius={12} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} style={{ padding: "3rem", background: "#fff", borderRadius: "24px" }}>
                  <Skeleton circle width={60} height={60} style={{ marginBottom: "1.5rem" }} />
                  <Skeleton width="70%" height={24} borderRadius={8} style={{ marginBottom: "1rem" }} />
                  <Skeleton count={3} height={14} borderRadius={6} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SkeletonTheme>
  );
}
