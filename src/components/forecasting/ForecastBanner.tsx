"use client";

import { projectWealth, type ScenarioKey, scenarios } from "@/lib/forecasting";
import { formatKES } from "@/lib/utils";
import { TrendingUp } from "lucide-react";

interface ForecastBannerProps {
  scenario: ScenarioKey;
}

export default function ForecastBanner({ scenario }: ForecastBannerProps) {
  const points  = projectWealth(scenario, 10);
  const cfg     = scenarios[scenario];

  const at1yr   = points[1];
  const at5yr   = points[5];
  const at10yr  = points[10];
  const now     = points[0];

  const multiple = (at10yr.netWorth / now.netWorth).toFixed(1);

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

      <div style={{ position: "relative", zIndex: 1 }}>

        {/* Top row */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 28 }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 500, letterSpacing: "1.5px", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginBottom: 8 }}>
              10-Year Projection · {cfg.label} Scenario
            </div>
            <div style={{ fontFamily: "var(--font-display)", fontSize: 44, fontWeight: 500, color: "#fff", letterSpacing: "-1px", lineHeight: 1 }}>
              {formatKES(at10yr.netWorth)}
            </div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 6, marginTop: 12, background: "rgba(126,232,162,0.12)", borderRadius: 20, padding: "4px 12px" }}>
              <TrendingUp size={13} color="#7ee8a2" />
              <span style={{ fontSize: 12, fontWeight: 500, color: "#7ee8a2" }}>
                {multiple}× your current net worth in 10 years
              </span>
            </div>
          </div>

          {/* Current net worth */}
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginBottom: 4 }}>Starting point (today)</div>
            <div style={{ fontSize: 20, fontWeight: 500, color: "rgba(255,255,255,0.7)" }}>{formatKES(now.netWorth)}</div>
          </div>
        </div>

        {/* Three milestones */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 1 }}>
          {[
            { label: "1 Year",  point: at1yr  },
            { label: "5 Years", point: at5yr  },
            { label: "10 Years",point: at10yr },
          ].map((item, i) => {
            const growth = ((item.point.netWorth - now.netWorth) / now.netWorth * 100).toFixed(0);
            return (
              <div
                key={item.label}
                style={{
                  padding: "20px 24px",
                  background: "rgba(255,255,255,0.06)",
                  borderRadius: i === 0 ? "12px 0 0 12px" : i === 2 ? "0 12px 12px 0" : 0,
                  borderRight: i < 2 ? "1px solid rgba(255,255,255,0.06)" : "none",
                }}
              >
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.45)", textTransform: "uppercase", letterSpacing: "1px", marginBottom: 10 }}>
                  {item.label}
                </div>
                <div style={{ fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 500, color: "#fff", letterSpacing: "-0.5px", marginBottom: 6 }}>
                  {formatKES(item.point.netWorth, true)}
                </div>
                <div style={{ display: "flex", gap: 14 }}>
                  <div>
                    <div style={{ fontSize: 10, color: "rgba(255,255,255,0.35)", marginBottom: 2 }}>Investments</div>
                    <div style={{ fontSize: 12, color: "rgba(255,255,255,0.7)" }}>{formatKES(item.point.investments, true)}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 10, color: "rgba(255,255,255,0.35)", marginBottom: 2 }}>Growth</div>
                    <div style={{ fontSize: 12, color: "#7ee8a2" }}>+{growth}%</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}