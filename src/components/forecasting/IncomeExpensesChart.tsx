"use client";

import {
  BarChart,
  Bar,
  Line,
  ComposedChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { projectWealth, type ScenarioKey } from "@/lib/forecasting";
import { formatKES } from "@/lib/utils";

interface IncomeExpensesChartProps {
  scenario: ScenarioKey;
}

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: "var(--mali-emerald)", borderRadius: 10, padding: "10px 14px", fontSize: 12, color: "#fff", boxShadow: "0 4px 20px rgba(0,0,0,0.2)", minWidth: 180 }}>
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

export default function IncomeExpensesChart({ scenario }: IncomeExpensesChartProps) {
  const points = projectWealth(scenario, 10);

  const chartData = points.map((p) => ({
    year:     p.year,
    Income:   p.annualIncome,
    Expenses: p.annualExpenses,
    Savings:  p.annualSavings,
  }));

  return (
    <div className="mali-card" style={{ marginBottom: 16 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 20px 14px", borderBottom: "1px solid var(--mali-slate-50)" }}>
        <div>
          <div style={{ fontSize: 14, fontWeight: 500, color: "var(--mali-slate-900)" }}>Income, Expenses & Savings</div>
          <div style={{ fontSize: 11, color: "var(--mali-slate-400)", marginTop: 2 }}>Annual projections over 10 years</div>
        </div>
        <div style={{ display: "flex", gap: 16 }}>
          {[
            { label: "Income",   color: "var(--mali-emerald-mid)" },
            { label: "Expenses", color: "var(--mali-slate-200)"   },
            { label: "Savings",  color: "var(--mali-gold)"        },
          ].map((l) => (
            <div key={l.label} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, color: "var(--mali-slate-500)" }}>
              <div style={{ width: 8, height: 8, borderRadius: 2, background: l.color }} />
              {l.label}
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding: "16px 8px 8px" }}>
        <ResponsiveContainer width="100%" height={240}>
          <ComposedChart data={chartData} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--mali-slate-100)" vertical={false} />
            <XAxis
              dataKey="year"
              tick={{ fontSize: 11, fill: "var(--mali-slate-400)", fontFamily: "var(--font-body)" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 11, fill: "var(--mali-slate-400)", fontFamily: "var(--font-body)" }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
              width={44}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="Income"   fill="var(--mali-emerald-mid)" radius={[3, 3, 0, 0]} barSize={18} />
            <Bar dataKey="Expenses" fill="var(--mali-slate-200)"   radius={[3, 3, 0, 0]} barSize={18} />
            <Line
              type="monotone"
              dataKey="Savings"
              stroke="var(--mali-gold)"
              strokeWidth={2}
              dot={{ r: 3, fill: "var(--mali-gold)", strokeWidth: 2, stroke: "#fff" }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}