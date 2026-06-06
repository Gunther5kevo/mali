"use client";

import { TrendingDown, TrendingUp, Calendar, PiggyBank } from "lucide-react";
import { formatKES } from "@/lib/utils";

const stats = [
  {
    label: "Savings Rate",
    value: "28.4%",
    sub: "+3.2% vs last month",
    positive: true,
    icon: PiggyBank,
    bg: "var(--mali-emerald-subtle)",
    iconColor: "var(--mali-emerald-mid)",
  },
  {
    label: "Avg Daily Spend",
    value: formatKES(4_413),
    sub: "Based on June so far",
    positive: null,
    icon: Calendar,
    bg: "var(--mali-gold-muted)",
    iconColor: "var(--mali-gold)",
  },
  {
    label: "Largest Category",
    value: "Housing",
    sub: "KES 55,000 · 41.5% of spend",
    positive: null,
    icon: TrendingUp,
    bg: "var(--mali-slate-50)",
    iconColor: "var(--mali-slate-400)",
  },
  {
    label: "vs Last Month",
    value: "+KES 16,400",
    sub: "Expenses up 14.1%",
    positive: false,
    icon: TrendingDown,
    bg: "#fceaea",
    iconColor: "var(--mali-negative)",
  },
];

export default function SpendingTrends() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 16 }}>
      {stats.map((s) => {
        const Icon = s.icon;
        return (
          <div
            key={s.label}
            className="mali-card"
            style={{ padding: "18px 20px" }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
              <div style={{ fontSize: 11, fontWeight: 500, letterSpacing: "0.8px", textTransform: "uppercase", color: "var(--mali-slate-400)" }}>
                {s.label}
              </div>
              <div style={{ width: 28, height: 28, borderRadius: 7, background: s.bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Icon size={13} color={s.iconColor} />
              </div>
            </div>
            <div style={{ fontSize: 20, fontWeight: 500, color: s.positive === false ? "var(--mali-negative)" : s.positive === true ? "var(--mali-positive)" : "var(--mali-slate-900)", letterSpacing: "-0.3px", lineHeight: 1, marginBottom: 6 }}>
              {s.value}
            </div>
            <div style={{ fontSize: 11, color: "var(--mali-slate-400)" }}>{s.sub}</div>
          </div>
        );
      })}
    </div>
  );
}