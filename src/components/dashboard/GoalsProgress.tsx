"use client";

import { goals } from "@/lib/data";
import { formatKES } from "@/lib/utils";
import { format } from "date-fns";

const goalColors: Record<string, string> = {
  "on-track": "var(--mali-emerald-light)",
  behind: "var(--mali-gold)",
  ahead: "var(--mali-positive)",
  completed: "var(--mali-slate-400)",
};

const statusLabels: Record<string, string> = {
  "on-track": "On track",
  behind: "Behind",
  ahead: "Ahead",
  completed: "Done",
};

export default function GoalsProgress() {
  return (
    <div className="mali-card">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "18px 20px 14px",
          borderBottom: "1px solid var(--mali-slate-50)",
        }}
      >
        <div>
          <div style={{ fontSize: 14, fontWeight: 500, color: "var(--mali-slate-900)" }}>
            Goals Progress
          </div>
          <div style={{ fontSize: 11, color: "var(--mali-slate-400)", marginTop: 2 }}>
            {goals.length} active goals
          </div>
        </div>
        <button
          style={{
            fontSize: 12,
            color: "var(--mali-emerald-light)",
            fontWeight: 500,
            border: "none",
            background: "none",
            cursor: "pointer",
            fontFamily: "var(--font-body)",
          }}
        >
          Manage →
        </button>
      </div>

      <div style={{ padding: "16px 20px", display: "flex", flexDirection: "column", gap: 16 }}>
        {goals.map((goal) => {
          const barColor = goalColors[goal.status];
          return (
            <div key={goal.id}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                  marginBottom: 6,
                }}
              >
                <span
                  style={{
                    fontSize: 13,
                    fontWeight: 500,
                    color: "var(--mali-slate-900)",
                  }}
                >
                  {goal.name}
                </span>
                <span style={{ fontSize: 12, color: "var(--mali-slate-400)" }}>
                  {goal.progress}%
                </span>
              </div>
              <div
                style={{
                  height: 5,
                  background: "var(--mali-slate-100)",
                  borderRadius: 3,
                  overflow: "hidden",
                  marginBottom: 5,
                }}
              >
                <div
                  style={{
                    width: `${goal.progress}%`,
                    height: "100%",
                    background: barColor,
                    borderRadius: 3,
                    transition: "width 0.5s ease",
                  }}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: 11,
                  color: "var(--mali-slate-400)",
                }}
              >
                <span>
                  {formatKES(goal.currentAmount, true)} of {formatKES(goal.targetAmount, true)}
                </span>
                <span
                  style={{
                    fontWeight: 500,
                    color: barColor,
                  }}
                >
                  {goal.status === "on-track"
                    ? format(new Date(goal.targetDate), "MMM yyyy")
                    : statusLabels[goal.status]}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
