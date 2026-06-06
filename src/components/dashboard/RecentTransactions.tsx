"use client";

import {
  Building2,
  Home,
  TrendingUp,
  ShoppingCart,
  Fuel,
  Briefcase,
  Zap,
  PiggyBank,
} from "lucide-react";
import { transactions } from "@/lib/data";
import { formatKES } from "@/lib/utils";
import { format } from "date-fns";
import type { TransactionCategory } from "@/types";

const categoryIcons: Record<TransactionCategory, any> = {
  salary: Building2,
  business: Briefcase,
  freelance: Briefcase,
  rent: Home,
  groceries: ShoppingCart,
  transport: Fuel,
  dining: ShoppingCart,
  utilities: Zap,
  healthcare: PiggyBank,
  education: Building2,
  entertainment: ShoppingCart,
  investment: TrendingUp,
  savings: PiggyBank,
  transfer: TrendingUp,
  other: ShoppingCart,
};

const categoryColors: Record<TransactionCategory, string> = {
  salary: "#e8f2ec",
  business: "#e8f2ec",
  freelance: "#e8f2ec",
  rent: "#faf5ea",
  groceries: "#f5f9f6",
  transport: "#f5f9f6",
  dining: "#f5f9f6",
  utilities: "#f5f9f6",
  healthcare: "#f5f9f6",
  education: "#f5f9f6",
  entertainment: "#f5f9f6",
  investment: "#e8f2ec",
  savings: "#e8f2ec",
  transfer: "#f5f9f6",
  other: "#f5f9f6",
};

const categoryIconColors: Record<TransactionCategory, string> = {
  salary: "var(--mali-emerald-mid)",
  business: "var(--mali-emerald-mid)",
  freelance: "var(--mali-emerald-mid)",
  rent: "var(--mali-gold)",
  groceries: "var(--mali-slate-600)",
  transport: "var(--mali-slate-600)",
  dining: "var(--mali-slate-600)",
  utilities: "var(--mali-slate-600)",
  healthcare: "var(--mali-slate-600)",
  education: "var(--mali-slate-600)",
  entertainment: "var(--mali-slate-600)",
  investment: "var(--mali-emerald-mid)",
  savings: "var(--mali-emerald-mid)",
  transfer: "var(--mali-slate-600)",
  other: "var(--mali-slate-600)",
};

export default function RecentTransactions() {
  const recent = transactions.slice(0, 6);

  return (
    <div className="mali-card">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "18px 20px 14px",
          borderBottom: "1px solid var(--mali-slate-50)",
        }}
      >
        <div>
          <div style={{ fontSize: 14, fontWeight: 500, color: "var(--mali-slate-900)" }}>
            Recent Transactions
          </div>
          <div style={{ fontSize: 11, color: "var(--mali-slate-400)", marginTop: 2 }}>
            Across all accounts
          </div>
        </div>
        <button
          style={{
            fontSize: 12,
            color: "var(--mali-emerald-light)",
            fontWeight: 500,
            border: "none",
            background: "none",
            cursor: "pointer",
            fontFamily: "var(--font-body)",
          }}
        >
          View all →
        </button>
      </div>

      <div style={{ padding: "8px 20px 12px" }}>
        {recent.map((tx, i) => {
          const Icon = categoryIcons[tx.category];
          const isCredit = tx.amount > 0;
          return (
            <div
              key={tx.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "10px 0",
                borderBottom: i < recent.length - 1 ? "1px solid var(--mali-slate-50)" : "none",
              }}
            >
              <div
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: 9,
                  background: categoryColors[tx.category],
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <Icon size={14} color={categoryIconColors[tx.category]} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: 500,
                    color: "var(--mali-slate-900)",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {tx.name}
                </div>
                <div style={{ fontSize: 11, color: "var(--mali-slate-400)", marginTop: 1, textTransform: "capitalize" }}>
                  {tx.category} · {tx.accountId === "acc-1" ? "M-Pesa" : "Bank"}
                </div>
              </div>
              <div style={{ textAlign: "right", flexShrink: 0 }}>
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: 500,
                    color: isCredit ? "var(--mali-positive)" : "var(--mali-slate-900)",
                  }}
                >
                  {isCredit ? "+" : ""}
                  {formatKES(Math.abs(tx.amount))}
                </div>
                <div style={{ fontSize: 11, color: "var(--mali-slate-400)", marginTop: 1 }}>
                  {format(new Date(tx.date), "d MMM")}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
