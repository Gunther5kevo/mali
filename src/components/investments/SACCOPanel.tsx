"use client";

import { formatKES } from "@/lib/utils";

const saccoData = [
  { label: "Share Capital", value: 185_000, sub: "Stima SACCO · 1,850 shares", color: "var(--mali-emerald-mid)" },
  { label: "Deposits", value: 346_000, sub: "Fixed + monthly contributions", color: "var(--mali-emerald-light)" },
  { label: "Dividends (2025)", value: 28_500, sub: "15.4% on shares", color: "var(--mali-gold)" },
  { label: "Loan Limit", value: 1_530_000, sub: "3× your deposits", color: "var(--mali-slate-400)" },
];

const contributions = [
  { month: "Jan", amount: 10_000 },
  { month: "Feb", amount: 10_000 },
  { month: "Mar", amount: 10_000 },
  { month: "Apr", amount: 10_000 },
  { month: "May", amount: 10_000 },
  { month: "Jun", amount: 10_000 },
];

const maxContrib = Math.max(...contributions.map((c) => c.amount));

export default function SACCOPanel() {
  const total = 185_000 + 346_000;

  return (
    <div className="mali-card">
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 20px 14px", borderBottom: "1px solid var(--mali-slate-50)" }}>
        <div>
          <div style={{ fontSize: 14, fontWeight: 500, color: "var(--mali-slate-900)" }}>SACCO Portfolio</div>
          <div style={{ fontSize: 11, color: "var(--mali-slate-400)", marginTop: 2 }}>Stima SACCO · SASRA regulated</div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: 18, fontWeight: 500, color: "var(--mali-slate-900)" }}>{formatKES(total, true)}</div>
          <div style={{ fontSize: 11, color: "var(--mali-slate-400)" }}>Total portfolio value</div>
        </div>
      </div>

      <div style={{ padding: "16px 20px" }}>
        {/* Stats grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 }}>
          {saccoData.map((item) => (
            <div key={item.label} style={{ padding: "12px 14px", background: "var(--mali-slate-50)", borderRadius: 10, borderLeft: `3px solid ${item.color}` }}>
              <div style={{ fontSize: 11, color: "var(--mali-slate-400)", marginBottom: 4 }}>{item.label}</div>
              <div style={{ fontSize: 16, fontWeight: 500, color: "var(--mali-slate-900)", marginBottom: 2 }}>{formatKES(item.value, true)}</div>
              <div style={{ fontSize: 11, color: "var(--mali-slate-400)" }}>{item.sub}</div>
            </div>
          ))}
        </div>

        {/* Monthly contributions */}
        <div>
          <div style={{ fontSize: 12, fontWeight: 500, color: "var(--mali-slate-500)", marginBottom: 10 }}>Monthly contributions — 2026</div>
          <div style={{ display: "flex", gap: 6, alignItems: "flex-end", height: 40 }}>
            {contributions.map((c) => (
              <div key={c.month} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                <div
                  style={{
                    width: "100%",
                    height: `${(c.amount / maxContrib) * 32}px`,
                    background: "var(--mali-emerald-mid)",
                    borderRadius: 3,
                    opacity: 0.8,
                  }}
                />
                <span style={{ fontSize: 10, color: "var(--mali-slate-400)" }}>{c.month}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
