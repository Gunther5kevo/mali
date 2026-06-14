import Topbar from "@/components/layout/Topbar";
import StocksTable from "@/components/investments/StocksTable";
import { stockHoldings } from "@/lib/data";
import { formatKES } from "@/lib/utils";

export default function StocksPage() {
  const totalValue = stockHoldings.reduce((s, h) => s + h.currentValue, 0);
  const totalCost  = stockHoldings.reduce((s, h) => s + h.shares * h.avgPrice, 0);
  const totalGain  = stockHoldings.reduce((s, h) => s + h.gainLoss, 0);
  const totalDivs  = stockHoldings.reduce((s, h) => s + h.dividends, 0);

  return (
    <>
      <Topbar title="NSE Stock Holdings" subtitle="Nairobi Securities Exchange" />
      <div className="mali-page-content" style={{ flex: 1, overflowY: "auto", padding: "24px 28px" }}>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 12,
            marginBottom: 20,
          }}
        >
          {[
            { label: "Portfolio Value",  value: formatKES(totalValue, true) },
            { label: "Cost Basis",       value: formatKES(totalCost, true) },
            { label: "Total Gain",       value: `+${formatKES(totalGain, true)}`, positive: true },
            { label: "Dividends YTD",    value: formatKES(totalDivs, true) },
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
            </div>
          ))}
        </div>

        <StocksTable />
      </div>
    </>
  );
}