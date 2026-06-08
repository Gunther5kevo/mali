"use client";

import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { opportunities } from "@/lib/data";

const typeColors: Record<string, string> = {
  mmf:      "var(--mali-emerald-mid)",
  stocks:   "var(--mali-gold)",
  sacco:    "var(--mali-emerald-light)",
  farming:  "#7d9c8a",
  crypto:   "var(--mali-slate-400)",
  business: "var(--mali-slate-300)",
};

const riskValue: Record<string, number> = {
  low:    1,
  medium: 2,
  high:   3,
};

const riskLabel: Record<number, string> = {
  1: "Low",
  2: "Medium",
  3: "High",
};

function CustomTooltip({ active, payload }: any) {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div style={{ background: "var(--mali-emerald)", borderRadius: 10, padding: "10px 14px", fontSize: 12, color: "#fff", boxShadow: "0 4px 20px rgba(0,0,0,0.2)" }}>
      <div style={{ fontWeight: 500, marginBottom: 4 }}>{d.name}</div>
      <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 11 }}>{d.institution}</div>
      <div style={{ marginTop: 6, display: "flex", flexDirection: "column", gap: 2 }}>
        <div style={{ color: "rgba(255,255,255,0.7)" }}>Return: <span style={{ color: "#7ee8a2", fontWeight: 500 }}>{d.expectedReturn}</span></div>
        <div style={{ color: "rgba(255,255,255,0.7)" }}>Risk: <span style={{ fontWeight: 500 }}>{riskLabel[d.risk]}</span></div>
      </div>
    </div>
  );
}

export default function ReturnRiskChart() {
  const data = opportunities.map((opp) => ({
    id:             opp.id,
    name:           opp.name,
    institution:    opp.institution,
    risk:           riskValue[opp.riskLevel],
    returnMax:      opp.expectedReturnMax,
    expectedReturn: opp.expectedReturn,
    type:           opp.type,
  }));

  return (
    <div className="mali-card" style={{ marginBottom: 16 }}>
      <div style={{ padding: "18px 20px 14px", borderBottom: "1px solid var(--mali-slate-50)" }}>
        <div style={{ fontSize: 14, fontWeight: 500, color: "var(--mali-slate-900)" }}>
          Return vs Risk
        </div>
        <div style={{ fontSize: 11, color: "var(--mali-slate-400)", marginTop: 2 }}>
          Higher up and to the left is generally better
        </div>
      </div>

      <div style={{ padding: "16px 8px 8px" }}>
        <ResponsiveContainer width="100%" height={240}>
          <ScatterChart margin={{ top: 8, right: 24, left: 0, bottom: 8 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--mali-slate-100)" />
            <XAxis
              type="number"
              dataKey="risk"
              domain={[0.5, 3.5]}
              ticks={[1, 2, 3]}
              tickFormatter={(v) => riskLabel[v] ?? ""}
              tick={{ fontSize: 11, fill: "var(--mali-slate-400)", fontFamily: "var(--font-body)" }}
              axisLine={false}
              tickLine={false}
              label={{ value: "Risk Level", position: "insideBottom", offset: -2, fontSize: 11, fill: "var(--mali-slate-400)" }}
            />
            <YAxis
              type="number"
              dataKey="returnMax"
              tick={{ fontSize: 11, fill: "var(--mali-slate-400)", fontFamily: "var(--font-body)" }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `${v}%`}
              width={44}
              label={{ value: "Max Return %", angle: -90, position: "insideLeft", fontSize: 11, fill: "var(--mali-slate-400)" }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Scatter data={data} shape="circle">
              {data.map((entry) => (
                <Cell
                  key={entry.id}
                  fill={typeColors[entry.type] ?? "var(--mali-slate-300)"}
                  fillOpacity={0.85}
                  r={10}
                />
              ))}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>

        {/* Legend */}
        <div style={{ display: "flex", gap: 16, justifyContent: "center", marginTop: 8, flexWrap: "wrap" }}>
          {Object.entries(typeColors).map(([type, color]) => (
            <div key={type} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, color: "var(--mali-slate-500)" }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: color }} />
              <span style={{ textTransform: "capitalize" }}>{type === "mmf" ? "MMF" : type}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}