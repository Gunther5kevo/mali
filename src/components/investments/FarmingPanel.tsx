"use client";

import { Sprout, TrendingUp } from "lucide-react";
import { farmingProjects } from "@/lib/data";
import { formatKES, formatPercent } from "@/lib/utils";
import { format } from "date-fns";

const typeEmoji: Record<string, string> = {
  poultry: "🐓",
  greenhouse: "🌿",
  avocado: "🥑",
  dairy: "🐄",
  macadamia: "🌰",
  other: "🌾",
};

const statusStyles: Record<string, { bg: string; color: string; label: string }> = {
  active: { bg: "var(--mali-positive-bg)", color: "var(--mali-positive)", label: "Active" },
  harvested: { bg: "var(--mali-gold-muted)", color: "var(--mali-gold)", label: "Harvested" },
  planning: { bg: "var(--mali-slate-100)", color: "var(--mali-slate-500)", label: "Planning" },
};

export default function FarmingPanel() {
  const totalInvested = farmingProjects.reduce((s, f) => s + f.capitalInvested, 0);
  const totalValue = farmingProjects.reduce((s, f) => s + f.currentValue, 0);
  const totalRevenue = farmingProjects.reduce((s, f) => s + f.totalRevenue, 0);

  return (
    <div className="mali-card" style={{ marginBottom: 16 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 20px 14px", borderBottom: "1px solid var(--mali-slate-50)" }}>
        <div>
          <div style={{ fontSize: 14, fontWeight: 500, color: "var(--mali-slate-900)" }}>Farming Projects</div>
          <div style={{ fontSize: 11, color: "var(--mali-slate-400)", marginTop: 2 }}>{farmingProjects.length} active projects</div>
        </div>
        <div style={{ display: "flex", gap: 24 }}>
          {[
            { label: "Invested", value: formatKES(totalInvested, true) },
            { label: "Current Value", value: formatKES(totalValue, true) },
            { label: "Total Revenue", value: formatKES(totalRevenue, true) },
          ].map((s) => (
            <div key={s.label} style={{ textAlign: "right" }}>
              <div style={{ fontSize: 10, color: "var(--mali-slate-400)", textTransform: "uppercase", letterSpacing: "0.8px", marginBottom: 2 }}>{s.label}</div>
              <div style={{ fontSize: 14, fontWeight: 500, color: "var(--mali-slate-900)" }}>{s.value}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding: "16px 20px", display: "flex", flexDirection: "column", gap: 12 }}>
        {farmingProjects.map((farm) => {
          const profit = farm.totalRevenue - farm.totalExpenses;
          const status = statusStyles[farm.status];

          return (
            <div
              key={farm.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                padding: "16px",
                background: "var(--mali-slate-50)",
                borderRadius: 12,
                border: "1px solid var(--mali-slate-100)",
              }}
            >
              {/* Emoji icon */}
              <div style={{ width: 44, height: 44, borderRadius: 12, background: "var(--mali-emerald-muted)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>
                {typeEmoji[farm.type]}
              </div>

              {/* Name + date */}
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}>
                  <span style={{ fontSize: 14, fontWeight: 500, color: "var(--mali-slate-900)" }}>{farm.name}</span>
                  <span style={{ fontSize: 10, fontWeight: 500, padding: "2px 7px", borderRadius: 6, background: status.bg, color: status.color }}>{status.label}</span>
                </div>
                <div style={{ fontSize: 11, color: "var(--mali-slate-400)" }}>
                  Started {format(new Date(farm.startDate), "MMM yyyy")} · Capital {formatKES(farm.capitalInvested, true)}
                </div>
              </div>

              {/* Revenue vs Expenses */}
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 11, color: "var(--mali-slate-400)", marginBottom: 3 }}>Revenue / Expenses</div>
                <div style={{ fontSize: 13, fontWeight: 500, color: "var(--mali-slate-900)" }}>
                  {formatKES(farm.totalRevenue, true)} / {formatKES(farm.totalExpenses, true)}
                </div>
              </div>

              {/* Net profit */}
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 11, color: "var(--mali-slate-400)", marginBottom: 3 }}>Net Profit</div>
                <div style={{ fontSize: 13, fontWeight: 500, color: profit > 0 ? "var(--mali-positive)" : "var(--mali-negative)" }}>
                  {profit > 0 ? "+" : ""}{formatKES(profit, true)}
                </div>
              </div>

              {/* ROI badge */}
              <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 13, fontWeight: 600, color: "var(--mali-positive)", background: "var(--mali-positive-bg)", padding: "6px 12px", borderRadius: 20, flexShrink: 0 }}>
                <TrendingUp size={13} />
                {formatPercent(farm.roi)} ROI
              </div>
            </div>
          );
        })}

        {/* Add project CTA */}
        <button
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: 12,
            border: "1.5px dashed var(--mali-slate-200)",
            background: "transparent",
            fontSize: 13,
            color: "var(--mali-slate-400)",
            cursor: "pointer",
            fontFamily: "var(--font-body)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 6,
          }}
        >
          <Sprout size={14} />
          Add farming project
        </button>
      </div>
    </div>
  );
}
