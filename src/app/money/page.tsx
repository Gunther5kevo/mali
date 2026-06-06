import Topbar from "@/components/layout/Topbar";
import AccountsBanner from "@/components/money/AccountsBanner";
import SpendingTrends from "@/components/money/SpendingTrends";
import SpendingBreakdown from "@/components/money/SpendingBreakdown";
import TransactionLog from "@/components/money/TransactionLog";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

function SectionHeader({ title, subtitle, href }: { title: string; subtitle: string; href: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
      <div>
        <div style={{ fontSize: 16, fontWeight: 500, color: "var(--mali-slate-900)", fontFamily: "var(--font-display)" }}>{title}</div>
        <div style={{ fontSize: 12, color: "var(--mali-slate-400)", marginTop: 2 }}>{subtitle}</div>
      </div>
      <Link
        href={href}
        style={{
          display: "flex", alignItems: "center", gap: 5,
          fontSize: 12, fontWeight: 500, color: "var(--mali-emerald-light)",
          textDecoration: "none", padding: "6px 12px",
          border: "1px solid var(--mali-slate-100)", borderRadius: 8,
          background: "#fff",
        }}
      >
        View full <ArrowRight size={12} />
      </Link>
    </div>
  );
}

export default function MoneyPage() {
  return (
    <>
      <Topbar title="Money" subtitle="Accounts, spending & transactions" />
      <div style={{ flex: 1, overflowY: "auto", padding: "24px 28px" }}>
        <SectionHeader title="Accounts" subtitle="All connected accounts" href="/money/accounts" />
        <AccountsBanner />

        <SectionHeader title="Spending" subtitle="Where your money goes this month" href="/money/spending" />
        <SpendingTrends />
        <SpendingBreakdown />

        <SectionHeader title="Transactions" subtitle="Recent activity across all accounts" href="/money/transactions" />
        <TransactionLog />
      </div>
    </>
  );
}