"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { spendingByCategory } from "@/lib/data";
import { formatKES } from "@/lib/utils";

const monthlyComparison = [
  { month: "Feb", income: 165_000, expenses: 108_000 },
  { month: "Mar", income: 165_000, expenses: 115_000 },
  { month: "Apr", income: 185_000, expenses: 112_000 },
  { month: "May", income: 185_000, expenses: 116_000 },
  { month: "Jun", income: 185_000, expenses: 132_400 },
];

function DonutTooltip({ active, payload }: any) {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div style={{ background: "var(--mali-emerald)", borderRadius: 8, padding: "8px 12px", fontSize: 12, color: "#fff" }}>
      <div style={{ fontWeight: 500 }}>{d.category}</div>
      <div style={{ color: "rgba(255,255,255,0.7)" }}>{formatKES(d.amount)} · {d.percent}%</div>
    </div>
  );
}

function BarTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: "var(--mali-emerald)", borderRadius: 8, padding: "8px 12px", fontSize: 12, color: "#fff" }}>
      <div style={{ color: "rgba(255,255,255,0.5)", marginBottom: 4 }}>{label}</div>
      {payload.map((p: any) => (
        <div key={p.name} style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
          <span style={{ color: "rgba(255,255,255,0.7)" }}>{p.name}</span>
          <span style={{ fontWeight: 500 }}>{formatKES(p.value, true)}</span>
        </div>
      ))}
    </div>
  );
}

export default function SpendingBreakdown() {
  const totalSpend = spendingByCategory.reduce((s, c) => s + c.amount, 0);

  return (
    <div className="mali-spending-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>

      {/* Donut + category list */}
      <div className="mali-card">
        <div style={{ padding: "18px 20px 14px", borderBottom: "1px solid var(--mali-slate-50)" }}>
          <div style={{ fontSize: 14, fontWeight: 500, color: "var(--mali-slate-900)" }}>Spending by Category</div>
          <div style={{ fontSize: 11, color: "var(--mali-slate-400)", marginTop: 2 }}>June 2026 · {formatKES(totalSpend, true)} total</div>
        </div>
        <div style={{ padding: "16px 20px", display: "flex", gap: 20, alignItems: "center" }}>

          {/* Donut */}
          <div style={{ flexShrink: 0 }}>
            <ResponsiveContainer width={140} height={140}>
              <PieChart>
                <Pie
                  data={spendingByCategory}
                  cx="50%"
                  cy="50%"
                  innerRadius={42}
                  outerRadius={66}
                  paddingAngle={2}
                  dataKey="amount"
                >
                  {spendingByCategory.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<DonutTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Category list */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
            {spendingByCategory.map((cat) => (
              <div key={cat.category} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 7, height: 7, borderRadius: "50%", background: cat.color, flexShrink: 0 }} />
                <span style={{ fontSize: 12, color: "var(--mali-slate-600)", flex: 1 }}>{cat.category}</span>
                <div style={{ width: 60, height: 3, background: "var(--mali-slate-100)", borderRadius: 2, overflow: "hidden" }}>
                  <div style={{ width: `${cat.percent}%`, height: "100%", background: cat.color, borderRadius: 2 }} />
                </div>
                <span style={{ fontSize: 12, fontWeight: 500, color: "var(--mali-slate-900)", minWidth: 56, textAlign: "right" }}>
                  {formatKES(cat.amount, true)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Income vs Expenses bar */}
      <div className="mali-card">
        <div style={{ padding: "18px 20px 14px", borderBottom: "1px solid var(--mali-slate-50)" }}>
          <div style={{ fontSize: 14, fontWeight: 500, color: "var(--mali-slate-900)" }}>Income vs Expenses</div>
          <div style={{ fontSize: 11, color: "var(--mali-slate-400)", marginTop: 2 }}>Last 5 months</div>
        </div>
        <div style={{ padding: "16px 8px 8px" }}>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={monthlyComparison} barCategoryGap="30%" barGap={4} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--mali-slate-100)" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "var(--mali-slate-400)", fontFamily: "var(--font-body)" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "var(--mali-slate-400)", fontFamily: "var(--font-body)" }} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} width={36} />
              <Tooltip content={<BarTooltip />} />
              <Bar dataKey="income" name="Income" fill="var(--mali-emerald-mid)" radius={[3, 3, 0, 0]} />
              <Bar dataKey="expenses" name="Expenses" fill="var(--mali-slate-200)" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", marginTop: 4 }}>
            {[{ label: "Income", color: "var(--mali-emerald-mid)" }, { label: "Expenses", color: "var(--mali-slate-200)" }].map((l) => (
              <div key={l.label} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, color: "var(--mali-slate-500)" }}>
                <div style={{ width: 8, height: 8, borderRadius: 2, background: l.color }} />
                {l.label}
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}