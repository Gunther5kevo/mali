import Topbar from "@/components/layout/Topbar";
import TransactionLog from "@/components/money/TransactionLog";
import { transactions } from "@/lib/data";
import { formatKES } from "@/lib/utils";

export default function TransactionsPage() {
  const totalIn  = transactions.filter((t) => t.amount > 0).reduce((s, t) => s + t.amount, 0);
  const totalOut = transactions.filter((t) => t.amount < 0).reduce((s, t) => s + Math.abs(t.amount), 0);
  const net      = totalIn - totalOut;

  return (
    <>
      <Topbar title="Transactions" subtitle="All accounts · June 2026" />
      <div style={{ flex: 1, overflowY: "auto", padding: "24px 28px" }}>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 12,
            marginBottom: 20,
          }}
        >
          {[
            { label: "Total Transactions", value: String(transactions.length),  sub: "This period" },
            { label: "Money In",           value: formatKES(totalIn, true),      sub: "Income & transfers", positive: true },
            { label: "Money Out",          value: formatKES(totalOut, true),     sub: "Expenses & investments" },
            { label: "Net Flow",           value: formatKES(net, true),          sub: net >= 0 ? "Positive cashflow" : "Negative cashflow", positive: net >= 0 },
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

        <TransactionLog />
      </div>
    </>
  );
}