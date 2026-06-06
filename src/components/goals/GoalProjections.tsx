"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  ResponsiveContainer,
} from "recharts";
import { goals } from "@/lib/data";
import { formatKES } from "@/lib/utils";

// Project each goal forward month by month for 24 months
function buildProjection(currentAmount: number, monthlyContribution: number, targetAmount: number, months = 24) {
  const data: number[] = [];
  let running = currentAmount;
  for (let i = 0; i <= months; i++) {
    data.push(Math.min(running, targetAmount));
    running += monthlyContribution;
  }
  return data;
}

const MONTHS = Array.from({ length: 25 }, (_, i) => {
  const d = new Date(2026, 5 + i, 1); // start June 2026
  return d.toLocaleDateString("en-KE", { month: "short", year: "2-digit" });
});

const colors = [
  "var(--mali-emerald-mid)",
  "var(--mali-gold)",
  "var(--mali-emerald-light)",
  "#7a3fa0",
];

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div
      style={{
        background: "var(--mali-emerald)",
        borderRadius: 10,
        padding: "10px 14px",
        fontSize: 12,
        color: "#fff",
        boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
        minWidth: 160,
      }}
    >
      <div style={{ color: "rgba(255,255,255,0.5)", marginBottom: 6, fontSize: 11 }}>{label}</div>
      {payload.map((p: any) => (
        <div key={p.name} style={{ display: "flex", justifyContent: "space-between", gap: 16, marginBottom: 3 }}>
          <span style={{ display: "flex", alignItems: "center", gap: 5, color: "rgba(255,255,255,0.7)" }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: p.color, display: "inline-block" }} />
            {p.name}
          </span>
          <span style={{ fontWeight: 500 }}>{formatKES(p.value, true)}</span>
        </div>
      ))}
    </div>
  );
}

export default function GoalProjections() {
  // Build chart data: one row per month
  const chartData = MONTHS.map((month, i) => {
    const row: Record<string, any> = { month };
    goals.forEach((goal) => {
      const projection = buildProjection(goal.currentAmount, goal.monthlyContribution, goal.targetAmount);
      row[goal.name] = projection[i] ?? goal.targetAmount;
    });
    return row;
  });

  return (
    <div className="mali-card" style={{ marginBottom: 16 }}>
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
            Goal Projections
          </div>
          <div style={{ fontSize: 11, color: "var(--mali-slate-400)", marginTop: 2 }}>
            At current contribution pace · Next 24 months
          </div>
        </div>

        {/* Legend */}
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "flex-end" }}>
          {goals.map((goal, i) => (
            <div key={goal.id} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, color: "var(--mali-slate-500)" }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: colors[i] }} />
              {goal.name}
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding: "16px 8px 8px" }}>
        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={chartData} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--mali-slate-100)" vertical={false} />
            <XAxis
              dataKey="month"
              tick={{ fontSize: 10, fill: "var(--mali-slate-400)", fontFamily: "var(--font-body)" }}
              axisLine={false}
              tickLine={false}
              interval={2}
            />
            <YAxis
              tick={{ fontSize: 10, fill: "var(--mali-slate-400)", fontFamily: "var(--font-body)" }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `${(v / 1_000_000).toFixed(1)}M`}
              width={40}
            />
            <Tooltip content={<CustomTooltip />} />
            {goals.map((goal, i) => (
              <Line
                key={goal.id}
                type="monotone"
                dataKey={goal.name}
                stroke={colors[i]}
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}