import type {
  Account,
  Transaction,
  Investment,
  StockHolding,
  CryptoHolding,
  FarmingProject,
  Goal,
  NetWorthSnapshot,
  FinancialInsight,
  Opportunity,
  DashboardSummary,
} from "@/types";

// ─── Dashboard ────────────────────────────────────────────────────────────────

export const dashboardSummary: DashboardSummary = {
  netWorth: 4_287_500,
  netWorthChange: 284_000,
  netWorthChangePercent: 7.1,
  cashPosition: 842_000,
  investmentValue: 2_945_500,
  monthlyIncome: 185_000,
  monthlyExpenses: 132_400,
  savingsRate: 28.4,
  healthScore: 72,
  upcomingBills: 24_800,
};

// ─── Net Worth History ────────────────────────────────────────────────────────

export const netWorthHistory: NetWorthSnapshot[] = [
  { date: "2025-07-01", netWorth: 3_200_000, assets: 3_350_000, liabilities: 150_000, investments: 2_100_000, cash: 700_000 },
  { date: "2025-08-01", netWorth: 3_310_000, assets: 3_470_000, liabilities: 160_000, investments: 2_180_000, cash: 720_000 },
  { date: "2025-09-01", netWorth: 3_390_000, assets: 3_560_000, liabilities: 170_000, investments: 2_250_000, cash: 740_000 },
  { date: "2025-10-01", netWorth: 3_480_000, assets: 3_650_000, liabilities: 170_000, investments: 2_320_000, cash: 760_000 },
  { date: "2025-11-01", netWorth: 3_560_000, assets: 3_730_000, liabilities: 170_000, investments: 2_390_000, cash: 770_000 },
  { date: "2025-12-01", netWorth: 3_680_000, assets: 3_860_000, liabilities: 180_000, investments: 2_460_000, cash: 820_000 },
  { date: "2026-01-01", netWorth: 3_803_000, assets: 3_993_000, liabilities: 190_000, investments: 2_540_000, cash: 800_000 },
  { date: "2026-02-01", netWorth: 3_910_000, assets: 4_110_000, liabilities: 200_000, investments: 2_620_000, cash: 810_000 },
  { date: "2026-03-01", netWorth: 3_988_000, assets: 4_198_000, liabilities: 210_000, investments: 2_710_000, cash: 800_000 },
  { date: "2026-04-01", netWorth: 4_092_000, assets: 4_312_000, liabilities: 220_000, investments: 2_800_000, cash: 820_000 },
  { date: "2026-05-01", netWorth: 4_185_000, assets: 4_415_000, liabilities: 230_000, investments: 2_875_000, cash: 840_000 },
  { date: "2026-06-01", netWorth: 4_287_500, assets: 4_527_500, liabilities: 240_000, investments: 2_945_500, cash: 842_000 },
];

// ─── Accounts ────────────────────────────────────────────────────────────────

export const accounts: Account[] = [
  { id: "acc-1", name: "M-Pesa", type: "mpesa", balance: 48_500, institution: "Safaricom", currency: "KES", lastUpdated: "2026-06-03", color: "#e8413c" },
  { id: "acc-2", name: "Equity Bank Current", type: "bank", balance: 312_000, institution: "Equity Bank", currency: "KES", lastUpdated: "2026-06-03", color: "#b01c2e" },
  { id: "acc-3", name: "KCB Savings", type: "bank", balance: 218_500, institution: "KCB Bank", currency: "KES", lastUpdated: "2026-06-02", color: "#1a3f6f" },
  { id: "acc-4", name: "Stima SACCO Shares", type: "sacco", balance: 185_000, institution: "Stima SACCO", currency: "KES", lastUpdated: "2026-06-01", color: "#1a3d2e" },
  { id: "acc-5", name: "Stima SACCO Deposits", type: "sacco", balance: 346_000, institution: "Stima SACCO", currency: "KES", lastUpdated: "2026-06-01", color: "#2d5a42" },
  { id: "acc-6", name: "Cash at Hand", type: "cash", balance: 18_000, institution: "Personal", currency: "KES", lastUpdated: "2026-06-03", color: "#7d9c8a" },
  { id: "acc-7", name: "Binance Wallet", type: "wallet", balance: 206_200, institution: "Binance", currency: "KES", lastUpdated: "2026-06-03", color: "#f3ba2f" },
];

// ─── Transactions ─────────────────────────────────────────────────────────────

export const transactions: Transaction[] = [
  { id: "tx-1", accountId: "acc-2", name: "Equity Bank Salary", amount: 185_000, type: "income", category: "salary", date: "2026-06-01" },
  { id: "tx-2", accountId: "acc-1", name: "Rent – Kileleshwa", amount: -55_000, type: "expense", category: "rent", date: "2026-06-01" },
  { id: "tx-3", accountId: "acc-2", name: "Sanlam MMF Deposit", amount: -20_000, type: "investment", category: "investment", date: "2026-06-01" },
  { id: "tx-4", accountId: "acc-1", name: "Carrefour Westgate", amount: -8_450, type: "expense", category: "groceries", date: "2026-06-02" },
  { id: "tx-5", accountId: "acc-1", name: "Total Energies Fuel", amount: -4_200, type: "expense", category: "transport", date: "2026-06-03" },
  { id: "tx-6", accountId: "acc-2", name: "NSE Stock Purchase – EABL", amount: -15_000, type: "investment", category: "investment", date: "2026-05-30" },
  { id: "tx-7", accountId: "acc-1", name: "Java House Karen", amount: -3_200, type: "expense", category: "dining", date: "2026-05-29" },
  { id: "tx-8", accountId: "acc-2", name: "NHIF Contribution", amount: -1_700, type: "expense", category: "healthcare", date: "2026-05-28" },
  { id: "tx-9", accountId: "acc-1", name: "Uber Rides – May", amount: -6_800, type: "expense", category: "transport", date: "2026-05-28" },
  { id: "tx-10", accountId: "acc-3", name: "Freelance Project – KRA", amount: 45_000, type: "income", category: "freelance", date: "2026-05-27" },
  { id: "tx-11", accountId: "acc-1", name: "KPLC Electricity", amount: -3_800, type: "expense", category: "utilities", date: "2026-05-25" },
  { id: "tx-12", accountId: "acc-4", name: "Stima SACCO Monthly", amount: -10_000, type: "investment", category: "savings", date: "2026-05-25" },
];

// ─── Investments ──────────────────────────────────────────────────────────────

export const investments: Investment[] = [
  {
    id: "inv-1", name: "Sanlam Money Market Fund", type: "mmf",
    institution: "Sanlam Kenya", currentValue: 542_000, costBasis: 500_000,
    gainLoss: 42_000, gainLossPercent: 8.4, allocation: 34, lastUpdated: "2026-06-03",
  },
  {
    id: "inv-2", name: "CIC Money Market Fund", type: "mmf",
    institution: "CIC Asset Management", currentValue: 459_000, costBasis: 430_000,
    gainLoss: 29_000, gainLossPercent: 6.7, allocation: 0, lastUpdated: "2026-06-03",
  },
  {
    id: "inv-3", name: "NSE Stock Portfolio", type: "stocks",
    institution: "Nairobi Securities Exchange", currentValue: 648_000, costBasis: 520_000,
    gainLoss: 128_000, gainLossPercent: 24.6, allocation: 22, lastUpdated: "2026-06-03",
  },
  {
    id: "inv-4", name: "Stima SACCO Portfolio", type: "sacco",
    institution: "Stima SACCO", currentValue: 531_000, costBasis: 480_000,
    gainLoss: 51_000, gainLossPercent: 10.6, allocation: 18, lastUpdated: "2026-06-01",
  },
  {
    id: "inv-5", name: "Farming Projects", type: "farming",
    institution: "Personal", currentValue: 413_000, costBasis: 350_000,
    gainLoss: 63_000, gainLossPercent: 18.0, allocation: 14, lastUpdated: "2026-05-15",
  },
  {
    id: "inv-6", name: "Crypto Portfolio", type: "crypto",
    institution: "Binance", currentValue: 206_200, costBasis: 180_000,
    gainLoss: 26_200, gainLossPercent: 14.6, allocation: 7, lastUpdated: "2026-06-03",
  },
];

// ─── Stocks ───────────────────────────────────────────────────────────────────

export const stockHoldings: StockHolding[] = [
  { id: "stk-1", ticker: "EABL", company: "East African Breweries", shares: 400, avgPrice: 160, currentPrice: 188, currentValue: 75_200, gainLoss: 11_200, gainLossPercent: 17.5, dividends: 4_800 },
  { id: "stk-2", ticker: "SCOM", company: "Safaricom PLC", shares: 1_500, avgPrice: 28, currentPrice: 30.5, currentValue: 45_750, gainLoss: 3_750, gainLossPercent: 8.9, dividends: 2_250 },
  { id: "stk-3", ticker: "EQTY", company: "Equity Group Holdings", shares: 800, avgPrice: 42, currentPrice: 55, currentValue: 44_000, gainLoss: 10_400, gainLossPercent: 31.0, dividends: 1_600 },
  { id: "stk-4", ticker: "KCB", company: "KCB Group PLC", shares: 1_200, avgPrice: 35, currentPrice: 44, currentValue: 52_800, gainLoss: 10_800, gainLossPercent: 25.7, dividends: 2_400 },
  { id: "stk-5", ticker: "BAMB", company: "Bamburi Cement", shares: 500, avgPrice: 48, currentPrice: 52, currentValue: 26_000, gainLoss: 2_000, gainLossPercent: 8.3, dividends: 1_500 },
];

// ─── Crypto ───────────────────────────────────────────────────────────────────

export const cryptoHoldings: CryptoHolding[] = [
  { id: "cry-1", symbol: "BTC", name: "Bitcoin", amount: 0.012, avgBuyPrice: 6_800_000, currentPrice: 8_200_000, currentValue: 98_400, gainLoss: 16_800, gainLossPercent: 20.6, allocationPercent: 47.7 },
  { id: "cry-2", symbol: "ETH", name: "Ethereum", amount: 0.18, avgBuyPrice: 380_000, currentPrice: 425_000, currentValue: 76_500, gainLoss: 8_100, gainLossPercent: 11.8, allocationPercent: 37.1 },
  { id: "cry-3", symbol: "USDT", name: "Tether", amount: 200, avgBuyPrice: 130, currentPrice: 130, currentValue: 26_000, gainLoss: 0, gainLossPercent: 0, allocationPercent: 12.6 },
  { id: "cry-4", symbol: "SOL", name: "Solana", amount: 0.5, avgBuyPrice: 11_000, currentPrice: 10_600, currentValue: 5_300, gainLoss: -200, gainLossPercent: -3.6, allocationPercent: 2.6 },
];

// ─── Farming ──────────────────────────────────────────────────────────────────

export const farmingProjects: FarmingProject[] = [
  { id: "farm-1", name: "Broiler Chicken Batch 4", type: "poultry", capitalInvested: 80_000, currentValue: 98_000, totalRevenue: 210_000, totalExpenses: 165_000, roi: 27.3, startDate: "2026-01-15", status: "active" },
  { id: "farm-2", name: "Tomato Greenhouse – Limuru", type: "greenhouse", capitalInvested: 180_000, currentValue: 195_000, totalRevenue: 95_000, totalExpenses: 72_000, roi: 8.3, startDate: "2025-10-01", status: "active" },
  { id: "farm-3", name: "Avocado Orchard – Murang'a", type: "avocado", capitalInvested: 120_000, currentValue: 145_000, totalRevenue: 40_000, totalExpenses: 28_000, roi: 20.8, startDate: "2024-03-01", status: "active" },
];

// ─── Goals ────────────────────────────────────────────────────────────────────

export const goals: Goal[] = [
  { id: "goal-1", name: "Emergency Fund", category: "emergency", targetAmount: 600_000, currentAmount: 240_000, monthlyContribution: 15_000, targetDate: "2029-06-01", progress: 40, status: "on-track" },
  { id: "goal-2", name: "Buy Land – Kitengela", category: "land", targetAmount: 2_000_000, currentAmount: 1_260_000, monthlyContribution: 30_000, targetDate: "2027-12-01", progress: 63, status: "on-track" },
  { id: "goal-3", name: "Vehicle Purchase", category: "vehicle", targetAmount: 1_400_000, currentAmount: 350_000, monthlyContribution: 20_000, targetDate: "2028-03-01", progress: 25, status: "behind" },
  { id: "goal-4", name: "Education Fund", category: "education", targetAmount: 1_000_000, currentAmount: 120_000, monthlyContribution: 10_000, targetDate: "2030-01-01", progress: 12, status: "on-track" },
];

// ─── Insights ─────────────────────────────────────────────────────────────────

export const insights: FinancialInsight[] = [
  { id: "ins-1", title: "Expenses increased 14%", body: "Spending rose by KES 16,400 compared to last month, primarily in dining and transport.", severity: "warning", category: "spending", date: "2026-06-03", actionLabel: "Review spending", actionRoute: "/money/spending" },
  { id: "ins-2", title: "Emergency fund below target", body: "Current coverage is 2.4 months. The recommended minimum is 6 months of expenses.", severity: "info", category: "goals", date: "2026-06-02", actionLabel: "View goal", actionRoute: "/goals" },
  { id: "ins-3", title: "Savings consistency improving", body: "You have maintained your savings contributions for 3 consecutive months. Strong discipline.", severity: "positive", category: "savings", date: "2026-06-01" },
  { id: "ins-4", title: "Crypto near allocation ceiling", body: "Crypto exposure is at 7% of your portfolio, approaching your 8% target ceiling.", severity: "warning", category: "investments", date: "2026-05-30", actionLabel: "Review allocation", actionRoute: "/investments" },
  { id: "ins-5", title: "MMF yield opportunity", body: "CIC MMF is currently yielding 13.2% p.a. Your current MMF yields 11.4%. Consider reviewing.", severity: "info", category: "investments", date: "2026-05-28", actionLabel: "Compare funds", actionRoute: "/opportunities" },
];

// ─── Opportunities ────────────────────────────────────────────────────────────

export const opportunities: Opportunity[] = [
  {
    id: "opp-1", name: "CIC Money Market Fund", type: "mmf", institution: "CIC Asset Management",
    description: "Top-performing MMF in Kenya with daily liquidity and competitive yields.",
    riskLevel: "low", liquidity: "daily", minCapital: 1_000, timeHorizon: "Flexible",
    expectedReturn: "12–14% p.a.", expectedReturnMin: 12, expectedReturnMax: 14,
    tags: ["Regulated", "CMA Approved", "Capital Protected"],
  },
  {
    id: "opp-2", name: "Faulu SACCO Membership", type: "sacco", institution: "Faulu SACCO",
    description: "Join a regulated SACCO offering dividend returns and affordable credit access.",
    riskLevel: "low", liquidity: "monthly", minCapital: 5_000, timeHorizon: "1+ years",
    expectedReturn: "10–16% p.a.", expectedReturnMin: 10, expectedReturnMax: 16,
    tags: ["SASRA Regulated", "Dividends", "Loan Access"],
  },
  {
    id: "opp-3", name: "Safaricom (SCOM) Shares", type: "stocks", institution: "NSE",
    description: "Blue-chip telecom with consistent dividends and strong earnings history.",
    riskLevel: "medium", liquidity: "daily", minCapital: 10_000, timeHorizon: "2+ years",
    expectedReturn: "8–20% p.a.", expectedReturnMin: 8, expectedReturnMax: 20,
    tags: ["NSE Listed", "Dividends", "Blue Chip"],
  },
  {
    id: "opp-4", name: "Broiler Chicken Farm", type: "farming", institution: "Personal",
    description: "High-ROI short-cycle poultry project. Each batch runs 6–8 weeks.",
    riskLevel: "medium", liquidity: "locked", minCapital: 50_000, timeHorizon: "2–3 months",
    expectedReturn: "20–35% per cycle", expectedReturnMin: 20, expectedReturnMax: 35,
    tags: ["High ROI", "Short Cycle", "Food Security"],
  },
  {
    id: "opp-5", name: "Bitcoin (BTC)", type: "crypto", institution: "Binance/MPESA",
    description: "Exposure to the leading cryptocurrency as a store of value and growth asset.",
    riskLevel: "high", liquidity: "daily", minCapital: 5_000, timeHorizon: "2+ years",
    expectedReturn: "Variable (high risk)", expectedReturnMin: -50, expectedReturnMax: 150,
    tags: ["High Volatility", "Global Asset", "24/7 Liquid"],
  },
];

// ─── Spending Breakdown ───────────────────────────────────────────────────────

export const spendingByCategory = [
  { category: "Housing", amount: 55_000, percent: 41.5, color: "#1a3d2e" },
  { category: "Food & Groceries", amount: 18_200, percent: 13.7, color: "#2d5a42" },
  { category: "Transport", amount: 14_800, percent: 11.2, color: "#3d7a59" },
  { category: "Investments", amount: 20_000, percent: 15.1, color: "#b8922a" },
  { category: "Utilities", amount: 7_400, percent: 5.6, color: "#7d9c8a" },
  { category: "Dining Out", amount: 8_600, percent: 6.5, color: "#c8d8ce" },
  { category: "Healthcare", amount: 3_400, percent: 2.6, color: "#4a6358" },
  { category: "Other", amount: 5_000, percent: 3.8, color: "#e4eeea" },
];
