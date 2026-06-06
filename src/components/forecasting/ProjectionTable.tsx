"use client";

import { projectWealth, type ScenarioKey } from "@/lib/forecasting";
import { formatKES } from "@/lib/utils";

interface ProjectionTableProps {
  scenario: ScenarioKey;
}

export default function ProjectionTable({ scenario }: ProjectionTableProps) {
  const points = projectWealth(scenario, 10);

  const columns = [
    { key: "year",            label: "Year",             align: "left"  as const },
    { key: "netWorth",        label: "Net Worth",        align: "right" as const },
    { key: "investments",     label: "Investments",      align: "right" as const },
    { key: "cash",            label: "Cash",             align: "right" as const },
    { key: "annualIncome",    label: "Annual Income",    align: "right" as const },
    { key: "annualExpenses",  label: "Annual Expenses",  align: "right" as const },
    { key: "annualSavings",   label: "Annual Savings",   align: "right" as const },
  ];

  return (
    <div className="mali-card">
      <div style={{ padding: "18px 20px 14px", borderBottom: "1px solid var(--mali-slate-50)" }}>
        <div style={{ fontSize: 14, fontWeight: 500, color: "var(--mali-slate-900)" }}>Year-by-Year Breakdown</div>
        <div style={{ fontSize: 11, color: "var(--mali-slate-400)", marginTop: 2 }}>
          Full 10-year projection · All values in KES
        </div>
      </div>

      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "var(--mali-slate-50)", borderBottom: "1px solid var(--mali-slate-100)" }}>
              {columns.map((col) => (
                <th
                  key={col.key}
                  style={{
                    padding: "10px 20px",
                    fontSize: 11,
                    fontWeight: 500,
                    color: "var(--mali-slate-400)",
                    textAlign: col.align,
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                    whiteSpace: "nowrap",
                  }}
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {points.map((point, i) => {
              const isNow     = i === 0;
              const growthPct = i > 0
                ? (((point.netWorth - points[0].netWorth) / points[0].netWorth) * 100).toFixed(0)
                : null;

              return (
                <tr
                  key={point.year}
                  style={{
                    borderBottom: i < points.length - 1 ? "1px solid var(--mali-slate-50)" : "none",
                    background: isNow ? "var(--mali-slate-50)" : "#fff",
                  }}
                >
                  {/* Year */}
                  <td style={{ padding: "13px 20px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ fontSize: 13, fontWeight: isNow ? 500 : 400, color: isNow ? "var(--mali-slate-500)" : "var(--mali-slate-900)" }}>
                        {point.year}
                      </span>
                      {growthPct && (
                        <span style={{ fontSize: 10, color: "var(--mali-positive)", background: "var(--mali-positive-bg)", padding: "1px 6px", borderRadius: 10, fontWeight: 500 }}>
                          +{growthPct}%
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Net Worth */}
                  <td style={{ padding: "13px 20px", textAlign: "right" }}>
                    <span style={{ fontSize: 13, fontWeight: 600, color: "var(--mali-slate-900)" }}>
                      {formatKES(point.netWorth, true)}
                    </span>
                  </td>

                  {/* Investments */}
                  <td style={{ padding: "13px 20px", textAlign: "right" }}>
                    <span style={{ fontSize: 13, color: "var(--mali-emerald-mid)", fontWeight: 500 }}>
                      {formatKES(point.investments, true)}
                    </span>
                  </td>

                  {/* Cash */}
                  <td style={{ padding: "13px 20px", textAlign: "right" }}>
                    <span style={{ fontSize: 13, color: "var(--mali-slate-600)" }}>
                      {formatKES(point.cash, true)}
                    </span>
                  </td>

                  {/* Annual Income */}
                  <td style={{ padding: "13px 20px", textAlign: "right" }}>
                    <span style={{ fontSize: 13, color: "var(--mali-slate-600)" }}>
                      {formatKES(point.annualIncome, true)}
                    </span>
                  </td>

                  {/* Annual Expenses */}
                  <td style={{ padding: "13px 20px", textAlign: "right" }}>
                    <span style={{ fontSize: 13, color: "var(--mali-slate-600)" }}>
                      {formatKES(point.annualExpenses, true)}
                    </span>
                  </td>

                  {/* Annual Savings */}
                  <td style={{ padding: "13px 20px", textAlign: "right" }}>
                    <span
                      style={{
                        fontSize: 13,
                        fontWeight: 500,
                        color: point.annualSavings > 0 ? "var(--mali-positive)" : "var(--mali-negative)",
                      }}
                    >
                      {formatKES(point.annualSavings, true)}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}