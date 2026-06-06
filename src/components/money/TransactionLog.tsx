"use client";

import { useState } from "react";
import {
  Search,
  SlidersHorizontal,
  Building2,
  Home,
  TrendingUp,
  ShoppingCart,
  Fuel,
  Zap,
  PiggyBank,
  Briefcase,
  ArrowUpRight,
  ArrowDownLeft,
} from "lucide-react";
import { transactions } from "@/lib/data";
import { accounts } from "@/lib/data";
import { formatKES } from "@/lib/utils";
import { format } from "date-fns";
import type { TransactionCategory, TransactionType } from "@/types";

const categoryIcons: Record<TransactionCategory, any> = {
  salary: Building2, business: Briefcase, freelance: Briefcase,
  rent: Home, groceries: ShoppingCart, transport: Fuel,
  dining: ShoppingCart, utilities: Zap, healthcare: PiggyBank,
  education: Building2, entertainment: ShoppingCart,
  investment: TrendingUp, savings: PiggyBank,
  transfer: TrendingUp, other: ShoppingCart,
};

const categoryBg: Record<TransactionCategory, string> = {
  salary: "#e8f2ec", business: "#e8f2ec", freelance: "#e8f2ec",
  rent: "#faf5ea", groceries: "var(--mali-slate-50)", transport: "var(--mali-slate-50)",
  dining: "var(--mali-slate-50)", utilities: "var(--mali-slate-50)", healthcare: "var(--mali-slate-50)",
  education: "var(--mali-slate-50)", entertainment: "var(--mali-slate-50)",
  investment: "#e8f2ec", savings: "#e8f2ec", transfer: "var(--mali-slate-50)", other: "var(--mali-slate-50)",
};

const categoryIconColor: Record<TransactionCategory, string> = {
  salary: "var(--mali-emerald-mid)", business: "var(--mali-emerald-mid)", freelance: "var(--mali-emerald-mid)",
  rent: "var(--mali-gold)", groceries: "var(--mali-slate-500)", transport: "var(--mali-slate-500)",
  dining: "var(--mali-slate-500)", utilities: "var(--mali-slate-500)", healthcare: "var(--mali-slate-500)",
  education: "var(--mali-slate-500)", entertainment: "var(--mali-slate-500)",
  investment: "var(--mali-emerald-mid)", savings: "var(--mali-emerald-mid)",
  transfer: "var(--mali-slate-500)", other: "var(--mali-slate-500)",
};

const typeFilters: { label: string; value: string }[] = [
  { label: "All", value: "all" },
  { label: "Income", value: "income" },
  { label: "Expenses", value: "expense" },
  { label: "Investments", value: "investment" },
  { label: "Transfers", value: "transfer" },
];

export default function TransactionLog() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");

  const accountMap = Object.fromEntries(accounts.map((a) => [a.id, a]));

  const filtered = transactions.filter((tx) => {
    const matchesSearch = tx.name.toLowerCase().includes(search.toLowerCase());
    const matchesType = typeFilter === "all" || tx.type === typeFilter;
    return matchesSearch && matchesType;
  });

  // Group by date
  const grouped = filtered.reduce<Record<string, typeof filtered>>((acc, tx) => {
    const key = format(new Date(tx.date), "d MMMM yyyy");
    acc[key] = acc[key] ?? [];
    acc[key].push(tx);
    return acc;
  }, {});

  const totalIn = filtered.filter((t) => t.amount > 0).reduce((s, t) => s + t.amount, 0);
  const totalOut = filtered.filter((t) => t.amount < 0).reduce((s, t) => s + Math.abs(t.amount), 0);

  return (
    <div className="mali-card">
      {/* Header */}
      <div style={{ padding: "18px 20px 14px", borderBottom: "1px solid var(--mali-slate-50)" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
          <div>
            <div style={{ fontSize: 14, fontWeight: 500, color: "var(--mali-slate-900)" }}>Transactions</div>
            <div style={{ fontSize: 11, color: "var(--mali-slate-400)", marginTop: 2 }}>{filtered.length} transactions shown</div>
          </div>
          <div style={{ display: "flex", gap: 20 }}>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 10, color: "var(--mali-slate-400)", textTransform: "uppercase", letterSpacing: "0.8px", marginBottom: 2 }}>Money In</div>
              <div style={{ fontSize: 14, fontWeight: 500, color: "var(--mali-positive)" }}>{formatKES(totalIn, true)}</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 10, color: "var(--mali-slate-400)", textTransform: "uppercase", letterSpacing: "0.8px", marginBottom: 2 }}>Money Out</div>
              <div style={{ fontSize: 14, fontWeight: 500, color: "var(--mali-slate-900)" }}>−{formatKES(totalOut, true)}</div>
            </div>
          </div>
        </div>

        {/* Search + filters row */}
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          {/* Search */}
          <div style={{ flex: 1, position: "relative" }}>
            <Search size={13} style={{ position: "absolute", left: 11, top: "50%", transform: "translateY(-50%)", color: "var(--mali-slate-400)" }} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search transactions..."
              style={{
                width: "100%",
                padding: "8px 12px 8px 32px",
                borderRadius: 8,
                border: "1px solid var(--mali-slate-100)",
                fontSize: 13,
                fontFamily: "var(--font-body)",
                color: "var(--mali-slate-900)",
                background: "var(--mali-slate-50)",
                outline: "none",
              }}
            />
          </div>

          {/* Type filters */}
          <div style={{ display: "flex", background: "var(--mali-slate-100)", borderRadius: 8, padding: 3, gap: 2 }}>
            {typeFilters.map((f) => (
              <button
                key={f.value}
                onClick={() => setTypeFilter(f.value)}
                style={{
                  padding: "5px 12px",
                  borderRadius: 6,
                  fontSize: 12,
                  fontWeight: 500,
                  cursor: "pointer",
                  border: "none",
                  fontFamily: "var(--font-body)",
                  background: typeFilter === f.value ? "var(--mali-white)" : "transparent",
                  color: typeFilter === f.value ? "var(--mali-slate-900)" : "var(--mali-slate-400)",
                  transition: "background 0.15s",
                  whiteSpace: "nowrap",
                }}
              >
                {f.label}
              </button>
            ))}
          </div>

          <button
            style={{
              display: "flex", alignItems: "center", gap: 6,
              padding: "8px 12px", borderRadius: 8, fontSize: 12, fontWeight: 500,
              border: "1px solid var(--mali-slate-100)", background: "var(--mali-white)",
              color: "var(--mali-slate-500)", cursor: "pointer", fontFamily: "var(--font-body)",
            }}
          >
            <SlidersHorizontal size={13} />
            Filter
          </button>
        </div>
      </div>

      {/* Transaction groups */}
      <div style={{ maxHeight: 520, overflowY: "auto" }}>
        {Object.entries(grouped).map(([date, txs]) => (
          <div key={date}>
            {/* Date heading */}
            <div style={{ padding: "10px 20px 6px", background: "var(--mali-slate-50)", borderBottom: "1px solid var(--mali-slate-100)" }}>
              <span style={{ fontSize: 11, fontWeight: 500, color: "var(--mali-slate-500)", textTransform: "uppercase", letterSpacing: "0.8px" }}>
                {date}
              </span>
            </div>

            {/* Transactions for that date */}
            {txs.map((tx, i) => {
              const Icon = categoryIcons[tx.category];
              const isCredit = tx.amount > 0;
              const account = accountMap[tx.accountId];

              return (
                <div
                  key={tx.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "12px 20px",
                    borderBottom: "1px solid var(--mali-slate-50)",
                    transition: "background 0.1s",
                    cursor: "pointer",
                  }}
                >
                  {/* Icon */}
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: categoryBg[tx.category], display: "flex", alignItems: "center", justifyContent: "center", marginRight: 12, flexShrink: 0 }}>
                    <Icon size={14} color={categoryIconColor[tx.category]} />
                  </div>

                  {/* Name + account */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 500, color: "var(--mali-slate-900)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {tx.name}
                    </div>
                    <div style={{ fontSize: 11, color: "var(--mali-slate-400)", marginTop: 1 }}>
                      {account?.name ?? "Unknown"} · <span style={{ textTransform: "capitalize" }}>{tx.category}</span>
                    </div>
                  </div>

                  {/* Type badge */}
                  <div style={{
                    display: "inline-flex", alignItems: "center", gap: 3,
                    fontSize: 11, fontWeight: 500,
                    padding: "2px 8px", borderRadius: 12, marginRight: 16,
                    background: tx.type === "investment" ? "var(--mali-emerald-muted)" : tx.type === "income" ? "var(--mali-positive-bg)" : "var(--mali-slate-100)",
                    color: tx.type === "investment" ? "var(--mali-emerald-mid)" : tx.type === "income" ? "var(--mali-positive)" : "var(--mali-slate-500)",
                    textTransform: "capitalize",
                  }}>
                    {tx.type === "income" ? <ArrowDownLeft size={10} /> : <ArrowUpRight size={10} />}
                    {tx.type}
                  </div>

                  {/* Amount */}
                  <div style={{ textAlign: "right", flexShrink: 0 }}>
                    <div style={{ fontSize: 14, fontWeight: 500, color: isCredit ? "var(--mali-positive)" : "var(--mali-slate-900)" }}>
                      {isCredit ? "+" : "−"}{formatKES(Math.abs(tx.amount))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ))}

        {filtered.length === 0 && (
          <div style={{ padding: "40px 20px", textAlign: "center", color: "var(--mali-slate-400)", fontSize: 13 }}>
            No transactions match your search.
          </div>
        )}
      </div>
    </div>
  );
}