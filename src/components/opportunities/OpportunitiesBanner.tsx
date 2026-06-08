"use client";

import { opportunities } from "@/lib/data";
import { formatKES } from "@/lib/utils";
import { Lightbulb } from "lucide-react";

export default function OpportunitiesBanner() {
  const lowRisk    = opportunities.filter((o) => o.riskLevel === "low").length;
  const medRisk    = opportunities.filter((o) => o.riskLevel === "medium").length;
  const highRisk   = opportunities.filter((o) => o.riskLevel === "high").length;
  const minCapital = Math.min(...opportunities.map((o) => o.minCapital));

  return (
    <div
      style={{
        background: "var(--mali-emerald)",
        borderRadius: 16,
        padding: "28px 32px",
        marginBottom: 20,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Rings */}
      <div style={{ position: "absolute", top: -50, right: -50,  width: 260, height: 260, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.05)" }} />
      <div style={{ position: "absolute", bottom: -80, right: 60, width: 320, height: 320, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.03)" }} />

      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", position: "relative", zIndex: 1 }}>

        {/* Left */}
        <div>
          <div style={{ fontSize: 11, fontWeight: 500, letterSpacing: "1.5px", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginBottom: 8 }}>
            Investment Opportunities
          </div>
          <div style={{ fontFamily: "var(--font-display)", fontSize: 44, fontWeight: 500, color: "#fff", letterSpacing: "-1px", lineHeight: 1 }}>
            {opportunities.length} Opportunities
          </div>
          <div style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", marginTop: 8 }}>
            Curated for the Kenyan market · Updated regularly
          </div>

          {/* Risk breakdown pills */}
          <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
            {[
              { label: `${lowRisk} Low risk`,    bg: "rgba(126,232,162,0.12)", color: "#7ee8a2"              },
              { label: `${medRisk} Medium risk`, bg: "rgba(240,228,196,0.15)", color: "var(--mali-gold)"     },
              { label: `${highRisk} High risk`,  bg: "rgba(244,165,165,0.12)", color: "#f4a5a5"              },
            ].map((pill) => (
              <div
                key={pill.label}
                style={{
                  padding: "4px 14px",
                  borderRadius: 20,
                  background: pill.bg,
                  fontSize: 12,
                  fontWeight: 500,
                  color: pill.color,
                }}
              >
                {pill.label}
              </div>
            ))}
          </div>
        </div>

        {/* Right — key stats */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px 48px", paddingTop: 4 }}>
          {[
            { label: "Starting from",    value: formatKES(minCapital, true), sub: "Minimum capital required" },
            { label: "Asset Classes",    value: "6",                         sub: "MMF, Stocks, SACCO, Farming, Crypto, Business" },
            { label: "Best Yield",       value: "Up to 35%",                 sub: "Farming projects (per cycle)" },
            { label: "Most Accessible",  value: "MMF",                       sub: "Start from KES 1,000" },
          ].map((s) => (
            <div key={s.label} style={{ textAlign: "right" }}>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginBottom: 4 }}>{s.label}</div>
              <div style={{ fontSize: 18, fontWeight: 500, color: "#fff" }}>{s.value}</div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginTop: 2 }}>{s.sub}</div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}