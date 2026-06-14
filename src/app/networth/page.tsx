"use client";

import { dashboardSummary, netWorthHistory } from "@/lib/data";
import { formatKES, formatPercent } from "@/lib/utils";
import NetWorthBanner from "@/components/dashboard/NetWorthBanner";
import MetricCards from "@/components/dashboard/MetricCards";
import NetWorthChart from "@/components/dashboard/NetWorthChart";
import { TrendingUp, TrendingDown, Wallet, Building2, CreditCard } from "lucide-react";

const periods = [
  { label: "6M", months: 6 },
  { label: "1Y", months: 12 },
  { label: "All", months: netWorthHistory.length },
];

export default function NetWorthPage() {
  const latest = netWorthHistory[netWorthHistory.length - 1];
  const first = netWorthHistory[0];

  const assetsGrowth = latest.assets - first.assets;
  const liabilitiesGrowth = latest.liabilities - first.liabilities;
  const investmentsGrowth = latest.investments - first.investments;
  const cashGrowth = latest.cash - first.cash;

  return (
    <div style={{ padding: "24px 28px", maxWidth: 1200 }} className="mali-page">
      {/* Reuse the existing banner */}
      <NetWorthBanner summary={dashboardSummary} />

      {/* Net worth trend chart */}
      <div
        style={{
          background: "#fff",
          borderRadius: 16,
          border: "1px solid var(--mali-slate-100)",
          padding: "24px 28px",
          marginBottom: 20,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
          <div>
            <div style={{ fontSize: 15, fontWeight: 500, color: "var(--mali-emerald)" }}>Net worth over time</div>
            <div style={{ fontSize: 12, color: "var(--mali-slate-500)", marginTop: 2 }}>
              Last 12 months · {formatPercent(dashboardSummary.netWorthChangePercent, true)} growth
            </div>
          </div>
          <div style={{ display: "flex", gap: 6 }}>
            {periods.map((p, i) => (
              <button
                key={p.label}
                style={{
                  fontSize: 12,
                  fontWeight: 500,
                  padding: "6px 14px",
                  borderRadius: 8,
                  border: "1px solid var(--mali-slate-100)",
                  background: i === 1 ? "var(--mali-emerald)" : "transparent",
                  color: i === 1 ? "#fff" : "var(--mali-slate-500)",
                  cursor: "pointer",
                }}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        <NetWorthChart />

        {/* Legend */}
        <div style={{ display: "flex", gap: 20, marginTop: 16, flexWrap: "wrap" }}>
          {[
            { label: "Net worth", color: "var(--mali-emerald-mid)" },
            { label: "Assets", color: "#378ADD" },
            { label: "Liabilities", color: "#D85A30" },
          ].map((item) => (
            <div key={item.label} style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div style={{ width: 10, height: 10, borderRadius: 2, background: item.color }} />
              <span style={{ fontSize: 12, color: "var(--mali-slate-500)" }}>{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Composition breakdown */}
      <div
        className="mali-nw-grid"
        style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 20 }}
      >
        {[
          {
            label: "Total Assets",
            value: latest.assets,
            change: assetsGrowth,
            icon: Building2,
            color: "#378ADD",
            bg: "#eff4ff",
          },
          {
            label: "Total Liabilities",
            value: latest.liabilities,
            change: liabilitiesGrowth,
            icon: CreditCard,
            color: "#D85A30",
            bg: "#fef2ec",
          },
          {
            label: "Investments",
            value: latest.investments,
            change: investmentsGrowth,
            icon: TrendingUp,
            color: "var(--mali-emerald-mid)",
            bg: "var(--mali-emerald-subtle)",
          },
          {
            label: "Cash & Liquid",
            value: latest.cash,
            change: cashGrowth,
            icon: Wallet,
            color: "var(--mali-gold)",
            bg: "var(--mali-gold-muted)",
          },
        ].map((card) => {
          const Icon = card.icon;
          const positive = card.change >= 0;
          return (
            <div
              key={card.label}
              style={{
                background: "#fff",
                borderRadius: 14,
                border: "1px solid var(--mali-slate-100)",
                padding: "18px 18px",
              }}
            >
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 8,
                  background: card.bg,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 12,
                }}
              >
                <Icon size={15} color={card.color} />
              </div>
              <div style={{ fontSize: 11, color: "var(--mali-slate-500)", marginBottom: 4 }}>{card.label}</div>
              <div style={{ fontSize: 20, fontWeight: 500, color: "var(--mali-emerald)" }}>
                {formatKES(card.value)}
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                  marginTop: 6,
                  fontSize: 11,
                  color: positive ? "#1d9e75" : "#d85a30",
                }}
              >
                {positive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                {formatKES(Math.abs(card.change), true)} over 12 months
              </div>
            </div>
          );
        })}
      </div>

      {/* Monthly snapshot table */}
      <div
        style={{
          background: "#fff",
          borderRadius: 16,
          border: "1px solid var(--mali-slate-100)",
          padding: "20px 24px",
        }}
      >
        <div style={{ fontSize: 15, fontWeight: 500, color: "var(--mali-emerald)", marginBottom: 14 }}>
          Monthly snapshots
        </div>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, minWidth: 600 }}>
            <thead>
              <tr style={{ borderBottom: "1px solid var(--mali-slate-100)" }}>
                {["Month", "Net Worth", "Assets", "Liabilities", "Investments", "Cash"].map((h, i) => (
                  <th
                    key={h}
                    style={{
                      textAlign: i === 0 ? "left" : "right",
                      padding: "8px 10px",
                      fontWeight: 500,
                      color: "var(--mali-slate-500)",
                      fontSize: 11,
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[...netWorthHistory].reverse().map((snap, idx) => (
                <tr
                  key={snap.date}
                  style={{
                    borderBottom: idx < netWorthHistory.length - 1 ? "1px solid var(--mali-slate-100)" : "none",
                  }}
                >
                  <td style={{ padding: "10px 10px", fontWeight: 500, color: "var(--mali-emerald)" }}>
                    {new Date(snap.date).toLocaleDateString("en-KE", { month: "short", year: "numeric" })}
                  </td>
                  <td style={{ padding: "10px 10px", textAlign: "right", fontWeight: 500 }}>
                    {formatKES(snap.netWorth, true)}
                  </td>
                  <td style={{ padding: "10px 10px", textAlign: "right", color: "var(--mali-slate-500)" }}>
                    {formatKES(snap.assets, true)}
                  </td>
                  <td style={{ padding: "10px 10px", textAlign: "right", color: "var(--mali-slate-500)" }}>
                    {formatKES(snap.liabilities, true)}
                  </td>
                  <td style={{ padding: "10px 10px", textAlign: "right", color: "var(--mali-slate-500)" }}>
                    {formatKES(snap.investments, true)}
                  </td>
                  <td style={{ padding: "10px 10px", textAlign: "right", color: "var(--mali-slate-500)" }}>
                    {formatKES(snap.cash, true)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .mali-page {
            padding: 16px !important;
          }
          .mali-nw-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 480px) {
          .mali-nw-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}