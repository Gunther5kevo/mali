import Topbar from "@/components/layout/Topbar";
import NetWorthBanner from "@/components/dashboard/NetWorthBanner";
import MetricCards from "@/components/dashboard/MetricCards";
import NetWorthChart from "@/components/dashboard/NetWorthChart";
import AssetAllocation from "@/components/dashboard/AssetAllocation";
import FinancialInsights from "@/components/dashboard/FinancialInsights";
import RecentTransactions from "@/components/dashboard/RecentTransactions";
import GoalsProgress from "@/components/dashboard/GoalsProgress";
import { dashboardSummary } from "@/lib/data";

export default function DashboardPage() {
  return (
    <>
      <Topbar title="Good morning, David" />
      <div className="mali-page-content" style={{ flex: 1, overflowY: "auto", padding: "24px 28px" }}>

        <NetWorthBanner summary={dashboardSummary} />
        <MetricCards summary={dashboardSummary} />

        <div className="mali-chart-row" style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 16, marginBottom: 16 }}>
          <NetWorthChart />
          <AssetAllocation />
        </div>

        <div className="mali-three-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginBottom: 24 }}>
          <FinancialInsights />
          <RecentTransactions />
          <GoalsProgress />
        </div>

      </div>
    </>
  );
}