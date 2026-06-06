import Topbar from "@/components/layout/Topbar";
import CryptoPanel from "@/components/investments/CryptoPanel";
import { cryptoHoldings } from "@/lib/data";
import { formatKES } from "@/lib/utils";

export default function CryptoPage() {
  const totalValue   = cryptoHoldings.reduce((s, c) => s + c.currentValue, 0);
  const totalCost    = cryptoHoldings.reduce((s, c) => s + c.amount * c.avgBuyPrice, 0);
  const totalGain    = cryptoHoldings.reduce((s, c) => s + c.gainLoss, 0);
  const gainPct      = ((totalGain / totalCost) * 100).toFixed(1);

  return (
    <>
      <Topbar title="Crypto Portfolio" subtitle="Digital assets · Binance" />
      <div style={{ flex: 1, overflowY: "auto", padding: "24px 28px" }}>

        {/* Summary banner */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 12,
            marginBottom: 20,
          }}
        >
          {[
            { label: "Portfolio Value",  value: formatKES(totalValue, true),    sub: "Current market value" },
            { label: "Amount Invested",  value: formatKES(totalCost, true),     sub: "Total cost basis" },
            { label: "Total Gain",       value: `+${formatKES(totalGain, true)}`, sub: "Unrealised P&L", positive: true },
            { label: "Return",           value: `+${gainPct}%`,                 sub: "All time", positive: true },
          ].map((s) => (
            <div
              key={s.label}
              style={{
                background: "#fff",
                border: "1px solid var(--mali-slate-100)",
                borderRadius: 12,
                padding: "18px 20px",
              }}
            >
              <div style={{ fontSize: 11, fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.8px", color: "var(--mali-slate-400)", marginBottom: 10 }}>
                {s.label}
              </div>
              <div style={{ fontSize: 22, fontWeight: 500, letterSpacing: "-0.5px", color: s.positive ? "var(--mali-positive)" : "var(--mali-slate-900)" }}>
                {s.value}
              </div>
              <div style={{ fontSize: 11, color: "var(--mali-slate-400)", marginTop: 6 }}>{s.sub}</div>
            </div>
          ))}
        </div>

        {/* Risk notice */}
        <div
          style={{
            background: "var(--mali-gold-muted)",
            border: "1px solid var(--mali-gold-light)",
            borderRadius: 10,
            padding: "12px 16px",
            fontSize: 13,
            color: "var(--mali-warning)",
            marginBottom: 16,
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <span style={{ fontSize: 15 }}>⚠</span>
          Crypto is at <strong>7%</strong> of your total portfolio — approaching your 8% target ceiling. Review allocation before adding more.
        </div>

        <CryptoPanel />
      </div>
    </>
  );
}