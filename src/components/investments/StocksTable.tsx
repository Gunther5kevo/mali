"use client";

import { TrendingUp, TrendingDown } from "lucide-react";
import { stockHoldings } from "@/lib/data";
import { formatKES, formatPercent } from "@/lib/utils";

export default function StocksTable() {
  const totalValue = stockHoldings.reduce((s, h) => s + h.currentValue, 0);
  const totalGain = stockHoldings.reduce((s, h) => s + h.gainLoss, 0);
  const totalDivs = stockHoldings.reduce((s, h) => s + h.dividends, 0);

  return (
    <div className="mali-card" style={{ marginBottom: 16 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 20px 14px", borderBottom: "1px solid var(--mali-slate-50)" }}>
        <div>
          <div style={{ fontSize: 14, fontWeight: 500, color: "var(--mali-slate-900)" }}>NSE Stock Holdings</div>
          <div style={{ fontSize: 11, color: "var(--mali-slate-400)", marginTop: 2 }}>Nairobi Securities Exchange · {stockHoldings.length} positions</div>
        </div>
        <div style={{ display: "flex", gap: 20 }}>
          {[
            { label: "Total Value", value: formatKES(totalValue, true) },
            { label: "Total Gain", value: `+${formatKES(totalGain, true)}`, positive: true },
            { label: "Dividends YTD", value: formatKES(totalDivs, true) },
          ].map((s) => (
            <div key={s.label} style={{ textAlign: "right" }}>
              <div style={{ fontSize: 10, color: "var(--mali-slate-400)", textTransform: "uppercase", letterSpacing: "0.8px", marginBottom: 2 }}>{s.label}</div>
              <div style={{ fontSize: 14, fontWeight: 500, color: s.positive ? "var(--mali-positive)" : "var(--mali-slate-900)" }}>{s.value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Table */}
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid var(--mali-slate-100)" }}>
              {["Ticker", "Company", "Shares", "Avg Price", "Current", "Value", "Gain / Loss", "Dividends"].map((col) => (
                <th
                  key={col}
                  style={{
                    padding: "10px 20px",
                    fontSize: 11,
                    fontWeight: 500,
                    color: "var(--mali-slate-400)",
                    textAlign: col === "Ticker" || col === "Company" ? "left" : "right",
                    letterSpacing: "0.5px",
                    textTransform: "uppercase",
                    background: "var(--mali-slate-50)",
                    whiteSpace: "nowrap",
                  }}
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {stockHoldings.map((h, i) => {
              const isUp = h.gainLoss >= 0;
              return (
                <tr
                  key={h.id}
                  style={{
                    borderBottom: i < stockHoldings.length - 1 ? "1px solid var(--mali-slate-50)" : "none",
                    transition: "background 0.1s",
                  }}
                >
                  {/* Ticker */}
                  <td style={{ padding: "14px 20px" }}>
                    <div style={{ fontFamily: "monospace", fontSize: 13, fontWeight: 600, color: "var(--mali-emerald-mid)", letterSpacing: "0.5px" }}>
                      {h.ticker}
                    </div>
                  </td>

                  {/* Company */}
                  <td style={{ padding: "14px 20px" }}>
                    <div style={{ fontSize: 13, color: "var(--mali-slate-900)", fontWeight: 500 }}>{h.company}</div>
                  </td>

                  {/* Shares */}
                  <td style={{ padding: "14px 20px", textAlign: "right" }}>
                    <div style={{ fontSize: 13, color: "var(--mali-slate-600)" }}>{h.shares.toLocaleString()}</div>
                  </td>

                  {/* Avg Price */}
                  <td style={{ padding: "14px 20px", textAlign: "right" }}>
                    <div style={{ fontSize: 13, color: "var(--mali-slate-600)" }}>KES {h.avgPrice.toFixed(2)}</div>
                  </td>

                  {/* Current Price */}
                  <td style={{ padding: "14px 20px", textAlign: "right" }}>
                    <div style={{ fontSize: 13, fontWeight: 500, color: "var(--mali-slate-900)" }}>KES {h.currentPrice.toFixed(2)}</div>
                    <div style={{ fontSize: 11, color: isUp ? "var(--mali-positive)" : "var(--mali-negative)" }}>
                      {isUp ? "↑" : "↓"} {formatPercent(Math.abs(((h.currentPrice - h.avgPrice) / h.avgPrice) * 100))}
                    </div>
                  </td>

                  {/* Value */}
                  <td style={{ padding: "14px 20px", textAlign: "right" }}>
                    <div style={{ fontSize: 13, fontWeight: 500, color: "var(--mali-slate-900)" }}>{formatKES(h.currentValue)}</div>
                  </td>

                  {/* Gain / Loss */}
                  <td style={{ padding: "14px 20px", textAlign: "right" }}>
                    <div style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 12, fontWeight: 500, color: isUp ? "var(--mali-positive)" : "var(--mali-negative)", background: isUp ? "var(--mali-positive-bg)" : "var(--mali-negative-bg)", padding: "3px 8px", borderRadius: 20 }}>
                      {isUp ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
                      {isUp ? "+" : ""}{formatKES(h.gainLoss, true)} ({formatPercent(h.gainLossPercent, true)})
                    </div>
                  </td>

                  {/* Dividends */}
                  <td style={{ padding: "14px 20px", textAlign: "right" }}>
                    <div style={{ fontSize: 13, color: "var(--mali-slate-600)" }}>{formatKES(h.dividends)}</div>
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
