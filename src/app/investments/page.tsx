import Topbar from "@/components/layout/Topbar";
import PortfolioSummaryBanner from "@/components/investments/PortfolioSummaryBanner";
import InvestmentPerformanceChart from "@/components/investments/InvestmentPerformanceChart";
import InvestmentCards from "@/components/investments/InvestmentCards";
import StocksTable from "@/components/investments/StocksTable";
import CryptoPanel from "@/components/investments/CryptoPanel";
import FarmingPanel from "@/components/investments/FarmingPanel";
import MMFPanel from "@/components/investments/MMFPanel";
import SACCOPanel from "@/components/investments/SACCOPanel";

export default function InvestmentsPage() {
  return (
    <>
      <Topbar title="Investment Portfolio" subtitle="All assets · Updated just now" />
      <div style={{ flex: 1, overflowY: "auto", padding: "24px 28px" }}>

        {/* Hero banner */}
        <PortfolioSummaryBanner />

        {/* Investment class cards */}
        <InvestmentCards />

        {/* Performance chart – full width */}
        <div style={{ marginBottom: 16 }}>
          <InvestmentPerformanceChart />
        </div>

        {/* NSE Stocks table – full width */}
        <StocksTable />

        {/* Crypto – full width */}
        <CryptoPanel />

        {/* MMF + SACCO – side by side */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
          <MMFPanel />
          <SACCOPanel />
        </div>

        {/* Farming – full width */}
        <FarmingPanel />

      </div>
    </>
  );
}
