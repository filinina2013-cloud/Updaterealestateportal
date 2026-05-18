import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export interface Person {
  id: number;
  name: string;
  position: string;
  company: string;
  region: string;
  bio: string;
  photoUrl: string;
  tag?: "top" | "quoted" | "new";
}

interface PersonCardProps {
  person: Person;
}

const TAG_CONFIG = {
  top: { label: "ТОП", bg: "#E95422", color: "#FFFFFF" },
  quoted: { label: "ЦИТИРУЮТ", bg: "#0a5494", color: "#FFFFFF" },
  new: { label: "НОВЫЙ", bg: "#E95422", color: "#FFFFFF" },
};

export function PersonCard({ person }: PersonCardProps) {
  const [hovered, setHovered] = useState(false);
  const tag = person.tag ? TAG_CONFIG[person.tag] : null;

  return (
    <article
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        backgroundColor: "#FFFFFF",
        borderRadius: "10px",
        overflow: "hidden",
        border: `1.5px solid ${hovered ? "#E95422" : "#e5e7eb"}`,
        boxShadow: hovered
          ? "0 8px 32px rgba(0,0,0,0.12), 0 2px 8px rgba(212,175,55,0.1)"
          : "0 1px 8px rgba(0,0,0,0.05)",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        transition: "all 0.2s ease",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      {/* Photo */}
      <div style={{ position: "relative", paddingBottom: "108%", overflow: "hidden", flexShrink: 0 }}>
        <ImageWithFallback
          src={person.photoUrl}
          alt={person.name}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "top center",
            transition: "transform 0.35s ease",
            transform: hovered ? "scale(1.04)" : "scale(1)",
          }}
        />
        {/* Gradient fade at bottom of photo */}
        <div style={{
          position: "absolute",
          bottom: 0, left: 0, right: 0,
          height: "35%",
          background: "linear-gradient(to top, rgba(255,255,255,0.28) 0%, transparent 100%)",
          pointerEvents: "none",
        }} />
        {/* Top row: tag badge + region pill */}
        <div style={{
          position: "absolute",
          top: "12px",
          left: "12px",
          right: "12px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}>
          {tag ? (
            <span style={{
              background: tag.bg,
              color: tag.color,
              fontFamily: "'Fira Sans', sans-serif",
              fontSize: "11px",
              fontWeight: 600,
              letterSpacing: "0.06em",
              padding: "4px 10px",
              borderRadius: "5px",
            }}>
              {tag.label}
            </span>
          ) : <span />}
          <span style={{
            background: "#FFFFFF",
            color: "#1c3458",
            fontFamily: "'Fira Sans', sans-serif",
            fontSize: "11px",
            fontWeight: 400,
            padding: "4px 10px",
            borderRadius: "5px",
          }}>
            {person.region}
          </span>
        </div>
      </div>

      {/* Content area */}
      <div style={{
        padding: "22px 24px 20px",
        display: "flex",
        flexDirection: "column",
        flex: 1,
        gap: "0",
      }}>
        {/* Subtitle: Company · Position */}
        <div style={{
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "4px",
          marginBottom: "6px",
        }}>
          <span style={{ fontFamily: "'Fira Sans', sans-serif", fontSize: "14px", fontWeight: 500, color: "#1c3458", lineHeight: 1.4 }}>
            {person.company}
          </span>
          <span style={{ fontSize: "12px", color: "#2e2d2d", opacity: 0.4, margin: "0 1px" }}>•</span>
          <span style={{ fontFamily: "'Fira Sans', sans-serif", fontSize: "14px", fontWeight: 500, color: "#1c3458", lineHeight: 1.4 }}>
            {person.position}
          </span>
        </div>

        {/* Name */}
        <h3 style={{
          fontFamily: "'Montserrat', sans-serif",
          fontWeight: 700,
          fontSize: "18px",
          color: "#2e2d2d",
          lineHeight: 1.3,
          marginBottom: "10px",
        }}>
          {person.name}
        </h3>

        {/* Bio */}
        <p style={{
          fontFamily: "'Fira Sans', sans-serif",
          fontSize: "14px",
          color: "#777777",
          lineHeight: 1.6,
          flex: 1,
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
          marginBottom: "16px",
        }}>
          {person.bio}
        </p>

        {/* CTA button — steel blue matching Figma */}
        <button
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "7px",
            padding: "10px 16px",
            borderRadius: "10px",
            border: `1.5px solid ${hovered ? "#E95422" : "#477aa2"}`,
            background: hovered ? "#E95422" : "transparent",
            color: hovered ? "#FFFFFF" : "#477aa2",
            fontFamily: "'Montserrat', sans-serif",
            fontSize: "14px",
            fontWeight: 700,
            cursor: "pointer",
            transition: "all 0.18s ease",
            width: "100%",
          }}
        >
          Подробнее <ArrowRight size={14} strokeWidth={2.5} />
        </button>
      </div>
    </article>
  );
}
