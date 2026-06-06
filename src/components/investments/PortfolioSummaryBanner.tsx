"use client";

import { TrendingUp, TrendingDown } from "lucide-react";
import { investments } from "@/lib/data";
import { formatKES, formatPercent } from "@/lib/utils";

const typeLabels: Record<string, string> = {
  mmf: "Money Market",
  stocks: "NSE Stocks",
  sacco: "SACCO",
  farming: "Farming",
  crypto: "Crypto",
  business: "Business",
};

const typeColors: Record<string, string> = {
  mmf: "var(--mali-emerald-mid)",
  stocks: "var(--mali-gold)",
  sacco: "var(--mali-emerald-light)",
  farming: "var(--mali-slate-400)",
  crypto: "var(--mali-slate-200)",
  business: "var(--mali-slate-300)",
};

export default function PortfolioSummaryBanner() {
  const totalValue = investments.reduce((s, i) => s + i.currentValue, 0);
  const totalCost = investments.reduce((s, i) => s + i.costBasis, 0);
  const totalGain = totalValue - totalCost;
  const totalGainPct = (totalGain / totalCost) * 100;
  const isUp = totalGain >= 0;

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
      {/* Decorative rings */}
      <div style={{ position: "absolute", top: -50, right: -50, width: 240, height: 240, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.05)" }} />
      <div style={{ position: "absolute", bottom: -80, right: 40, width: 320, height: 320, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.03)" }} />

      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", position: "relative", zIndex: 1 }}>

        {/* Left – Total Value */}
        <div>
          <div style={{ fontSize: 11, fontWeight: 500, letterSpacing: "1.5px", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginBottom: 8 }}>
            Total Investment Portfolio
          </div>
          <div style={{ fontFamily: "var(--font-display)", fontSize: 44, fontWeight: 500, color: "#fff", letterSpacing: "-1px", lineHeight: 1 }}>
            {formatKES(totalValue)}
          </div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 6, marginTop: 12, background: isUp ? "rgba(126,232,162,0.12)" : "rgba(244,165,165,0.12)", borderRadius: 20, padding: "4px 12px" }}>
            {isUp ? <TrendingUp size={13} color="#7ee8a2" /> : <TrendingDown size={13} color="#f4a5a5" />}
            <span style={{ fontSize: 12, fontWeight: 500, color: isUp ? "#7ee8a2" : "#f4a5a5" }}>
              {isUp ? "+" : ""}{formatKES(totalGain, true)} ({formatPercent(totalGainPct, true)}) all time
            </span>
          </div>

          {/* Allocation bar */}
          <div style={{ marginTop: 20 }}>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginBottom: 8, letterSpacing: "0.5px" }}>Portfolio breakdown</div>
            <div style={{ display: "flex", height: 6, borderRadius: 3, overflow: "hidden", width: 420, gap: 1 }}>
              {investments.map((inv) => (
                <div
                  key={inv.id}
                  style={{
                    flex: inv.currentValue / totalValue,
                    background: typeColors[inv.type],
                    minWidth: 2,
                  }}
                />
              ))}
            </div>
            <div style={{ display: "flex", gap: 16, marginTop: 10, flexWrap: "wrap" }}>
              {investments.map((inv) => (
                <div key={inv.id} style={{ display: "flex", alignItems: "center", gap: 5 }}>
                  <div style={{ width: 7, height: 7, borderRadius: "50%", background: typeColors[inv.type], flexShrink: 0 }} />
                  <span style={{ fontSize: 11, color: "rgba(255,255,255,0.55)" }}>
                    {typeLabels[inv.type]} {((inv.currentValue / totalValue) * 100).toFixed(0)}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right – Stats grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px 40px", paddingTop: 4 }}>
          {[
            { label: "Cost Basis", value: formatKES(totalCost, true), sub: "Total invested" },
            { label: "Total Gain", value: `+${formatKES(totalGain, true)}`, sub: formatPercent(totalGainPct, true), isPositive: true },
            { label: "Best Performer", value: "NSE Stocks", sub: "+24.6% return", isPositive: true },
            { label: "Monthly Added", value: formatKES(35_000, true), sub: "June 2026" },
          ].map((s) => (
            <div key={s.label} style={{ textAlign: "right" }}>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginBottom: 4 }}>{s.label}</div>
              <div style={{ fontSize: 18, fontWeight: 500, color: s.isPositive ? "#7ee8a2" : "#fff" }}>{s.value}</div>
              <div style={{ fontSize: 11, color: s.isPositive ? "#7ee8a2" : "rgba(255,255,255,0.4)", marginTop: 2 }}>{s.sub}</div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
