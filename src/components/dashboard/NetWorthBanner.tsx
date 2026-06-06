"use client";

import { TrendingUp } from "lucide-react";
import { formatKES, formatPercent } from "@/lib/utils";
import type { DashboardSummary } from "@/types";

interface NetWorthBannerProps {
  summary: DashboardSummary;
}

export default function NetWorthBanner({ summary }: NetWorthBannerProps) {
  const isPositive = summary.netWorthChange >= 0;

  return (
    <div
      style={{
        background: "var(--mali-emerald)",
        borderRadius: 16,
        padding: "28px 32px",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        marginBottom: 20,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative circles */}
      <div
        style={{
          position: "absolute", top: -40, right: -40,
          width: 220, height: 220, borderRadius: "50%",
          border: "1px solid rgba(255,255,255,0.05)",
        }}
      />
      <div
        style={{
          position: "absolute", bottom: -80, right: 60,
          width: 300, height: 300, borderRadius: "50%",
          border: "1px solid rgba(255,255,255,0.03)",
        }}
      />

      {/* Left: Net Worth */}
      <div style={{ position: "relative", zIndex: 1 }}>
        <div
          style={{
            fontSize: 11, fontWeight: 500, letterSpacing: "1.5px",
            textTransform: "uppercase", color: "rgba(255,255,255,0.5)",
            marginBottom: 8,
          }}
        >
          Total Net Worth
        </div>
        <div
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 44,
            fontWeight: 500,
            color: "#fff",
            letterSpacing: "-1px",
            lineHeight: 1,
          }}
        >
          {formatKES(summary.netWorth)}
        </div>

        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 5,
            marginTop: 12,
            background: "rgba(126, 232, 162, 0.12)",
            borderRadius: 20,
            padding: "4px 12px",
            fontSize: 12,
            fontWeight: 500,
            color: "#7ee8a2",
          }}
        >
          <TrendingUp size={13} />
          +{formatKES(summary.netWorthChange, true)} this year ({formatPercent(summary.netWorthChangePercent, true)})
        </div>

        {/* Health Score */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginTop: 16,
            background: "rgba(184,146,42,0.15)",
            border: "1px solid rgba(184,146,42,0.3)",
            borderRadius: 10,
            padding: "6px 14px",
            width: "fit-content",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 22,
              fontWeight: 600,
              color: "var(--mali-gold)",
            }}
          >
            {summary.healthScore}
          </span>
          <div>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", marginBottom: 4 }}>
              Financial Health Score
            </div>
            <div
              style={{
                width: 80, height: 4,
                background: "rgba(255,255,255,0.15)",
                borderRadius: 2, overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: `${summary.healthScore}%`,
                  height: "100%",
                  background: "var(--mali-gold)",
                  borderRadius: 2,
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Right: Key Figures */}
      <div
        style={{
          display: "flex",
          gap: 40,
          position: "relative",
          zIndex: 1,
          paddingTop: 4,
        }}
      >
        {[
          {
            label: "Cash & Liquid",
            value: formatKES(summary.cashPosition, true),
            sub: "M-Pesa · Bank · Wallet",
            subColor: "rgba(255,255,255,0.4)",
          },
          {
            label: "Investments",
            value: formatKES(summary.investmentValue, true),
            sub: "+12.4% overall",
            subColor: "#7ee8a2",
          },
          {
            label: "Savings Rate",
            value: `${summary.savingsRate}%`,
            sub: "Above target",
            subColor: "#7ee8a2",
          },
        ].map((stat) => (
          <div key={stat.label} style={{ textAlign: "right" }}>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.45)", marginBottom: 4 }}>
              {stat.label}
            </div>
            <div style={{ fontSize: 20, fontWeight: 500, color: "#fff" }}>{stat.value}</div>
            <div style={{ fontSize: 11, color: stat.subColor, marginTop: 2 }}>{stat.sub}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
