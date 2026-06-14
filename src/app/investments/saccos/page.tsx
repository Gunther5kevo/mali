import Topbar from "@/components/layout/Topbar";
import SACCOPanel from "@/components/investments/SACCOPanel";
import { formatKES } from "@/lib/utils";

export default function SACCOsPage() {
  const stats = [
    { label: "Share Capital",    value: formatKES(185_000, true), sub: "1,850 shares" },
    { label: "Deposits",         value: formatKES(346_000, true), sub: "Fixed + monthly" },
    { label: "Dividends 2025",   value: formatKES(28_500, true),  sub: "15.4% on shares", positive: true },
    { label: "Available Loan",   value: formatKES(1_530_000, true), sub: "3× your deposits" },
  ];

  return (
    <>
      <Topbar title="SACCO Portfolio" subtitle="Stima SACCO · SASRA regulated" />
      <div className="mali-page-content" style={{ flex: 1, overflowY: "auto", padding: "24px 28px" }}>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 12,
            marginBottom: 20,
          }}
        >
          {stats.map((s) => (
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

        <SACCOPanel />
      </div>
    </>
  );
}