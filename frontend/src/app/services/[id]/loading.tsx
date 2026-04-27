import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function ServicesLoading() {
  return (
    <SkeletonTheme baseColor="#f0f0f0" highlightColor="#e8e8e8">
      {/* Hero */}
      <div style={{ minHeight: "80vh", display: "flex", alignItems: "center", padding: "120px 0 80px" }}>
        <div className="container">
          <Skeleton width={160} height={16} borderRadius={8} style={{ marginBottom: "1.5rem", display: "block" }} />
          <Skeleton width="70%" height={60} borderRadius={12} style={{ marginBottom: "1.5rem", display: "block" }} />
          <Skeleton width="55%" height={28} borderRadius={8} style={{ marginBottom: "3rem", display: "block" }} />
          <Skeleton width={180} height={52} borderRadius={50} />
        </div>
      </div>

      {/* Sub services grid */}
      <div className="section-padding">
        <div className="container">
          <Skeleton width={260} height={40} borderRadius={10} style={{ marginBottom: "3rem", display: "block" }} />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))", gap: "2.5rem" }}>
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} style={{ borderRadius: 24, overflow: "hidden", background: "#fff", border: "1px solid rgba(0,0,0,0.06)" }}>
                <Skeleton height={250} borderRadius={0} />
                <div style={{ padding: "2.5rem" }}>
                  <Skeleton width="60%" height={24} borderRadius={8} style={{ marginBottom: "1rem" }} />
                  <Skeleton height={14} borderRadius={6} style={{ marginBottom: "0.75rem" }} />
                  <Skeleton width="80%" height={14} borderRadius={6} style={{ marginBottom: "0.75rem" }} />
                  <Skeleton width="65%" height={14} borderRadius={6} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SkeletonTheme>
  );
}
