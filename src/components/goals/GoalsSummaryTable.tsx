"use client";

import { goals } from "@/lib/data";
import { formatKES } from "@/lib/utils";
import { format, differenceInMonths } from "date-fns";
import type { GoalCategory } from "@/types";

const statusConfig = {
  "on-track": { label: "On track",  color: "var(--mali-positive)",  bg: "var(--mali-positive-bg)"  },
  "behind":   { label: "Behind",    color: "var(--mali-negative)",  bg: "var(--mali-negative-bg)"  },
  "ahead":    { label: "Ahead",     color: "#3a5fa0",               bg: "#eff4ff"                  },
  "completed":{ label: "Completed", color: "var(--mali-slate-500)", bg: "var(--mali-slate-100)"    },
};

const categoryColors: Record<GoalCategory, string> = {
  emergency:  "var(--mali-emerald-mid)",
  land:       "var(--mali-gold)",
  home:       "#3a5fa0",
  vehicle:    "var(--mali-slate-600)",
  education:  "#7a3fa0",
  business:   "var(--mali-emerald-light)",
  travel:     "#2a7a8a",
  retirement: "var(--mali-gold)",
  other:      "var(--mali-slate-500)",
};

export default function GoalsSummaryTable() {
  return (
    <div className="mali-card">
      <div style={{ padding: "18px 20px 14px", borderBottom: "1px solid var(--mali-slate-50)" }}>
        <div style={{ fontSize: 14, fontWeight: 500, color: "var(--mali-slate-900)" }}>All Goals</div>
        <div style={{ fontSize: 11, color: "var(--mali-slate-400)", marginTop: 2 }}>
          {goals.length} goals · sorted by progress
        </div>
      </div>

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ background: "var(--mali-slate-50)", borderBottom: "1px solid var(--mali-slate-100)" }}>
            {["Goal", "Progress", "Saved", "Target", "Monthly", "Remaining", "Target Date", "Status"].map((col) => (
              <th
                key={col}
                style={{
                  padding: "10px 20px",
                  fontSize: 11,
                  fontWeight: 500,
                  color: "var(--mali-slate-400)",
                  textAlign: col === "Goal" ? "left" : "right",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                  whiteSpace: "nowrap",
                }}
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[...goals].sort((a, b) => b.progress - a.progress).map((goal, i) => {
            const status     = statusConfig[goal.status];
            const remaining  = goal.targetAmount - goal.currentAmount;
            const monthsLeft = differenceInMonths(new Date(goal.targetDate), new Date());
            const color      = categoryColors[goal.category];

            return (
              <tr
                key={goal.id}
                style={{
                  borderBottom: i < goals.length - 1 ? "1px solid var(--mali-slate-50)" : "none",
                  cursor: "pointer",
                }}
              >
                {/* Goal name */}
                <td style={{ padding: "14px 20px" }}>
                  <div style={{ fontSize: 13, fontWeight: 500, color: "var(--mali-slate-900)" }}>{goal.name}</div>
                  <div style={{ fontSize: 11, color: "var(--mali-slate-400)", marginTop: 1, textTransform: "capitalize" }}>
                    {goal.category}
                  </div>
                </td>

                {/* Progress bar */}
                <td style={{ padding: "14px 20px", textAlign: "right" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 8 }}>
                    <div style={{ width: 72, height: 5, background: "var(--mali-slate-100)", borderRadius: 3, overflow: "hidden" }}>
                      <div style={{ width: `${goal.progress}%`, height: "100%", background: color, borderRadius: 3 }} />
                    </div>
                    <span style={{ fontSize: 12, fontWeight: 500, color: "var(--mali-slate-900)", minWidth: 32 }}>
                      {goal.progress}%
                    </span>
                  </div>
                </td>

                {/* Saved */}
                <td style={{ padding: "14px 20px", textAlign: "right" }}>
                  <span style={{ fontSize: 13, fontWeight: 500, color: "var(--mali-positive)" }}>
                    {formatKES(goal.currentAmount, true)}
                  </span>
                </td>

                {/* Target */}
                <td style={{ padding: "14px 20px", textAlign: "right" }}>
                  <span style={{ fontSize: 13, color: "var(--mali-slate-600)" }}>
                    {formatKES(goal.targetAmount, true)}
                  </span>
                </td>

                {/* Monthly */}
                <td style={{ padding: "14px 20px", textAlign: "right" }}>
                  <span style={{ fontSize: 13, color: "var(--mali-slate-600)" }}>
                    {formatKES(goal.monthlyContribution, true)}
                  </span>
                </td>

                {/* Remaining */}
                <td style={{ padding: "14px 20px", textAlign: "right" }}>
                  <span style={{ fontSize: 13, color: "var(--mali-slate-900)", fontWeight: 500 }}>
                    {formatKES(remaining, true)}
                  </span>
                </td>

                {/* Target date */}
                <td style={{ padding: "14px 20px", textAlign: "right" }}>
                  <div style={{ fontSize: 13, color: "var(--mali-slate-900)" }}>
                    {format(new Date(goal.targetDate), "MMM yyyy")}
                  </div>
                  <div style={{ fontSize: 11, color: "var(--mali-slate-400)", marginTop: 1 }}>
                    {monthsLeft > 0 ? `${monthsLeft} months` : "Overdue"}
                  </div>
                </td>

                {/* Status */}
                <td style={{ padding: "14px 20px", textAlign: "right" }}>
                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      fontSize: 11,
                      fontWeight: 500,
                      padding: "3px 10px",
                      borderRadius: 20,
                      background: status.bg,
                      color: status.color,
                    }}
                  >
                    {status.label}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}