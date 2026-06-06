"use client";

import {
  AreaChart,
  Area,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { projectWealth, scenarios, type ScenarioKey } from "@/lib/forecasting";
import { formatKES } from "@/lib/utils";

interface WealthProjectionChartProps {
  activeScenario: ScenarioKey;
}

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: "var(--mali-emerald)", borderRadius: 10, padding: "10px 14px", fontSize: 12, color: "#fff", boxShadow: "0 4px 20px rgba(0,0,0,0.2)", minWidth: 180 }}>
      <div style={{ color: "rgba(255,255,255,0.5)", marginBottom: 6, fontSize: 11, fontWeight: 500 }}>{label}</div>
      {payload.map((p: any) => (
        <div key={p.name} style={{ display: "flex", justifyContent: "space-between", gap: 16, marginBottom: 4 }}>
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

const scenarioColors: Record<ScenarioKey, string> = {
  conservative: "var(--mali-slate-400)",
  moderate:     "var(--mali-gold)",
  optimistic:   "var(--mali-emerald-light)",
};

export default function WealthProjectionChart({ activeScenario }: WealthProjectionChartProps) {
  // Build combined chart data for all 3 scenarios side by side
  const allPoints = projectWealth("conservative", 10);

  const chartData = allPoints.map((_, i) => {
    const row: Record<string, any> = { year: allPoints[i].year };
    (Object.keys(scenarios) as ScenarioKey[]).forEach((key) => {
      const pts = projectWealth(key, 10);
      row[scenarios[key].label] = pts[i].netWorth;
    });
    return row;
  });

  return (
    <div className="mali-card" style={{ marginBottom: 16 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 20px 14px", borderBottom: "1px solid var(--mali-slate-50)" }}>
        <div>
          <div style={{ fontSize: 14, fontWeight: 500, color: "var(--mali-slate-900)" }}>Net Worth Projection</div>
          <div style={{ fontSize: 11, color: "var(--mali-slate-400)", marginTop: 2 }}>All three scenarios compared · 10 year horizon</div>
        </div>
        <div style={{ display: "flex", gap: 16 }}>
          {(Object.keys(scenarios) as ScenarioKey[]).map((key) => (
            <div
              key={key}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 5,
                fontSize: 11,
                fontWeight: activeScenario === key ? 600 : 400,
                color: activeScenario === key ? scenarioColors[key] : "var(--mali-slate-400)",
              }}
            >
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: scenarioColors[key] }} />
              {scenarios[key].label}
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding: "16px 8px 8px" }}>
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={chartData} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
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
              tickFormatter={(v) => `${(v / 1_000_000).toFixed(0)}M`}
              width={40}
            />
            <Tooltip content={<CustomTooltip />} />
            {(Object.keys(scenarios) as ScenarioKey[]).map((key) => (
              <Line
                key={key}
                type="monotone"
                dataKey={scenarios[key].label}
                stroke={scenarioColors[key]}
                strokeWidth={activeScenario === key ? 2.5 : 1.5}
                strokeDasharray={activeScenario === key ? "0" : "5 3"}
                dot={false}
                activeDot={{ r: 4 }}
                opacity={activeScenario === key ? 1 : 0.45}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}