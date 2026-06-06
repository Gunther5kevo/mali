"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { format } from "date-fns";
import { netWorthHistory } from "@/lib/data";
import { formatKES } from "@/lib/utils";

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
      }}
    >
      <div style={{ color: "rgba(255,255,255,0.6)", marginBottom: 6, fontSize: 11 }}>
        {label}
      </div>
      {payload.map((p: any) => (
        <div key={p.name} style={{ display: "flex", justifyContent: "space-between", gap: 16 }}>
          <span style={{ color: "rgba(255,255,255,0.7)" }}>{p.name}</span>
          <span style={{ fontWeight: 500 }}>{formatKES(p.value, true)}</span>
        </div>
      ))}
    </div>
  );
}

export default function NetWorthChart() {
  const data = netWorthHistory.slice(-6).map((d) => ({
    date: format(new Date(d.date), "MMM"),
    "Net Worth": d.netWorth,
    Investments: d.investments,
  }));

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
            Net Worth Growth
          </div>
          <div style={{ fontSize: 11, color: "var(--mali-slate-400)", marginTop: 2 }}>
            Jan 2026 – Jun 2026
          </div>
        </div>
        <div style={{ display: "flex", gap: 16, fontSize: 12, color: "var(--mali-slate-400)" }}>
          <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <span style={{ width: 10, height: 2, background: "var(--mali-emerald-mid)", display: "inline-block", borderRadius: 1 }} />
            Net Worth
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <span style={{ width: 10, height: 2, background: "var(--mali-gold)", display: "inline-block", borderRadius: 1 }} />
            Investments
          </span>
        </div>
      </div>
      <div style={{ padding: "16px 8px 8px" }}>
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={data} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="nwGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2d5a42" stopOpacity={0.12} />
                <stop offset="95%" stopColor="#2d5a42" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--mali-slate-100)" vertical={false} />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 11, fill: "var(--mali-slate-400)", fontFamily: "var(--font-body)" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 11, fill: "var(--mali-slate-400)", fontFamily: "var(--font-body)" }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `${(v / 1_000_000).toFixed(1)}M`}
              width={48}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="Net Worth"
              stroke="#2d5a42"
              strokeWidth={2}
              fill="url(#nwGradient)"
              dot={{ r: 3, fill: "#2d5a42", strokeWidth: 2, stroke: "#fff" }}
            />
            <Area
              type="monotone"
              dataKey="Investments"
              stroke="#b8922a"
              strokeWidth={1.5}
              strokeDasharray="5 3"
              fill="transparent"
              dot={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
