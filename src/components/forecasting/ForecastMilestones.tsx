"use client";

import {
  projectWealth,
  getMilestones,
  getKeyStats,
  type ScenarioKey,
  scenarios,
} from "@/lib/forecasting";
import { formatKES } from "@/lib/utils";
import { Flag } from "lucide-react";

interface ForecastMilestonesProps {
  scenario: ScenarioKey;
}

export default function ForecastMilestones({ scenario }: ForecastMilestonesProps) {
  const points     = projectWealth(scenario, 10);
  const milestones = getMilestones(points);
  const stats      = getKeyStats(points, scenario);
  const cfg        = scenarios[scenario];

  return (
    <div className="mali-milestones-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>

      {/* Key stats */}
      <div className="mali-card">
        <div style={{ padding: "18px 20px 14px", borderBottom: "1px solid var(--mali-slate-50)" }}>
          <div style={{ fontSize: 14, fontWeight: 500, color: "var(--mali-slate-900)" }}>
            10-Year Summary
          </div>
          <div style={{ fontSize: 11, color: "var(--mali-slate-400)", marginTop: 2 }}>
            {cfg.label} scenario outcomes
          </div>
        </div>
        <div style={{ padding: "16px 20px", display: "flex", flexDirection: "column", gap: 0 }}>
          {[
            { label: "Projected Net Worth",    value: formatKES(stats.finalNetWorth, true),     highlight: true  },
            { label: "Total Wealth Created",   value: `+${formatKES(stats.totalGrowth, true)}`, highlight: true  },
            { label: "Growth Multiple",        value: `${stats.growthMultiple}×`,               highlight: false },
            { label: "Investment Portfolio",   value: formatKES(stats.finalInvestments, true),  highlight: false },
            { label: "Annual Income (Yr 10)",  value: formatKES(stats.finalAnnualIncome, true), highlight: false },
            { label: "Annual Savings (Yr 10)", value: formatKES(stats.finalAnnualSavings, true),highlight: false },
            { label: "Avg Investment Return",  value: `${stats.avgAnnualReturn}% p.a.`,         highlight: false },
          ].map((item, i, arr) => (
            <div
              key={item.label}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "13px 0",
                borderBottom: i < arr.length - 1 ? "1px solid var(--mali-slate-50)" : "none",
              }}
            >
              <span style={{ fontSize: 13, color: "var(--mali-slate-500)" }}>{item.label}</span>
              <span
                style={{
                  fontSize: 14,
                  fontWeight: 500,
                  color: item.highlight ? "var(--mali-positive)" : "var(--mali-slate-900)",
                }}
              >
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Milestones */}
      <div className="mali-card">
        <div style={{ padding: "18px 20px 14px", borderBottom: "1px solid var(--mali-slate-50)" }}>
          <div style={{ fontSize: 14, fontWeight: 500, color: "var(--mali-slate-900)" }}>
            Wealth Milestones
          </div>
          <div style={{ fontSize: 11, color: "var(--mali-slate-400)", marginTop: 2 }}>
            When you hit key net worth targets
          </div>
        </div>
        <div style={{ padding: "16px 20px" }}>
          {milestones.length > 0 ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {milestones.map((m, i) => (
                <div
                  key={m.label}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    padding: "14px 16px",
                    background: i === 0 ? "var(--mali-emerald-subtle)" : "var(--mali-slate-50)",
                    borderRadius: 10,
                    border: `1px solid ${i === 0 ? "var(--mali-emerald-muted)" : "var(--mali-slate-100)"}`,
                  }}
                >
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 10,
                      background: i === 0 ? "var(--mali-emerald-muted)" : "var(--mali-slate-100)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Flag size={16} color={i === 0 ? "var(--mali-emerald-mid)" : "var(--mali-slate-400)"} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 500, color: "var(--mali-slate-900)" }}>
                      {m.label}
                    </div>
                    <div style={{ fontSize: 11, color: "var(--mali-slate-400)", marginTop: 2 }}>
                      Projected: {m.year}
                    </div>
                  </div>
                  <div
                    style={{
                      fontSize: 12,
                      fontWeight: 600,
                      color: i === 0 ? "var(--mali-emerald-mid)" : "var(--mali-slate-500)",
                      background: i === 0 ? "var(--mali-emerald-muted)" : "var(--mali-slate-100)",
                      padding: "3px 10px",
                      borderRadius: 20,
                      flexShrink: 0,
                    }}
                  >
                    {m.year}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ padding: "24px 0", textAlign: "center", color: "var(--mali-slate-400)", fontSize: 13 }}>
              No milestones reached within 10 years on this scenario.
            </div>
          )}

          {/* Tip */}
          <div
            style={{
              marginTop: 16,
              padding: "12px 14px",
              background: "var(--mali-gold-muted)",
              borderRadius: 10,
              borderLeft: "3px solid var(--mali-gold)",
              fontSize: 12,
              color: "var(--mali-slate-600)",
              lineHeight: 1.55,
            }}
          >
            <strong style={{ color: "var(--mali-gold)", fontWeight: 500 }}>
              Increase your savings rate
            </strong>{" "}
            by just 5% to reach these milestones 1–2 years earlier. Switch to the Optimistic scenario to see the full impact.
          </div>
        </div>
      </div>

    </div>
  );
}