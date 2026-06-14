"use client";

import { accounts } from "@/lib/data";
import { formatKES } from "@/lib/utils";
import { Wallet, Building2, Users, Banknote, Globe } from "lucide-react";
import type { AccountType } from "@/types";

const typeConfig: Record<AccountType, { label: string; icon: any; color: string; bg: string }> = {
  mpesa:      { label: "M-Pesa",      icon: Wallet,    color: "#e8413c", bg: "#fef2f2" },
  bank:       { label: "Bank",        icon: Building2, color: "#1a3f6f", bg: "#eff4ff" },
  sacco:      { label: "SACCO",       icon: Users,     color: "var(--mali-emerald-mid)", bg: "var(--mali-emerald-subtle)" },
  cash:       { label: "Cash",        icon: Banknote,  color: "var(--mali-slate-500)",  bg: "var(--mali-slate-100)" },
  wallet:     { label: "Wallet",      icon: Globe,     color: "#b8922a", bg: "var(--mali-gold-muted)" },
  investment: { label: "Investment",  icon: Building2, color: "var(--mali-emerald-mid)", bg: "var(--mali-emerald-subtle)" },
};

export default function AccountsBanner() {
  const total = accounts.reduce((s, a) => s + a.balance, 0);

  const grouped = accounts.reduce<Record<string, number>>((acc, a) => {
    acc[a.type] = (acc[a.type] ?? 0) + a.balance;
    return acc;
  }, {});

  return (
    <div
      style={{
        background: "var(--mali-emerald)",
        borderRadius: 16,
        padding: "24px 20px",
        marginBottom: 20,
        position: "relative",
        overflow: "hidden",
      }}
      className="mali-accounts-banner"
    >
      {/* Rings */}
      <div style={{ position: "absolute", top: -50, right: -50, width: 240, height: 240, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.05)" }} />
      <div style={{ position: "absolute", bottom: -80, right: 60, width: 320, height: 320, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.03)" }} />

      <div
        className="mali-accounts-banner-inner"
        style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", position: "relative", zIndex: 1, gap: 24 }}
      >

        {/* Left */}
        <div style={{ minWidth: 0, flex: 1 }}>
          <div style={{ fontSize: 11, fontWeight: 500, letterSpacing: "1.5px", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginBottom: 8 }}>
            Total Cash & Liquid Assets
          </div>
          <div
            className="mali-total-amount"
            style={{ fontFamily: "var(--font-display)", fontSize: 44, fontWeight: 500, color: "#fff", letterSpacing: "-1px", lineHeight: 1 }}
          >
            {formatKES(total)}
          </div>
          <div style={{ fontSize: 12, color: "rgba(255,255,255,0.45)", marginTop: 8 }}>
            Across {accounts.length} accounts
          </div>

          {/* Breakdown bar */}
          <div style={{ marginTop: 20 }}>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginBottom: 8 }}>Breakdown by account type</div>
            <div
              className="mali-breakdown-bar"
              style={{ display: "flex", height: 6, borderRadius: 3, overflow: "hidden", width: "100%", maxWidth: 380, gap: 1 }}
            >
              {Object.entries(grouped).map(([type, bal]) => (
                <div
                  key={type}
                  style={{
                    flex: bal / total,
                    background: typeConfig[type as AccountType]?.color ?? "#ccc",
                    minWidth: 3,
                    opacity: 0.85,
                  }}
                />
              ))}
            </div>
            <div style={{ display: "flex", gap: 14, marginTop: 10, flexWrap: "wrap" }}>
              {Object.entries(grouped).map(([type, bal]) => (
                <div key={type} style={{ display: "flex", alignItems: "center", gap: 5 }}>
                  <div style={{ width: 7, height: 7, borderRadius: "50%", background: typeConfig[type as AccountType]?.color ?? "#ccc", flexShrink: 0 }} />
                  <span style={{ fontSize: 11, color: "rgba(255,255,255,0.55)" }}>
                    {typeConfig[type as AccountType]?.label} {formatKES(bal, true)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right — per-account cards */}
        <div className="mali-account-cards" style={{ display: "flex", flexDirection: "column", gap: 8, flexShrink: 0 }}>
          {accounts.map((acc) => {
            const cfg = typeConfig[acc.type];
            const Icon = cfg.icon;
            return (
              <div
                key={acc.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  background: "rgba(255,255,255,0.08)",
                  borderRadius: 10,
                  padding: "10px 14px",
                  minWidth: 260,
                }}
              >
                <div style={{ width: 30, height: 30, borderRadius: 8, background: "rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Icon size={14} color="rgba(255,255,255,0.8)" />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 12, fontWeight: 500, color: "#fff", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{acc.name}</div>
                  <div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)" }}>{acc.institution}</div>
                </div>
                <div style={{ fontSize: 13, fontWeight: 500, color: "#fff", flexShrink: 0 }}>{formatKES(acc.balance, true)}</div>
              </div>
            );
          })}
        </div>

      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .mali-accounts-banner {
            padding: 20px 16px !important;
          }
          .mali-accounts-banner-inner {
            flex-direction: column;
          }
          .mali-total-amount {
            font-size: 32px !important;
          }
          .mali-account-cards {
            width: 100%;
          }
          .mali-account-cards > div {
            min-width: 0 !important;
            width: 100%;
          }
          .mali-breakdown-bar {
            max-width: 100% !important;
          }
        }
      `}</style>
    </div>
  );
}