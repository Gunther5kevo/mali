import { create } from "zustand";
import type {
  Account,
  Transaction,
  Investment,
  Goal,
  FinancialInsight,
  DashboardSummary,
} from "@/types";
import {
  accounts as mockAccounts,
  transactions as mockTransactions,
  investments as mockInvestments,
  goals as mockGoals,
  insights as mockInsights,
  dashboardSummary as mockSummary,
} from "@/lib/data";

interface MaliState {
  // Data
  summary: DashboardSummary;
  accounts: Account[];
  transactions: Transaction[];
  investments: Investment[];
  goals: Goal[];
  insights: FinancialInsight[];

  // UI State
  activePeriod: "1M" | "3M" | "6M" | "1Y" | "ALL";
  sidebarOpen: boolean;

  // Actions
  setActivePeriod: (period: "1M" | "3M" | "6M" | "1Y" | "ALL") => void;
  setSidebarOpen: (open: boolean) => void;
  dismissInsight: (id: string) => void;
}

export const useMaliStore = create<MaliState>((set) => ({
  summary: mockSummary,
  accounts: mockAccounts,
  transactions: mockTransactions,
  investments: mockInvestments,
  goals: mockGoals,
  insights: mockInsights,

  activePeriod: "6M",
  sidebarOpen: true,

  setActivePeriod: (period) => set({ activePeriod: period }),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  dismissInsight: (id) =>
    set((state) => ({
      insights: state.insights.filter((i) => i.id !== id),
    })),
}));
