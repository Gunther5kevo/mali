import Topbar from "@/components/layout/Topbar";
import FarmingPanel from "@/components/investments/FarmingPanel";
import { formatKES } from "@/lib/utils";
import { farmingProjects } from "@/lib/data";

export default function FarmingPage() {
  const totalInvested = farmingProjects.reduce((s, f) => s + f.capitalInvested, 0);
  const totalValue    = farmingProjects.reduce((s, f) => s + f.currentValue, 0);
  const totalGain     = totalValue - totalInvested;
  const overallROI    = ((totalGain / totalInvested) * 100).toFixed(1);

  return (
    <>
      <Topbar title="Farming Projects" subtitle="Agricultural investments & ROI tracking" />
      <div className="mali-page-content" style={{ flex: 1, overflowY: "auto", padding: "24px 28px" }}>

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
            { label: "Total Invested",    value: formatKES(totalInvested, true), sub: "Capital deployed" },
            { label: "Current Value",     value: formatKES(totalValue, true),    sub: "As of today" },
            { label: "Total Gain",        value: `+${formatKES(totalGain, true)}`, sub: "Unrealised + realised", positive: true },
            { label: "Overall ROI",       value: `${overallROI}%`,               sub: "Across all projects", positive: true },
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

        <FarmingPanel />
      </div>
    </>
  );
}