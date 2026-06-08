"use client";

import { formatKES } from "@/lib/utils";
import type { Opportunity, InvestmentType, RiskLevel, LiquidityLevel } from "@/types";

const typeColors: Record<InvestmentType, { bg: string; accent: string }> = {
  mmf:      { bg: "var(--mali-emerald-subtle)", accent: "var(--mali-emerald-mid)"   },
  stocks:   { bg: "var(--mali-gold-muted)",     accent: "var(--mali-gold)"          },
  sacco:    { bg: "var(--mali-emerald-muted)",  accent: "var(--mali-emerald-light)" },
  farming:  { bg: "#f5f8f4",                    accent: "#7d9c8a"                   },
  crypto:   { bg: "#f8f9fa",                    accent: "var(--mali-slate-500)"     },
  business: { bg: "#f5f5f5",                    accent: "var(--mali-slate-400)"     },
};

const riskConfig: Record<RiskLevel, { label: string; color: string; bg: string; bar: number }> = {
  low:    { label: "Low Risk",    color: "var(--mali-positive)", bg: "var(--mali-positive-bg)", bar: 30 },
  medium: { label: "Medium Risk", color: "var(--mali-gold)",     bg: "var(--mali-gold-muted)",  bar: 60 },
  high:   { label: "High Risk",   color: "var(--mali-negative)", bg: "var(--mali-negative-bg)", bar: 90 },
};

const liquidityConfig: Record<LiquidityLevel, { label: string; color: string }> = {
  daily:   { label: "Daily liquidity",   color: "var(--mali-positive)"  },
  weekly:  { label: "Weekly liquidity",  color: "var(--mali-emerald-light)" },
  monthly: { label: "Monthly liquidity", color: "var(--mali-gold)"      },
  locked:  { label: "Capital locked",    color: "var(--mali-slate-400)" },
};

const typeLabels: Record<InvestmentType, string> = {
  mmf:      "Money Market Fund",
  stocks:   "NSE Stocks",
  sacco:    "SACCO",
  farming:  "Farming",
  crypto:   "Crypto",
  business: "Business",
};

interface OpportunityCardsProps {
  opportunities: Opportunity[];
  comparing: string[];
  onToggleCompare: (id: string) => void;
}

export default function OpportunityCards({ opportunities, comparing, onToggleCompare }: OpportunityCardsProps) {
  if (opportunities.length === 0) {
    return (
      <div
        style={{
          background: "#fff",
          border: "1px solid var(--mali-slate-100)",
          borderRadius: 14,
          padding: "48px 24px",
          textAlign: "center",
          color: "var(--mali-slate-400)",
          fontSize: 14,
        }}
      >
        No opportunities match your filters.
      </div>
    );
  }

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14, marginBottom: 20 }}>
      {opportunities.map((opp) => {
        const colors      = typeColors[opp.type];
        const risk        = riskConfig[opp.riskLevel];
        const liquidity   = liquidityConfig[opp.liquidity];
        const isComparing = comparing.includes(opp.id);

        return (
          <div
            key={opp.id}
            style={{
              background: "#fff",
              border: `1.5px solid ${isComparing ? "var(--mali-emerald-light)" : "var(--mali-slate-100)"}`,
              borderRadius: 14,
              padding: "20px",
              transition: "border-color 0.15s, box-shadow 0.15s",
              boxShadow: isComparing ? "0 0 0 3px var(--mali-emerald-muted)" : "none",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Type tag + risk badge */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
              <div
                style={{
                  fontSize: 10,
                  fontWeight: 500,
                  letterSpacing: "1px",
                  textTransform: "uppercase",
                  color: colors.accent,
                  background: colors.bg,
                  padding: "3px 9px",
                  borderRadius: 6,
                }}
              >
                {typeLabels[opp.type]}
              </div>
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 500,
                  color: risk.color,
                  background: risk.bg,
                  padding: "3px 9px",
                  borderRadius: 20,
                }}
              >
                {risk.label}
              </div>
            </div>

            {/* Name + institution */}
            <div style={{ marginBottom: 12 }}>
              <div style={{ fontSize: 15, fontWeight: 500, color: "var(--mali-slate-900)", marginBottom: 3 }}>
                {opp.name}
              </div>
              <div style={{ fontSize: 12, color: "var(--mali-slate-400)" }}>{opp.institution}</div>
            </div>

            {/* Description */}
            <div style={{ fontSize: 12.5, color: "var(--mali-slate-500)", lineHeight: 1.55, marginBottom: 16, flex: 1 }}>
              {opp.description}
            </div>

            {/* Key metrics */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 8,
                marginBottom: 14,
              }}
            >
              {[
                { label: "Min Capital",    value: formatKES(opp.minCapital, true) },
                { label: "Time Horizon",   value: opp.timeHorizon                 },
                { label: "Expected Return",value: opp.expectedReturn, highlight: true },
                { label: "Liquidity",      value: liquidity.label,    liquidityColor: liquidity.color },
              ].map((m) => (
                <div
                  key={m.label}
                  style={{
                    background: "var(--mali-slate-50)",
                    borderRadius: 8,
                    padding: "10px 12px",
                  }}
                >
                  <div style={{ fontSize: 10, color: "var(--mali-slate-400)", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 4 }}>
                    {m.label}
                  </div>
                  <div
                    style={{
                      fontSize: 12,
                      fontWeight: 500,
                      color: (m as any).highlight
                        ? "var(--mali-positive)"
                        : (m as any).liquidityColor
                        ? (m as any).liquidityColor
                        : "var(--mali-slate-900)",
                    }}
                  >
                    {m.value}
                  </div>
                </div>
              ))}
            </div>

            {/* Risk bar */}
            <div style={{ marginBottom: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: "var(--mali-slate-400)", marginBottom: 5 }}>
                <span>Risk level</span>
                <span style={{ color: risk.color, fontWeight: 500 }}>{risk.label}</span>
              </div>
              <div style={{ height: 4, background: "var(--mali-slate-100)", borderRadius: 2, overflow: "hidden" }}>
                <div style={{ width: `${risk.bar}%`, height: "100%", background: risk.color, borderRadius: 2 }} />
              </div>
            </div>

            {/* Tags */}
            <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginBottom: 14 }}>
              {opp.tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontSize: 10,
                    fontWeight: 500,
                    padding: "2px 8px",
                    borderRadius: 6,
                    background: "var(--mali-slate-100)",
                    color: "var(--mali-slate-500)",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Compare button */}
            <button
              onClick={() => onToggleCompare(opp.id)}
              style={{
                width: "100%",
                padding: "9px",
                borderRadius: 8,
                border: `1.5px solid ${isComparing ? "var(--mali-emerald-light)" : "var(--mali-slate-100)"}`,
                background: isComparing ? "var(--mali-emerald-subtle)" : "#fff",
                fontSize: 12,
                fontWeight: 500,
                color: isComparing ? "var(--mali-emerald-mid)" : "var(--mali-slate-500)",
                cursor: "pointer",
                fontFamily: "var(--font-body)",
                transition: "all 0.15s",
              }}
            >
              {isComparing ? "✓ Added to comparison" : "+ Compare"}
            </button>
          </div>
        );
      })}
    </div>
  );
}