import { dashboardSummary, netWorthHistory } from "./data";

export type ScenarioKey = "conservative" | "moderate" | "optimistic";

export interface ScenarioConfig {
  label: string;
  description: string;
  investmentReturn: number;   // annual % return on investments
  incomeGrowth: number;       // annual % income growth
  expenseGrowth: number;      // annual % expense growth
  savingsBoost: number;       // extra % of income saved on top of current rate
}

export const scenarios: Record<ScenarioKey, ScenarioConfig> = {
  conservative: {
    label: "Conservative",
    description: "Modest returns, stable income, no lifestyle changes",
    investmentReturn: 8,
    incomeGrowth: 4,
    expenseGrowth: 6,
    savingsBoost: 0,
  },
  moderate: {
    label: "Moderate",
    description: "Balanced growth, slight income increase, controlled spending",
    investmentReturn: 12,
    incomeGrowth: 8,
    expenseGrowth: 5,
    savingsBoost: 2,
  },
  optimistic: {
    label: "Optimistic",
    description: "Strong returns, career growth, disciplined saving",
    investmentReturn: 18,
    incomeGrowth: 15,
    expenseGrowth: 4,
    savingsBoost: 5,
  },
};

export interface ProjectionPoint {
  year: string;
  netWorth: number;
  investments: number;
  cash: number;
  annualIncome: number;
  annualExpenses: number;
  annualSavings: number;
}

export function projectWealth(
  scenario: ScenarioKey,
  years: number = 10
): ProjectionPoint[] {
  const cfg = scenarios[scenario];

  const {
    netWorth,
    cashPosition,
    investmentValue,
    monthlyIncome,
    monthlyExpenses,
  } = dashboardSummary;

  const points: ProjectionPoint[] = [];

  let currentInvestments = investmentValue;
  let currentCash        = cashPosition;
  let currentIncome      = monthlyIncome * 12;
  let currentExpenses    = monthlyExpenses * 12;

  // Add year 0 (today)
  points.push({
    year: "Now",
    netWorth,
    investments: currentInvestments,
    cash: currentCash,
    annualIncome: currentIncome,
    annualExpenses: currentExpenses,
    annualSavings: currentIncome - currentExpenses,
  });

  for (let y = 1; y <= years; y++) {
    // Grow income and expenses
    currentIncome    = currentIncome    * (1 + cfg.incomeGrowth    / 100);
    currentExpenses  = currentExpenses  * (1 + cfg.expenseGrowth   / 100);

    // Annual savings = income - expenses + savings boost
    const baseSavings    = Math.max(0, currentIncome - currentExpenses);
    const boostedSavings = currentIncome * (cfg.savingsBoost / 100);
    const annualSavings  = baseSavings + boostedSavings;

    // Investments grow by return + new contributions (half savings go to investments)
    currentInvestments = currentInvestments * (1 + cfg.investmentReturn / 100) + annualSavings * 0.6;

    // Cash grows with remainder
    currentCash = currentCash + annualSavings * 0.4;

    const totalNetWorth = currentInvestments + currentCash;

    points.push({
      year: `Year ${y}`,
      netWorth: Math.round(totalNetWorth),
      investments: Math.round(currentInvestments),
      cash: Math.round(currentCash),
      annualIncome: Math.round(currentIncome),
      annualExpenses: Math.round(currentExpenses),
      annualSavings: Math.round(annualSavings),
    });
  }

  return points;
}

export function getMilestones(points: ProjectionPoint[]) {
  const milestones: { label: string; year: string; value: number }[] = [];

  const thresholds = [
    { label: "KES 5M net worth",  amount: 5_000_000  },
    { label: "KES 10M net worth", amount: 10_000_000 },
    { label: "KES 20M net worth", amount: 20_000_000 },
    { label: "KES 50M net worth", amount: 50_000_000 },
  ];

  for (const threshold of thresholds) {
    const hit = points.find((p) => p.netWorth >= threshold.amount);
    if (hit) {
      milestones.push({
        label: threshold.label,
        year: hit.year,
        value: hit.netWorth,
      });
    }
  }

  return milestones;
}

export function getKeyStats(points: ProjectionPoint[], scenario: ScenarioKey) {
  const cfg    = scenarios[scenario];
  const last   = points[points.length - 1];
  const first  = points[0];

  return {
    finalNetWorth:      last.netWorth,
    totalGrowth:        last.netWorth - first.netWorth,
    growthMultiple:     (last.netWorth / first.netWorth).toFixed(1),
    finalInvestments:   last.investments,
    finalAnnualIncome:  last.annualIncome,
    finalAnnualSavings: last.annualSavings,
    avgAnnualReturn:    cfg.investmentReturn,
  };
}