"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { formatKES } from "@/lib/utils";

// Simulated monthly performance data per asset class
const performanceData = [
  { month: "Jan", MMF: 950_000, Stocks: 520_000, SACCO: 480_000, Farming: 350_000, Crypto: 172_000 },
  { month: "Feb", MMF: 972_000, Stocks: 548_000, SACCO: 490_000, Farming: 362_000, Crypto: 190_000 },
  { month: "Mar", MMF: 988_000, Stocks: 570_000, SACCO: 498_000, Farming: 375_000, Crypto: 165_000 },
  { month: "Apr", MMF: 1_002_000, Stocks: 596_000, SACCO: 508_000, Farming: 388_000, Crypto: 188_000 },
  { month: "May", MMF: 1_015_000, Stocks: 622_000, SACCO: 518_000, Farming: 400_000, Crypto: 210_000 },
  { month: "Jun", MMF: 1_001_000, Stocks: 648_000, SACCO: 531_000, Farming: 413_000, Crypto: 206_000 },
];

const lines = [
  { key: "MMF", color: "var(--mali-emerald-mid)", label: "Money Market" },
  { key: "Stocks", color: "var(--mali-gold)", label: "NSE Stocks" },
  { key: "SACCO", color: "var(--mali-emerald-light)", label: "SACCO" },
  { key: "Farming", color: "#7d9c8a", label: "Farming" },
  { key: "Crypto", color: "#c8d8ce", label: "Crypto" },
];

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: "var(--mali-emerald)", borderRadius: 10, padding: "10px 14px", fontSize: 12, color: "#fff", boxShadow: "0 4px 20px rgba(0,0,0,0.2)", minWidth: 160 }}>
      <div style={{ color: "rgba(255,255,255,0.5)", marginBottom: 8, fontSize: 11, fontWeight: 500 }}>{label} 2026</div>
      {payload.map((p: any) => (
        <div key={p.dataKey} style={{ display: "flex", justifyContent: "space-between", gap: 16, marginBottom: 3 }}>
          <span style={{ display: "flex", alignItems: "center", gap: 5, color: "rgba(255,255,255,0.7)" }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: p.color, display: "inline-block" }} />
            {p.dataKey}
          </span>
          <span style={{ fontWeight: 500 }}>{formatKES(p.value, true)}</span>
        </div>
      ))}
    </div>
  );
}

export default function InvestmentPerformanceChart() {
  return (
    <div className="mali-card">
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 20px 14px", borderBottom: "1px solid var(--mali-slate-50)" }}>
        <div>
          <div style={{ fontSize: 14, fontWeight: 500, color: "var(--mali-slate-900)" }}>Portfolio Performance</div>
          <div style={{ fontSize: 11, color: "var(--mali-slate-400)", marginTop: 2 }}>Value by asset class, Jan – Jun 2026</div>
        </div>
        {/* Legend */}
        <div style={{ display: "flex", gap: 14 }}>
          {lines.map((l) => (
            <div key={l.key} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, color: "var(--mali-slate-500)" }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: l.color }} />
              {l.label}
            </div>
          ))}
        </div>
      </div>
      <div style={{ padding: "16px 8px 8px" }}>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={performanceData} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--mali-slate-100)" vertical={false} />
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: "var(--mali-slate-400)", fontFamily: "var(--font-body)" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: "var(--mali-slate-400)", fontFamily: "var(--font-body)" }} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} width={44} />
            <Tooltip content={<CustomTooltip />} />
            {lines.map((l) => (
              <Line
                key={l.key}
                type="monotone"
                dataKey={l.key}
                stroke={l.color}
                strokeWidth={2}
                dot={{ r: 3, fill: l.color, strokeWidth: 2, stroke: "#fff" }}
                activeDot={{ r: 5 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
