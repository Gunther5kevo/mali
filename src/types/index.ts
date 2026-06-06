// ─── Accounts ────────────────────────────────────────────────────────────────

export type AccountType =
  | "mpesa"
  | "bank"
  | "sacco"
  | "cash"
  | "wallet"
  | "investment";

export interface Account {
  id: string;
  name: string;
  type: AccountType;
  balance: number;
  institution: string;
  currency: "KES" | "USD";
  lastUpdated: string;
  color?: string;
}

// ─── Transactions ─────────────────────────────────────────────────────────────

export type TransactionType = "income" | "expense" | "transfer" | "investment";

export type TransactionCategory =
  | "salary"
  | "business"
  | "freelance"
  | "rent"
  | "groceries"
  | "transport"
  | "dining"
  | "utilities"
  | "healthcare"
  | "education"
  | "entertainment"
  | "investment"
  | "savings"
  | "transfer"
  | "other";

export interface Transaction {
  id: string;
  accountId: string;
  name: string;
  amount: number;
  type: TransactionType;
  category: TransactionCategory;
  date: string;
  note?: string;
  isRecurring?: boolean;
}

// ─── Investments ──────────────────────────────────────────────────────────────

export type InvestmentType =
  | "mmf"
  | "stocks"
  | "sacco"
  | "crypto"
  | "farming"
  | "business";

export interface Investment {
  id: string;
  name: string;
  type: InvestmentType;
  institution: string;
  currentValue: number;
  costBasis: number;
  gainLoss: number;
  gainLossPercent: number;
  allocation: number;
  lastUpdated: string;
}

export interface StockHolding {
  id: string;
  ticker: string;
  company: string;
  shares: number;
  avgPrice: number;
  currentPrice: number;
  currentValue: number;
  gainLoss: number;
  gainLossPercent: number;
  dividends: number;
}

export interface CryptoHolding {
  id: string;
  symbol: string;
  name: string;
  amount: number;
  avgBuyPrice: number;
  currentPrice: number;
  currentValue: number;
  gainLoss: number;
  gainLossPercent: number;
  allocationPercent: number;
}

export interface FarmingProject {
  id: string;
  name: string;
  type: "poultry" | "dairy" | "greenhouse" | "avocado" | "macadamia" | "other";
  capitalInvested: number;
  currentValue: number;
  totalRevenue: number;
  totalExpenses: number;
  roi: number;
  startDate: string;
  status: "active" | "harvested" | "planning";
}

// ─── Goals ────────────────────────────────────────────────────────────────────

export type GoalCategory =
  | "emergency"
  | "land"
  | "home"
  | "vehicle"
  | "education"
  | "business"
  | "travel"
  | "retirement"
  | "other";

export interface Goal {
  id: string;
  name: string;
  category: GoalCategory;
  targetAmount: number;
  currentAmount: number;
  monthlyContribution: number;
  targetDate: string;
  progress: number;
  status: "on-track" | "behind" | "ahead" | "completed";
}

// ─── Net Worth Snapshot ───────────────────────────────────────────────────────

export interface NetWorthSnapshot {
  date: string;
  netWorth: number;
  assets: number;
  liabilities: number;
  investments: number;
  cash: number;
}

// ─── Financial Insight ────────────────────────────────────────────────────────

export type InsightSeverity = "info" | "warning" | "positive" | "urgent";

export interface FinancialInsight {
  id: string;
  title: string;
  body: string;
  severity: InsightSeverity;
  category: string;
  date: string;
  actionLabel?: string;
  actionRoute?: string;
}

// ─── Opportunity ──────────────────────────────────────────────────────────────

export type RiskLevel = "low" | "medium" | "high";
export type LiquidityLevel = "daily" | "weekly" | "monthly" | "locked";

export interface Opportunity {
  id: string;
  name: string;
  type: InvestmentType;
  institution: string;
  description: string;
  riskLevel: RiskLevel;
  liquidity: LiquidityLevel;
  minCapital: number;
  timeHorizon: string;
  expectedReturn: string;
  expectedReturnMin: number;
  expectedReturnMax: number;
  tags: string[];
}

// ─── Dashboard Summary ────────────────────────────────────────────────────────

export interface DashboardSummary {
  netWorth: number;
  netWorthChange: number;
  netWorthChangePercent: number;
  cashPosition: number;
  investmentValue: number;
  monthlyIncome: number;
  monthlyExpenses: number;
  savingsRate: number;
  healthScore: number;
  upcomingBills: number;
}
