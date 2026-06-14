import Topbar from "@/components/layout/Topbar";
import SpendingBreakdown from "@/components/money/SpendingBreakdown";
import SpendingTrends from "@/components/money/SpendingTrends";
import { spendingByCategory } from "@/lib/data";
import { formatKES } from "@/lib/utils";

export default function SpendingPage() {
  const totalSpend = spendingByCategory.reduce((s, c) => s + c.amount, 0);
  const topCategory = spendingByCategory.reduce((a, b) => a.amount > b.amount ? a : b);

  return (
    <>
      <Topbar title="Spending" subtitle="Where your money goes · June 2026" />
      <div className="mali-page-content" style={{ flex: 1, overflowY: "auto", padding: "24px 28px" }}>

        {/* Summary strip */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 20 }}>
          {[
            { label: "Total Spent",      value: formatKES(totalSpend, true),           sub: "June 2026" },
            { label: "Categories",       value: String(spendingByCategory.length),     sub: "Active spending areas" },
            { label: "Largest Category", value: topCategory.category,                  sub: formatKES(topCategory.amount, true) },
            { label: "vs Last Month",    value: "+14.1%",                              sub: "KES 16,400 more", negative: true },
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
              <div style={{ fontSize: 22, fontWeight: 500, letterSpacing: "-0.5px", color: s.negative ? "var(--mali-negative)" : "var(--mali-slate-900)" }}>
                {s.value}
              </div>
              <div style={{ fontSize: 11, color: "var(--mali-slate-400)", marginTop: 6 }}>{s.sub}</div>
            </div>
          ))}
        </div>

        <SpendingTrends />
        <SpendingBreakdown />

        {/* Category table */}
        <div style={{ background: "#fff", border: "1px solid var(--mali-slate-100)", borderRadius: 14, overflow: "hidden" }}>
          <div style={{ padding: "18px 20px 14px", borderBottom: "1px solid var(--mali-slate-50)" }}>
            <div style={{ fontSize: 14, fontWeight: 500, color: "var(--mali-slate-900)" }}>Category Breakdown</div>
            <div style={{ fontSize: 11, color: "var(--mali-slate-400)", marginTop: 2 }}>All categories · June 2026</div>
          </div>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "var(--mali-slate-50)", borderBottom: "1px solid var(--mali-slate-100)" }}>
                {["Category", "Amount", "% of Spend", "vs Last Month"].map((col) => (
                  <th
                    key={col}
                    style={{
                      padding: "10px 20px",
                      fontSize: 11,
                      fontWeight: 500,
                      color: "var(--mali-slate-400)",
                      textAlign: col === "Category" ? "left" : "right",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                    }}
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {spendingByCategory.map((cat, i) => (
                <tr
                  key={cat.category}
                  style={{ borderBottom: i < spendingByCategory.length - 1 ? "1px solid var(--mali-slate-50)" : "none" }}
                >
                  <td style={{ padding: "14px 20px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{ width: 8, height: 8, borderRadius: "50%", background: cat.color, flexShrink: 0 }} />
                      <span style={{ fontSize: 13, fontWeight: 500, color: "var(--mali-slate-900)" }}>{cat.category}</span>
                    </div>
                  </td>
                  <td style={{ padding: "14px 20px", textAlign: "right" }}>
                    <span style={{ fontSize: 13, fontWeight: 500, color: "var(--mali-slate-900)" }}>{formatKES(cat.amount)}</span>
                  </td>
                  <td style={{ padding: "14px 20px", textAlign: "right" }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 8 }}>
                      <div style={{ width: 60, height: 4, background: "var(--mali-slate-100)", borderRadius: 2, overflow: "hidden" }}>
                        <div style={{ width: `${cat.percent}%`, height: "100%", background: cat.color, borderRadius: 2 }} />
                      </div>
                      <span style={{ fontSize: 12, color: "var(--mali-slate-600)", minWidth: 32 }}>{cat.percent}%</span>
                    </div>
                  </td>
                  <td style={{ padding: "14px 20px", textAlign: "right" }}>
                    <span style={{ fontSize: 12, color: "var(--mali-slate-400)" }}>—</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </>
  );
}