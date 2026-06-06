"use client";

import { TrendingUp, TrendingDown, ArrowRight } from "lucide-react";
import { investments } from "@/lib/data";
import { formatKES, formatPercent } from "@/lib/utils";
import type { InvestmentType } from "@/types";
import Link from "next/link";

const typeLabels: Record<InvestmentType, string> = {
  mmf: "Money Market Fund",
  stocks: "NSE Stocks",
  sacco: "SACCO",
  farming: "Farming Projects",
  crypto: "Crypto",
  business: "Business",
};

const typeRoutes: Record<InvestmentType, string> = {
  mmf: "/investments",
  stocks: "/investments",
  sacco: "/investments",
  farming: "/investments",
  crypto: "/investments",
  business: "/investments",
};

const typeColors: Record<InvestmentType, { bg: string; accent: string }> = {
  mmf: { bg: "var(--mali-emerald-subtle)", accent: "var(--mali-emerald-mid)" },
  stocks: { bg: "var(--mali-gold-muted)", accent: "var(--mali-gold)" },
  sacco: { bg: "var(--mali-emerald-muted)", accent: "var(--mali-emerald-light)" },
  farming: { bg: "#f5f8f4", accent: "#7d9c8a" },
  crypto: { bg: "#f8f9fa", accent: "var(--mali-slate-500)" },
  business: { bg: "#f5f5f5", accent: "var(--mali-slate-400)" },
};

const typeDescriptions: Record<InvestmentType, string> = {
  mmf: "Daily liquidity · CMA regulated",
  stocks: "NSE listed equities",
  sacco: "Shares & deposits · SASRA regulated",
  farming: "Active farming projects",
  crypto: "Digital assets",
  business: "Business investments",
};

export default function InvestmentCards() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 20 }}>
      {investments.map((inv) => {
        const isUp = inv.gainLoss >= 0;
        const colors = typeColors[inv.type];
        return (
          <Link
            key={inv.id}
            href={typeRoutes[inv.type]}
            style={{ textDecoration: "none" }}
          >
            <div
              className="mali-card"
              style={{ padding: "20px", cursor: "pointer", transition: "border-color 0.15s" }}
            >
              {/* Header */}
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 14 }}>
                <div>
                  <div
                    style={{
                      display: "inline-block",
                      fontSize: 10,
                      fontWeight: 500,
                      letterSpacing: "1px",
                      textTransform: "uppercase",
                      color: colors.accent,
                      background: colors.bg,
                      padding: "3px 8px",
                      borderRadius: 6,
                      marginBottom: 6,
                    }}
                  >
                    {typeLabels[inv.type]}
                  </div>
                  <div style={{ fontSize: 13, color: "var(--mali-slate-500)" }}>{inv.institution}</div>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 3,
                    fontSize: 12,
                    fontWeight: 500,
                    color: isUp ? "var(--mali-positive)" : "var(--mali-negative)",
                    background: isUp ? "var(--mali-positive-bg)" : "var(--mali-negative-bg)",
                    padding: "3px 8px",
                    borderRadius: 20,
                    flexShrink: 0,
                  }}
                >
                  {isUp ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
                  {formatPercent(inv.gainLossPercent, true)}
                </div>
              </div>

              {/* Value */}
              <div style={{ fontSize: 24, fontWeight: 500, color: "var(--mali-slate-900)", letterSpacing: "-0.5px", lineHeight: 1, marginBottom: 6 }}>
                {formatKES(inv.currentValue)}
              </div>

              {/* Gain/Loss */}
              <div style={{ fontSize: 12, color: isUp ? "var(--mali-positive)" : "var(--mali-negative)", marginBottom: 14 }}>
                {isUp ? "+" : ""}{formatKES(inv.gainLoss, true)} total gain
              </div>

              {/* Divider */}
              <div style={{ height: 1, background: "var(--mali-slate-50)", marginBottom: 12 }} />

              {/* Footer */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 11, color: "var(--mali-slate-400)" }}>
                  {typeDescriptions[inv.type]}
                </span>
                <ArrowRight size={13} color="var(--mali-slate-300)" />
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
