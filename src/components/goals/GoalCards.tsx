"use client";

import { goals } from "@/lib/data";
import { formatKES } from "@/lib/utils";
import { format, differenceInMonths } from "date-fns";
import {
  ShieldCheck,
  MapPin,
  Home,
  Car,
  GraduationCap,
  Briefcase,
  Plane,
  Sunset,
  Target,
} from "lucide-react";
import type { GoalCategory } from "@/types";

const categoryConfig: Record<GoalCategory, { icon: any; color: string; bg: string }> = {
  emergency:  { icon: ShieldCheck,   color: "var(--mali-emerald-mid)",  bg: "var(--mali-emerald-subtle)" },
  land:       { icon: MapPin,        color: "var(--mali-gold)",         bg: "var(--mali-gold-muted)"     },
  home:       { icon: Home,          color: "#3a5fa0",                  bg: "#eff4ff"                    },
  vehicle:    { icon: Car,           color: "var(--mali-slate-600)",    bg: "var(--mali-slate-100)"      },
  education:  { icon: GraduationCap, color: "#7a3fa0",                  bg: "#f5eeff"                    },
  business:   { icon: Briefcase,     color: "var(--mali-emerald-light)", bg: "var(--mali-emerald-muted)" },
  travel:     { icon: Plane,         color: "#2a7a8a",                  bg: "#eaf7f9"                    },
  retirement: { icon: Sunset,        color: "var(--mali-gold)",         bg: "var(--mali-gold-muted)"     },
  other:      { icon: Target,        color: "var(--mali-slate-500)",    bg: "var(--mali-slate-100)"      },
};

const statusConfig = {
  "on-track": { label: "On track",  color: "var(--mali-positive)",  bg: "var(--mali-positive-bg)"  },
  "behind":   { label: "Behind",    color: "var(--mali-negative)",  bg: "var(--mali-negative-bg)"  },
  "ahead":    { label: "Ahead",     color: "#3a5fa0",               bg: "#eff4ff"                  },
  "completed":{ label: "Completed", color: "var(--mali-slate-500)", bg: "var(--mali-slate-100)"    },
};

export default function GoalCards() {
  return (
    <div className="mali-goal-cards" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 14, marginBottom: 20 }}>
      {goals.map((goal) => {
        const cfg    = categoryConfig[goal.category];
        const status = statusConfig[goal.status];
        const Icon   = cfg.icon;

        const remaining    = goal.targetAmount - goal.currentAmount;
        const monthsLeft   = differenceInMonths(new Date(goal.targetDate), new Date());
        const projectedEnd = format(new Date(goal.targetDate), "MMM yyyy");

        // How many months at current pace to reach target
        const monthsAtPace = goal.monthlyContribution > 0
          ? Math.ceil(remaining / goal.monthlyContribution)
          : null;

        return (
          <div
            key={goal.id}
            style={{
              background: "#fff",
              border: "1px solid var(--mali-slate-100)",
              borderRadius: 14,
              padding: "22px 24px",
              cursor: "pointer",
              transition: "border-color 0.15s, box-shadow 0.15s",
            }}
          >
            {/* Header row */}
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 18 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    background: cfg.bg,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <Icon size={20} color={cfg.color} />
                </div>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 500, color: "var(--mali-slate-900)" }}>
                    {goal.name}
                  </div>
                  <div style={{ fontSize: 12, color: "var(--mali-slate-400)", marginTop: 2, textTransform: "capitalize" }}>
                    {goal.category}
                  </div>
                </div>
              </div>

              {/* Status badge */}
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 500,
                  padding: "3px 10px",
                  borderRadius: 20,
                  background: status.bg,
                  color: status.color,
                  flexShrink: 0,
                }}
              >
                {status.label}
              </div>
            </div>

            {/* Amounts */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 10 }}>
              <div>
                <div style={{ fontSize: 26, fontWeight: 500, color: "var(--mali-slate-900)", letterSpacing: "-0.5px" }}>
                  {formatKES(goal.currentAmount)}
                </div>
                <div style={{ fontSize: 12, color: "var(--mali-slate-400)", marginTop: 2 }}>
                  of {formatKES(goal.targetAmount)} target
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 28, fontWeight: 500, color: cfg.color }}>
                  {goal.progress}%
                </div>
              </div>
            </div>

            {/* Progress bar */}
            <div style={{ height: 6, background: "var(--mali-slate-100)", borderRadius: 3, overflow: "hidden", marginBottom: 16 }}>
              <div
                style={{
                  width: `${goal.progress}%`,
                  height: "100%",
                  background: cfg.color,
                  borderRadius: 3,
                  transition: "width 0.5s ease",
                }}
              />
            </div>

            {/* Stats row */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gap: 0,
                borderTop: "1px solid var(--mali-slate-50)",
                paddingTop: 14,
              }}
            >
              {[
                {
                  label: "Monthly",
                  value: formatKES(goal.monthlyContribution, true),
                  sub: "contribution",
                },
                {
                  label: "Remaining",
                  value: formatKES(remaining, true),
                  sub: "to save",
                },
                {
                  label: "Target date",
                  value: projectedEnd,
                  sub: `${monthsLeft > 0 ? monthsLeft + " months" : "Due"}`,
                },
              ].map((stat) => (
                <div key={stat.label} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 13, fontWeight: 500, color: "var(--mali-slate-900)" }}>
                    {stat.value}
                  </div>
                  <div style={{ fontSize: 10, color: "var(--mali-slate-400)", marginTop: 2, textTransform: "uppercase", letterSpacing: "0.5px" }}>
                    {stat.label}
                  </div>
                  <div style={{ fontSize: 10, color: "var(--mali-slate-400)" }}>
                    {stat.sub}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}