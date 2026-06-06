"use client";

import { TrendingUp, TrendingDown } from "lucide-react";
import { cryptoHoldings } from "@/lib/data";
import { formatKES, formatPercent } from "@/lib/utils";

const coinColors: Record<string, string> = {
  BTC: "#f7931a",
  ETH: "#627eea",
  USDT: "#26a17b",
  SOL: "#9945ff",
};

export default function CryptoPanel() {
  const totalValue = cryptoHoldings.reduce((s, c) => s + c.currentValue, 0);
  const totalGain = cryptoHoldings.reduce((s, c) => s + c.gainLoss, 0);

  return (
    <div className="mali-card" style={{ marginBottom: 16 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 20px 14px", borderBottom: "1px solid var(--mali-slate-50)" }}>
        <div>
          <div style={{ fontSize: 14, fontWeight: 500, color: "var(--mali-slate-900)" }}>Crypto Portfolio</div>
          <div style={{ fontSize: 11, color: "var(--mali-slate-400)", marginTop: 2 }}>Binance · {cryptoHoldings.length} assets</div>
        </div>
        <div style={{ display: "flex", gap: 20 }}>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 10, color: "var(--mali-slate-400)", textTransform: "uppercase", letterSpacing: "0.8px", marginBottom: 2 }}>Total Value</div>
            <div style={{ fontSize: 14, fontWeight: 500, color: "var(--mali-slate-900)" }}>{formatKES(totalValue, true)}</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 10, color: "var(--mali-slate-400)", textTransform: "uppercase", letterSpacing: "0.8px", marginBottom: 2 }}>Total Gain</div>
            <div style={{ fontSize: 14, fontWeight: 500, color: "var(--mali-positive)" }}>+{formatKES(totalGain, true)}</div>
          </div>
        </div>
      </div>

      {/* Allocation bar */}
      <div style={{ padding: "14px 20px 0" }}>
        <div style={{ display: "flex", height: 5, borderRadius: 3, overflow: "hidden", gap: 1 }}>
          {cryptoHoldings.map((c) => (
            <div key={c.id} style={{ flex: c.currentValue / totalValue, background: coinColors[c.symbol] ?? "var(--mali-slate-200)", minWidth: 2 }} />
          ))}
        </div>
        <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
          {cryptoHoldings.map((c) => (
            <div key={c.id} style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11, color: "var(--mali-slate-400)" }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: coinColors[c.symbol] ?? "var(--mali-slate-200)" }} />
              {c.symbol} {c.allocationPercent.toFixed(0)}%
            </div>
          ))}
        </div>
      </div>

      {/* Holdings list */}
      <div style={{ padding: "12px 0" }}>
        {cryptoHoldings.map((c, i) => {
          const isUp = c.gainLoss >= 0;
          return (
            <div
              key={c.id}
              style={{
                display: "flex",
                alignItems: "center",
                padding: "12px 20px",
                borderBottom: i < cryptoHoldings.length - 1 ? "1px solid var(--mali-slate-50)" : "none",
              }}
            >
              {/* Coin icon */}
              <div style={{ width: 38, height: 38, borderRadius: "50%", background: (coinColors[c.symbol] ?? "#ccc") + "22", display: "flex", alignItems: "center", justifyContent: "center", marginRight: 12, flexShrink: 0, border: `1px solid ${coinColors[c.symbol] ?? "#ccc"}33` }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: coinColors[c.symbol] ?? "var(--mali-slate-400)", fontFamily: "monospace" }}>{c.symbol.slice(0, 2)}</span>
              </div>

              {/* Name + amount */}
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 500, color: "var(--mali-slate-900)" }}>{c.name}</div>
                <div style={{ fontSize: 11, color: "var(--mali-slate-400)", marginTop: 2 }}>
                  {c.amount} {c.symbol} · avg KES {c.avgBuyPrice.toLocaleString()}
                </div>
              </div>

              {/* Current price */}
              <div style={{ textAlign: "right", marginRight: 24 }}>
                <div style={{ fontSize: 12, color: "var(--mali-slate-400)", marginBottom: 2 }}>Current price</div>
                <div style={{ fontSize: 13, fontWeight: 500, color: "var(--mali-slate-900)" }}>
                  KES {c.currentPrice.toLocaleString()}
                </div>
              </div>

              {/* Value */}
              <div style={{ textAlign: "right", marginRight: 24 }}>
                <div style={{ fontSize: 12, color: "var(--mali-slate-400)", marginBottom: 2 }}>Value</div>
                <div style={{ fontSize: 13, fontWeight: 500, color: "var(--mali-slate-900)" }}>{formatKES(c.currentValue)}</div>
              </div>

              {/* Gain badge */}
              <div style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 12, fontWeight: 500, color: isUp ? "var(--mali-positive)" : "var(--mali-negative)", background: isUp ? "var(--mali-positive-bg)" : "var(--mali-negative-bg)", padding: "4px 10px", borderRadius: 20, minWidth: 80, justifyContent: "center" }}>
                {isUp ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
                {formatPercent(c.gainLossPercent, true)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
