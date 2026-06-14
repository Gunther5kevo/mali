"use client";

import { type Dispatch, type SetStateAction } from "react";
import { scenarios, type ScenarioKey } from "@/lib/forecasting";

interface ScenarioSelectorProps {
  active: ScenarioKey;
  onChange: Dispatch<SetStateAction<ScenarioKey>> | ((s: ScenarioKey) => void);
}

const scenarioStyles: Record<ScenarioKey, { activeBg: string; activeLabel: string; dot: string }> = {
  conservative: {
    activeBg:    "var(--mali-emerald-subtle)",
    activeLabel: "var(--mali-emerald-mid)",
    dot:         "var(--mali-slate-400)",
  },
  moderate: {
    activeBg:    "var(--mali-gold-muted)",
    activeLabel: "var(--mali-gold)",
    dot:         "var(--mali-gold)",
  },
  optimistic: {
    activeBg:    "var(--mali-emerald-muted)",
    activeLabel: "var(--mali-emerald-light)",
    dot:         "var(--mali-emerald-light)",
  },
};

export default function ScenarioSelector({ active, onChange }: ScenarioSelectorProps) {
  return (
    <div className="mali-scenario-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 20 }}>
      {(Object.keys(scenarios) as ScenarioKey[]).map((key) => {
        const s        = scenarios[key];
        const style    = scenarioStyles[key];
        const isActive = active === key;

        return (
          <button
            key={key}
            onClick={() => onChange(key)}
            style={{
              textAlign: "left",
              padding: "18px 20px",
              borderRadius: 14,
              border: `1.5px solid ${isActive ? style.activeLabel : "var(--mali-slate-100)"}`,
              background: isActive ? style.activeBg : "#fff",
              cursor: "pointer",
              fontFamily: "var(--font-body)",
              transition: "all 0.15s",
            }}
          >
            {/* Label row */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: style.dot }} />
                <span
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: isActive ? style.activeLabel : "var(--mali-slate-900)",
                    textTransform: "capitalize",
                  }}
                >
                  {s.label}
                </span>
              </div>
              {isActive && (
                <div
                  style={{
                    fontSize: 10,
                    fontWeight: 600,
                    letterSpacing: "0.8px",
                    textTransform: "uppercase",
                    color: style.activeLabel,
                    background: "#fff",
                    padding: "2px 7px",
                    borderRadius: 10,
                  }}
                >
                  Active
                </div>
              )}
            </div>

            {/* Description */}
            <div style={{ fontSize: 12, color: "var(--mali-slate-400)", marginBottom: 14, lineHeight: 1.5 }}>
              {s.description}
            </div>

            {/* Assumptions */}
            <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
              {[
                { label: "Investment return", value: `${s.investmentReturn}% p.a.` },
                { label: "Income growth",     value: `${s.incomeGrowth}% p.a.`     },
                { label: "Expense growth",    value: `${s.expenseGrowth}% p.a.`    },
              ].map((a) => (
                <div key={a.label} style={{ display: "flex", justifyContent: "space-between", fontSize: 11 }}>
                  <span style={{ color: "var(--mali-slate-400)" }}>{a.label}</span>
                  <span style={{ fontWeight: 500, color: isActive ? style.activeLabel : "var(--mali-slate-600)" }}>
                    {a.value}
                  </span>
                </div>
              ))}
            </div>
          </button>
        );
      })}
    </div>
  );
}