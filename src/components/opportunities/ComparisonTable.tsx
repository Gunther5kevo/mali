"use client";

import { opportunities } from "@/lib/data";
import { formatKES } from "@/lib/utils";
import { X } from "lucide-react";
import type { RiskLevel, LiquidityLevel } from "@/types";

const riskColors: Record<RiskLevel, string> = {
  low:    "var(--mali-positive)",
  medium: "var(--mali-gold)",
  high:   "var(--mali-negative)",
};

const liquidityColors: Record<LiquidityLevel, string> = {
  daily:   "var(--mali-positive)",
  weekly:  "var(--mali-emerald-light)",
  monthly: "var(--mali-gold)",
  locked:  "var(--mali-slate-400)",
};

const rows = [
  { label: "Institution"      },
  { label: "Type"             },
  { label: "Min Capital"      },
  { label: "Expected Return"  },
  { label: "Time Horizon"     },
  { label: "Risk Level"       },
  { label: "Liquidity"        },
  { label: "Tags"             },
];

interface ComparisonTableProps {
  comparingIds: string[];
  onRemove: (id: string) => void;
}

export default function ComparisonTable({ comparingIds, onRemove }: ComparisonTableProps) {
  if (comparingIds.length < 2) return null;

  const selected = comparingIds
    .map((id) => opportunities.find((o) => o.id === id))
    .filter(Boolean) as typeof opportunities;

  return (
    <div className="mali-card" style={{ marginBottom: 20 }}>
      <div style={{ padding: "18px 20px 14px", borderBottom: "1px solid var(--mali-slate-50)" }}>
        <div style={{ fontSize: 14, fontWeight: 500, color: "var(--mali-slate-900)" }}>
          Comparing {selected.length} Opportunities
        </div>
        <div style={{ fontSize: 11, color: "var(--mali-slate-400)", marginTop: 2 }}>
          Side-by-side breakdown
        </div>
      </div>

      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid var(--mali-slate-100)" }}>
              {/* Row label column */}
              <th style={{ width: 160, padding: "14px 20px", background: "var(--mali-slate-50)" }} />
              {selected.map((opp) => (
                <th
                  key={opp.id}
                  style={{
                    padding: "14px 20px",
                    textAlign: "left",
                    background: "var(--mali-slate-50)",
                    borderLeft: "1px solid var(--mali-slate-100)",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8 }}>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 500, color: "var(--mali-slate-900)" }}>
                        {opp.name}
                      </div>
                      <div style={{ fontSize: 11, color: "var(--mali-slate-400)", marginTop: 2 }}>
                        {opp.institution}
                      </div>
                    </div>
                    <button
                      onClick={() => onRemove(opp.id)}
                      style={{ border: "none", background: "none", cursor: "pointer", color: "var(--mali-slate-300)", padding: 0, flexShrink: 0 }}
                    >
                      <X size={14} />
                    </button>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, ri) => (
              <tr
                key={row.label}
                style={{ borderBottom: ri < rows.length - 1 ? "1px solid var(--mali-slate-50)" : "none" }}
              >
                {/* Row label */}
                <td
                  style={{
                    padding: "13px 20px",
                    fontSize: 12,
                    fontWeight: 500,
                    color: "var(--mali-slate-400)",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                    background: "var(--mali-slate-50)",
                    whiteSpace: "nowrap",
                  }}
                >
                  {row.label}
                </td>

                {/* Values per opportunity */}
                {selected.map((opp) => {
                  let content: React.ReactNode = null;

                  if (row.label === "Institution") {
                    content = <span style={{ fontSize: 13, color: "var(--mali-slate-900)" }}>{opp.institution}</span>;
                  } else if (row.label === "Type") {
                    content = <span style={{ fontSize: 13, color: "var(--mali-slate-900)", textTransform: "capitalize" }}>{opp.type}</span>;
                  } else if (row.label === "Min Capital") {
                    content = <span style={{ fontSize: 13, fontWeight: 500, color: "var(--mali-slate-900)" }}>{formatKES(opp.minCapital, true)}</span>;
                  } else if (row.label === "Expected Return") {
                    content = <span style={{ fontSize: 13, fontWeight: 600, color: "var(--mali-positive)" }}>{opp.expectedReturn}</span>;
                  } else if (row.label === "Time Horizon") {
                    content = <span style={{ fontSize: 13, color: "var(--mali-slate-900)" }}>{opp.timeHorizon}</span>;
                  } else if (row.label === "Risk Level") {
                    content = (
                      <span
                        style={{
                          fontSize: 12,
                          fontWeight: 500,
                          color: riskColors[opp.riskLevel],
                          textTransform: "capitalize",
                        }}
                      >
                        {opp.riskLevel}
                      </span>
                    );
                  } else if (row.label === "Liquidity") {
                    content = (
                      <span
                        style={{
                          fontSize: 12,
                          fontWeight: 500,
                          color: liquidityColors[opp.liquidity],
                          textTransform: "capitalize",
                        }}
                      >
                        {opp.liquidity}
                      </span>
                    );
                  } else if (row.label === "Tags") {
                    content = (
                      <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                        {opp.tags.map((tag) => (
                          <span
                            key={tag}
                            style={{
                              fontSize: 10,
                              fontWeight: 500,
                              padding: "2px 7px",
                              borderRadius: 6,
                              background: "var(--mali-slate-100)",
                              color: "var(--mali-slate-500)",
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    );
                  }

                  return (
                    <td
                      key={opp.id}
                      style={{
                        padding: "13px 20px",
                        borderLeft: "1px solid var(--mali-slate-50)",
                        verticalAlign: "middle",
                      }}
                    >
                      {content}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}