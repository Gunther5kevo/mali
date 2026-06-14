"use client";

import { useState } from "react";
import Topbar from "@/components/layout/Topbar";
import ScenarioSelector from "@/components/forecasting/ScenarioSelector";
import ForecastBanner from "@/components/forecasting/ForecastBanner";
import WealthProjectionChart from "@/components/forecasting/WealthProjectionChart";
import IncomeExpensesChart from "@/components/forecasting/IncomeExpensesChart";
import ForecastMilestones from "@/components/forecasting/ForecastMilestones";
import ProjectionTable from "@/components/forecasting/ProjectionTable";
import type { ScenarioKey } from "@/lib/forecasting";

export default function ForecastingPage() {
  const [scenario, setScenario] = useState<ScenarioKey>("moderate");

  return (
    <>
      <Topbar title="Wealth Forecasting" subtitle="Model your financial future across different scenarios" />

      <div className="mali-page-content" style={{ flex: 1, overflowY: "auto", padding: "24px 28px" }}>

        <div style={{ marginBottom: 4 }}>
          <div style={{ fontSize: 11, fontWeight: 500, textTransform: "uppercase", letterSpacing: "1.2px", color: "var(--mali-slate-400)", marginBottom: 10 }}>
            Choose a scenario
          </div>
          <ScenarioSelector active={scenario} onChange={setScenario} />
        </div>

        <ForecastBanner scenario={scenario} />

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
          <WealthProjectionChart activeScenario={scenario} />
          <IncomeExpensesChart scenario={scenario} />
        </div>

        <ForecastMilestones scenario={scenario} />
        <ProjectionTable scenario={scenario} />

      </div>
    </>
  );
}