"use client";

import { TrendingUp, TrendingDown, Clock, CheckCircle } from "lucide-react";
import { formatKES } from "@/lib/utils";
import type { DashboardSummary } from "@/types";

interface MetricCardsProps {
  summary: DashboardSummary;
}

export default function MetricCards({ summary }: MetricCardsProps) {
  const cards = [
    {
      label: "Monthly Income",
      value: formatKES(summary.monthlyIncome),
      change: "+8.2%",
      changeType: "up" as const,
      changeLabel: "vs last month",
    },
    {
      label: "Monthly Expenses",
      value: formatKES(summary.monthlyExpenses),
      change: "+14.1%",
      changeType: "down" as const,
      changeLabel: "vs last month",
    },
    {
      label: "Invested This Month",
      value: formatKES(35_000),
      change: "On track",
      changeType: "neutral" as const,
      changeLabel: "KES 35k target",
    },
    {
      label: "Upcoming Bills",
      value: formatKES(summary.upcomingBills),
      change: "Next 7 days",
      changeType: "info" as const,
      changeLabel: "3 bills due",
    },
  ];

  const badgeStyles = {
    up: { background: "var(--mali-positive-bg)", color: "var(--mali-positive)" },
    down: { background: "var(--mali-negative-bg)", color: "var(--mali-negative)" },
    neutral: { background: "var(--mali-emerald-muted)", color: "var(--mali-emerald-mid)" },
    info: { background: "#f0f4ff", color: "#3a5fa0" },
  };

  const BadgeIcon = {
    up: TrendingUp,
    down: TrendingUp,
    neutral: CheckCircle,
    info: Clock,
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: 12,
        marginBottom: 20,
      }}
    >
      {cards.map((card) => {
        const Icon = BadgeIcon[card.changeType];
        return (
          <div
            key={card.label}
            className="mali-card"
            style={{ padding: "18px 20px", cursor: "pointer" }}
          >
            <div
              style={{
                fontSize: 11,
                fontWeight: 500,
                letterSpacing: "0.8px",
                textTransform: "uppercase",
                color: "var(--mali-slate-400)",
                marginBottom: 10,
              }}
            >
              {card.label}
            </div>
            <div
              style={{
                fontSize: 22,
                fontWeight: 500,
                color: "var(--mali-slate-900)",
                letterSpacing: "-0.5px",
                lineHeight: 1,
              }}
            >
              {card.value}
            </div>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 4,
                marginTop: 10,
                padding: "2px 8px",
                borderRadius: 20,
                fontSize: 12,
                fontWeight: 500,
                ...badgeStyles[card.changeType],
              }}
            >
              <Icon size={11} />
              {card.change}
            </div>
          </div>
        );
      })}
    </div>
  );
}
