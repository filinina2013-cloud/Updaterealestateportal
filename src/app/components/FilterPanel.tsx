import { useState, useEffect } from "react";
import { X, Check } from "lucide-react";

export interface FilterState {
  positions: string[];
  companies: string[];
  regions: string[];
  citationLevel: string;
}

interface FilterPanelProps {
  open: boolean;
  onClose: () => void;
  allCompanies: string[];
  allRegions: string[];
  filters: FilterState;
  onApply: (f: FilterState) => void;
}

const POSITION_OPTIONS = [
  "Генеральный директор",
  "Президент",
  "Председатель совета директоров",
  "Коммерческий директор",
  "Финансовый директор",
  "Заместитель министра",
  "Министр",
  "Основатель",
  "Совладелец",
  "Операционный директор",
  "Управляющий партнер",
];

const CITATION_OPTIONS = [
  { value: "", label: "Все уровни" },
  { value: "top", label: "Топ персоны" },
  { value: "quoted", label: "Часто цитируют" },
  { value: "new", label: "Новые персоны" },
];

export function FilterPanel({ open, onClose, allCompanies, allRegions, filters, onApply }: FilterPanelProps) {
  const [local, setLocal] = useState<FilterState>(filters);

  useEffect(() => {
    setLocal(filters);
  }, [filters, open]);

  // Prevent body scroll when panel is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const togglePosition = (pos: string) => {
    setLocal(prev => ({
      ...prev,
      positions: prev.positions.includes(pos)
        ? prev.positions.filter(p => p !== pos)
        : [...prev.positions, pos],
    }));
  };

  const toggleCompany = (c: string) => {
    setLocal(prev => ({
      ...prev,
      companies: prev.companies.includes(c)
        ? prev.companies.filter(x => x !== c)
        : [...prev.companies, c],
    }));
  };

  const toggleRegion = (r: string) => {
    setLocal(prev => ({
      ...prev,
      regions: prev.regions.includes(r)
        ? prev.regions.filter(x => x !== r)
        : [...prev.regions, r],
    }));
  };

  const handleReset = () => {
    const empty: FilterState = { positions: [], companies: [], regions: [], citationLevel: "" };
    setLocal(empty);
    onApply(empty);
    onClose();
  };

  const handleApply = () => {
    onApply(local);
    onClose();
  };

  const activeCount =
    local.positions.length + local.companies.length + local.regions.length + (local.citationLevel ? 1 : 0);

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          backgroundColor: "rgba(0,0,0,0.35)",
          zIndex: 200,
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          transition: "opacity 0.25s ease",
        }}
      />

      {/* Panel */}
      <div style={{
        position: "fixed",
        top: 0,
        right: 0,
        bottom: 0,
        width: "420px",
        maxWidth: "100vw",
        backgroundColor: "#FFFFFF",
        boxShadow: "-4px 0 32px rgba(0,0,0,0.12)",
        zIndex: 201,
        transform: open ? "translateX(0)" : "translateX(100%)",
        transition: "transform 0.28s cubic-bezier(0.4, 0, 0.2, 1)",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}>
        {/* Header */}
        <div style={{
          padding: "24px 28px 20px",
          borderBottom: "1px solid #E2E6EA",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexShrink: 0,
        }}>
          <div>
            <h2 style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: "18px", color: "#1A1A1A", margin: 0 }}>
              Фильтры
            </h2>
            {activeCount > 0 && (
              <span style={{ fontFamily: "'Fira Sans', sans-serif", fontSize: "12px", color: "#E95422", fontWeight: 600 }}>
                Выбрано: {activeCount}
              </span>
            )}
          </div>
          <button onClick={onClose} style={{ background: "transparent", border: "none", cursor: "pointer", color: "#555555", padding: "6px", borderRadius: "6px", display: "flex", alignItems: "center", transition: "background 0.15s" }}
            onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = "#F0F2F5")}
            onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = "transparent")}
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable body */}
        <div style={{ flex: 1, overflowY: "auto", padding: "28px", display: "flex", flexDirection: "column", gap: "32px" }}>

          {/* Citation Level */}
          <FilterSection title="Уровень цитирования">
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {CITATION_OPTIONS.map(opt => (
                <label key={opt.value} style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}>
                  <div
                    onClick={() => setLocal(prev => ({ ...prev, citationLevel: opt.value }))}
                    style={{
                      width: "16px", height: "16px", borderRadius: "50%",
                      border: local.citationLevel === opt.value ? "5px solid #477AA2" : "2px solid #9AA5B1",
                      flexShrink: 0,
                      cursor: "pointer",
                      transition: "border 0.15s",
                    }}
                  />
                  <span style={{ fontFamily: "'Fira Sans', sans-serif", fontSize: "14px", color: "#1A1A1A" }}>{opt.label}</span>
                </label>
              ))}
            </div>
          </FilterSection>

          {/* Positions */}
          <FilterSection title="Должность">
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {POSITION_OPTIONS.map(pos => {
                const checked = local.positions.includes(pos);
                return (
                  <label key={pos} onClick={() => togglePosition(pos)} style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}>
                    <div style={{
                      width: "18px", height: "18px", borderRadius: "4px", flexShrink: 0,
                      border: checked ? "none" : "2px solid #9AA5B1",
                      background: checked ? "#477AA2" : "transparent",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      transition: "all 0.15s",
                    }}>
                      {checked && <Check size={11} strokeWidth={3} color="#FFFFFF" />}
                    </div>
                    <span style={{ fontFamily: "'Fira Sans', sans-serif", fontSize: "13.5px", color: "#1A1A1A" }}>{pos}</span>
                  </label>
                );
              })}
            </div>
          </FilterSection>

          {/* Companies */}
          <FilterSection title={`Компании ${local.companies.length > 0 ? `(${local.companies.length})` : ""}`}>
            <div style={{ display: "flex", flexDirection: "column", gap: "6px", maxHeight: "220px", overflowY: "auto" }}>
              {allCompanies.map(c => {
                const checked = local.companies.includes(c);
                return (
                  <label key={c} onClick={() => toggleCompany(c)} style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer", padding: "4px 0" }}>
                    <div style={{
                      width: "18px", height: "18px", borderRadius: "4px", flexShrink: 0,
                      border: checked ? "none" : "2px solid #9AA5B1",
                      background: checked ? "#477AA2" : "transparent",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      transition: "all 0.15s",
                    }}>
                      {checked && <Check size={11} strokeWidth={3} color="#FFFFFF" />}
                    </div>
                    <span style={{ fontFamily: "'Fira Sans', sans-serif", fontSize: "13px", color: "#1A1A1A", lineHeight: 1.3 }}>{c}</span>
                  </label>
                );
              })}
            </div>
          </FilterSection>

          {/* Regions */}
          <FilterSection title={`Регионы ${local.regions.length > 0 ? `(${local.regions.length})` : ""}`}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {allRegions.map(r => {
                const checked = local.regions.includes(r);
                return (
                  <button key={r} onClick={() => toggleRegion(r)} style={{
                    padding: "6px 14px", borderRadius: "20px", cursor: "pointer",
                    fontFamily: "'Fira Sans', sans-serif", fontSize: "13px",
                    border: checked ? "none" : "1.5px solid #E2E6EA",
                    background: checked ? "#477AA2" : "#F8F9FA",
                    color: checked ? "#FFFFFF" : "#555555",
                    fontWeight: checked ? 600 : 400,
                    transition: "all 0.15s",
                  }}>
                    {r}
                  </button>
                );
              })}
            </div>
          </FilterSection>
        </div>

        {/* Footer buttons */}
        <div style={{
          padding: "20px 28px",
          borderTop: "1px solid #E2E6EA",
          display: "flex",
          gap: "12px",
          flexShrink: 0,
        }}>
          <button onClick={handleApply} style={{
            flex: 1,
            padding: "13px 0",
            borderRadius: "8px",
            border: "none",
            background: "linear-gradient(135deg, #E95422 0%, #E95422 100%)",
            color: "#FFFFFF",
            fontFamily: "'Fira Sans', sans-serif",
            fontSize: "15px",
            fontWeight: 700,
            cursor: "pointer",
            transition: "opacity 0.15s",
          }}
            onMouseEnter={e => ((e.currentTarget as HTMLElement).style.opacity = "0.88")}
            onMouseLeave={e => ((e.currentTarget as HTMLElement).style.opacity = "1")}
          >
            Применить {activeCount > 0 ? `(${activeCount})` : ""}
          </button>
          <button onClick={handleReset} style={{
            padding: "13px 20px",
            borderRadius: "8px",
            border: "1.5px solid #E2E6EA",
            background: "transparent",
            color: "#555555",
            fontFamily: "'Fira Sans', sans-serif",
            fontSize: "15px",
            fontWeight: 500,
            cursor: "pointer",
            transition: "all 0.15s",
          }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "#CBD2D9"; (e.currentTarget as HTMLElement).style.color = "#1A1A1A"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "#E2E6EA"; (e.currentTarget as HTMLElement).style.color = "#555555"; }}
          >
            Сбросить
          </button>
        </div>
      </div>
    </>
  );
}

function FilterSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <div style={{
        fontFamily: "'Montserrat', sans-serif",
        fontWeight: 700,
        fontSize: "13px",
        color: "#1A1A1A",
        textTransform: "uppercase",
        letterSpacing: "0.07em",
        marginBottom: "14px",
      }}>
        {title}
      </div>
      {children}
    </div>
  );
}
