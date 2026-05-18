import { Send } from "lucide-react";

export function Footer() {
  return (
    <footer style={{ backgroundColor: "#477AA2" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 40px", height: "72px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        {/* Logo */}
        <a href="#" style={{ textDecoration: "none", display: "flex", alignItems: "baseline", gap: "0px", flexShrink: 0 }}>
          <span style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 800, fontSize: "20px", color: "#FFFFFF", letterSpacing: "-0.02em" }}>ВСЕ</span>
          <span style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 800, fontSize: "20px", color: "#FFFFFF", letterSpacing: "-0.02em", opacity: 0.75 }}>О</span>
          <span style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 800, fontSize: "20px", color: "#FFFFFF", letterSpacing: "-0.02em" }}>СТРОЙКЕ</span>
          <span style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 800, fontSize: "20px", color: "#FFFFFF", letterSpacing: "-0.02em" }}>.РФ</span>
        </a>

        {/* Copyright */}
        <span style={{ fontFamily: "'Fira Sans', sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.75)" }}>
          © 2026 ВСЕОСтройке.РФ · Все права защищены
        </span>

        {/* Subscribe button */}
        <button style={{
          background: "#FFFFFF",
          color: "#477AA2",
          fontFamily: "'Montserrat', sans-serif",
          fontSize: "14px",
          fontWeight: 600,
          border: "none",
          borderRadius: "5px",
          padding: "10px 18px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: "7px",
          transition: "opacity 0.15s",
          whiteSpace: "nowrap",
          flexShrink: 0,
        }}
          onMouseEnter={e => ((e.currentTarget as HTMLElement).style.opacity = "0.88")}
          onMouseLeave={e => ((e.currentTarget as HTMLElement).style.opacity = "1")}
        >
          Подписаться
          <Send size={13} />
        </button>
      </div>
    </footer>
  );
}
