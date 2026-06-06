"use client";

import { AreaChart, Area, ResponsiveContainer, Tooltip } from "recharts";
import { formatKES } from "@/lib/utils";

const mmfData = [
  { month: "Jan", value: 950_000 },
  { month: "Feb", value: 972_000 },
  { month: "Mar", value: 988_000 },
  { month: "Apr", value: 1_002_000 },
  { month: "May", value: 1_015_000 },
  { month: "Jun", value: 1_001_000 },
];

const funds = [
  { id: "f1", name: "Sanlam Money Market Fund", value: 542_000, rate: 11.4, contributions: 500_000, gain: 42_000 },
  { id: "f2", name: "CIC Money Market Fund", value: 459_000, rate: 13.2, contributions: 430_000, gain: 29_000 },
];

export default function MMFPanel() {
  const total = funds.reduce((s, f) => s + f.value, 0);
  const totalGain = funds.reduce((s, f) => s + f.gain, 0);

  return (
    <div className="mali-card">
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 20px 14px", borderBottom: "1px solid var(--mali-slate-50)" }}>
        <div>
          <div style={{ fontSize: 14, fontWeight: 500, color: "var(--mali-slate-900)" }}>Money Market Funds</div>
          <div style={{ fontSize: 11, color: "var(--mali-slate-400)", marginTop: 2 }}>CMA regulated · Daily liquidity</div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: 18, fontWeight: 500, color: "var(--mali-slate-900)" }}>{formatKES(total, true)}</div>
          <div style={{ fontSize: 11, color: "var(--mali-positive)" }}>+{formatKES(totalGain, true)} earned</div>
        </div>
      </div>

      {/* Mini chart */}
      <div style={{ padding: "12px 0 4px" }}>
        <ResponsiveContainer width="100%" height={60}>
          <AreaChart data={mmfData} margin={{ top: 2, right: 8, left: 8, bottom: 0 }}>
            <defs>
              <linearGradient id="mmfGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2d5a42" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#2d5a42" stopOpacity={0} />
              </linearGradient>
            </defs>
            <Tooltip formatter={(v: any) => formatKES(v, true)} contentStyle={{ fontSize: 11, borderRadius: 8, border: "none", background: "var(--mali-emerald)", color: "#fff" }} />
            <Area type="monotone" dataKey="value" stroke="#2d5a42" strokeWidth={1.5} fill="url(#mmfGrad)" dot={false} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Fund list */}
      <div style={{ padding: "8px 20px 16px", display: "flex", flexDirection: "column", gap: 10 }}>
        {funds.map((fund) => (
          <div key={fund.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 14px", background: "var(--mali-slate-50)", borderRadius: 10 }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 500, color: "var(--mali-slate-900)", marginBottom: 2 }}>{fund.name}</div>
              <div style={{ fontSize: 11, color: "var(--mali-slate-400)" }}>Contributions {formatKES(fund.contributions, true)}</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 14, fontWeight: 500, color: "var(--mali-slate-900)" }}>{formatKES(fund.value, true)}</div>
              <div style={{ fontSize: 11, color: "var(--mali-positive)", marginTop: 2 }}>
                {fund.rate}% p.a. yield
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
