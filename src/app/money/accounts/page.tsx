import Topbar from "@/components/layout/Topbar";
import AccountsBanner from "@/components/money/AccountsBanner";
import { accounts } from "@/lib/data";
import { formatKES } from "@/lib/utils";
import { Wallet, Building2, Users, Banknote, Globe } from "lucide-react";
import type { AccountType } from "@/types";

const typeConfig: Record<AccountType, { label: string; icon: any; color: string; bg: string }> = {
  mpesa:      { label: "M-Pesa",     icon: Wallet,    color: "#e8413c",                   bg: "#fef2f2"                    },
  bank:       { label: "Bank",       icon: Building2, color: "#1a3f6f",                   bg: "#eff4ff"                    },
  sacco:      { label: "SACCO",      icon: Users,     color: "var(--mali-emerald-mid)",    bg: "var(--mali-emerald-subtle)" },
  cash:       { label: "Cash",       icon: Banknote,  color: "var(--mali-slate-500)",      bg: "var(--mali-slate-100)"      },
  wallet:     { label: "Wallet",     icon: Globe,     color: "var(--mali-gold)",           bg: "var(--mali-gold-muted)"     },
  investment: { label: "Investment", icon: Building2, color: "var(--mali-emerald-mid)",    bg: "var(--mali-emerald-subtle)" },
};

export default function AccountsPage() {
  const total = accounts.reduce((s, a) => s + a.balance, 0);

  return (
    <>
      <Topbar title="Accounts" subtitle={`${accounts.length} connected accounts`} />
      <div className="mali-page-content" style={{ flex: 1, overflowY: "auto", padding: "24px 28px" }}>

        <AccountsBanner />

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
          {accounts.map((acc) => {
            const cfg = typeConfig[acc.type];
            const Icon = cfg.icon;
            const pct = ((acc.balance / total) * 100).toFixed(1);

            return (
              <div
                key={acc.id}
                style={{ background: "#fff", border: "1px solid var(--mali-slate-100)", borderRadius: 14, padding: "20px" }}
              >
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 16 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: cfg.bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Icon size={18} color={cfg.color} />
                  </div>
                  <div style={{ fontSize: 10, fontWeight: 500, letterSpacing: "1px", textTransform: "uppercase", color: cfg.color, background: cfg.bg, padding: "3px 8px", borderRadius: 6 }}>
                    {cfg.label}
                  </div>
                </div>

                <div style={{ fontSize: 15, fontWeight: 500, color: "var(--mali-slate-900)", marginBottom: 2 }}>{acc.name}</div>
                <div style={{ fontSize: 12, color: "var(--mali-slate-400)", marginBottom: 16 }}>{acc.institution}</div>

                <div style={{ fontSize: 24, fontWeight: 500, color: "var(--mali-slate-900)", letterSpacing: "-0.5px", marginBottom: 8 }}>
                  {formatKES(acc.balance)}
                </div>

                <div style={{ height: 4, background: "var(--mali-slate-100)", borderRadius: 2, overflow: "hidden", marginBottom: 6 }}>
                  <div style={{ width: `${pct}%`, height: "100%", background: cfg.color, borderRadius: 2, opacity: 0.7 }} />
                </div>
                <div style={{ fontSize: 11, color: "var(--mali-slate-400)" }}>{pct}% of total liquid assets</div>
              </div>
            );
          })}
        </div>

      </div>
    </>
  );
}