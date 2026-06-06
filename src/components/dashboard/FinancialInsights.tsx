"use client";

import { AlertTriangle, Shield, TrendingUp, Coins, X } from "lucide-react";
import { useMaliStore } from "@/store";
import type { FinancialInsight } from "@/types";

const icons = {
  warning: AlertTriangle,
  info: Shield,
  positive: TrendingUp,
  urgent: AlertTriangle,
};

const styles = {
  warning: {
    border: "var(--mali-gold)",
    iconColor: "var(--mali-gold)",
  },
  info: {
    border: "var(--mali-emerald-light)",
    iconColor: "var(--mali-emerald-light)",
  },
  positive: {
    border: "var(--mali-positive)",
    iconColor: "var(--mali-positive)",
  },
  urgent: {
    border: "var(--mali-negative)",
    iconColor: "var(--mali-negative)",
  },
};

export default function FinancialInsights() {
  const { insights, dismissInsight } = useMaliStore();

  return (
    <div className="mali-card">
      <div
        style={{
          padding: "18px 20px 14px",
          borderBottom: "1px solid var(--mali-slate-50)",
        }}
      >
        <div style={{ fontSize: 14, fontWeight: 500, color: "var(--mali-slate-900)" }}>
          Financial Insights
        </div>
        <div style={{ fontSize: 11, color: "var(--mali-slate-400)", marginTop: 2 }}>
          Personalised to your finances
        </div>
      </div>

      <div style={{ padding: "14px 16px", display: "flex", flexDirection: "column", gap: 8 }}>
        {insights.map((insight) => {
          const Icon = icons[insight.severity];
          const style = styles[insight.severity];
          return (
            <div
              key={insight.id}
              style={{
                display: "flex",
                gap: 10,
                padding: "10px 12px",
                background: "var(--mali-slate-50)",
                borderRadius: 10,
                borderLeft: `3px solid ${style.border}`,
                position: "relative",
              }}
            >
              <Icon
                size={15}
                style={{ color: style.iconColor, flexShrink: 0, marginTop: 1 }}
              />
              <div style={{ fontSize: 12.5, color: "var(--mali-slate-600)", lineHeight: 1.55, flex: 1 }}>
                <strong style={{ color: "var(--mali-slate-900)", fontWeight: 500 }}>
                  {insight.title}
                </strong>{" "}
                — {insight.body}
              </div>
              <button
                onClick={() => dismissInsight(insight.id)}
                style={{
                  border: "none",
                  background: "none",
                  cursor: "pointer",
                  color: "var(--mali-slate-300)",
                  padding: 0,
                  flexShrink: 0,
                  lineHeight: 1,
                }}
              >
                <X size={12} />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
