import { useState } from "react";
import { Search, Send } from "lucide-react";

const navItems = [
  { label: "Главная", href: "#" },
  { label: "О портале", href: "#" },
  { label: "Рейтинги РФ", href: "#" },
  { label: "Рейтинги СНГ", href: "#" },
  { label: "Смотреть", href: "#" },
  { label: "Опросы", href: "#" },
  { label: "Контакты", href: "#" },
  { label: "Медиакит", href: "#" },
  { label: "Трансляции", href: "#" },
  { label: "Персоны", href: "#", isActive: true },
];

export function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header style={{ position: "sticky", top: 0, zIndex: 50 }}>
      {/* ── White top bar ── */}
      <div style={{ backgroundColor: "#FFFFFF", borderBottom: "1px solid #E2E6EA", boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 40px", display: "flex", alignItems: "center", justifyContent: "space-between", height: "72px" }}>
          {/* Left: logo + separator + tagline */}
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <a href="#" style={{ textDecoration: "none", display: "flex", alignItems: "baseline", gap: "0px", flexShrink: 0 }}>
              <span style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 800, fontSize: "22px", color: "#2e2d2d", letterSpacing: "-0.02em" }}>ВСЕ</span>
              <span style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 800, fontSize: "22px", color: "#E95422", letterSpacing: "-0.02em" }}>О</span>
              <span style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 800, fontSize: "22px", color: "#2e2d2d", letterSpacing: "-0.02em" }}>СТРОЙКЕ</span>
            </a>
            {/* Vertical separator */}
            <div style={{ width: "1px", height: "36px", background: "#D0D5DD", flexShrink: 0 }} />
            <p style={{ fontFamily: "'Fira Sans', sans-serif", fontSize: "13px", color: "#2e2d2d", lineHeight: 1.4, maxWidth: "210px" }}>
              Независимая площадка девелопмента России и стран СНГ
            </p>
          </div>

          {/* Right: Telegram + search + subscribe */}
          <div style={{ display: "flex", alignItems: "center", gap: "24px" }} className="hidden lg:flex">
            {/* Telegram */}
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span style={{ fontFamily: "'Fira Sans', sans-serif", fontSize: "13px", color: "#2e2d2d" }}>Наш Telegram-канал:</span>
              <div style={{ width: "22px", height: "22px", borderRadius: "50%", background: "#477AA2", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Send size={11} color="#FFFFFF" style={{ marginLeft: "1px" }} />
              </div>
            </div>
            {/* Search icon */}
            <button style={{ background: "transparent", border: "none", cursor: "pointer", padding: "8px", color: "#2e2d2d", display: "flex", alignItems: "center" }}>
              <Search size={20} />
            </button>
            {/* Subscribe button */}
            <button style={{
              background: "#477AA2",
              color: "#FFFFFF",
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "14px",
              fontWeight: 500,
              border: "none",
              borderRadius: "5px",
              padding: "10px 16px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              transition: "opacity 0.15s",
              whiteSpace: "nowrap",
            }}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.opacity = "0.88")}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.opacity = "1")}
            >
              Подписаться
              <svg width="14" height="11" viewBox="0 0 14 11" fill="none">
                <path d="M1 1H13M1 5.5H13M1 10H13" stroke="#E5E7EB" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          {/* Mobile burger */}
          <button className="lg:hidden" onClick={() => setMobileOpen(!mobileOpen)}
            style={{ background: "transparent", border: "none", color: "#2e2d2d", cursor: "pointer", padding: "8px", fontFamily: "'Fira Sans', sans-serif", fontSize: "20px" }}>
            ☰
          </button>
        </div>
      </div>

      {/* ── Blue navigation bar ── */}
      <div style={{ backgroundColor: "#477AA2" }} className="hidden lg:block">
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 40px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "4px", height: "54px" }}>
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                style={{
                  fontFamily: "'Fira Sans', sans-serif",
                  fontSize: "15px",
                  fontWeight: item.isActive ? 600 : 400,
                  color: item.isActive ? "#2e2d2d" : "#FFFFFF",
                  textDecoration: "none",
                  padding: "7px 14px",
                  borderRadius: "8px",
                  background: item.isActive ? "#FEFEFE" : "transparent",
                  transition: "background 0.15s ease",
                  whiteSpace: "nowrap",
                }}
                onMouseEnter={e => {
                  if (!item.isActive) (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.15)";
                }}
                onMouseLeave={e => {
                  if (!item.isActive) (e.currentTarget as HTMLElement).style.background = "transparent";
                }}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div style={{ backgroundColor: "#477AA2", padding: "8px 20px 16px" }} className="lg:hidden">
          {navItems.map((item) => (
            <a key={item.label} href={item.href} style={{
              display: "block",
              padding: "10px 0",
              fontFamily: "'Fira Sans', sans-serif",
              fontSize: "15px",
              fontWeight: item.isActive ? 600 : 400,
              color: item.isActive ? "#2e2d2d" : "#FFFFFF",
              borderBottom: "1px solid rgba(255,255,255,0.15)",
              textDecoration: "none",
              background: item.isActive ? "#FEFEFE" : "transparent",
              borderRadius: item.isActive ? "6px" : "0",
              paddingLeft: item.isActive ? "10px" : "0",
            }}>
              {item.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
