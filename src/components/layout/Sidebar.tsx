"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, TrendingUp, Wallet, ArrowLeftRight,
  PieChart, Building2, Bitcoin, Sprout, Users,
  Target, Telescope, Lightbulb, ChevronDown, Menu, X,
} from "lucide-react";

type NavItem = {
  label: string;
  href:  string;
  icon:  React.ComponentType<{ size?: number; style?: React.CSSProperties }>;
  badge?: string;
  key?:  string;
};

const navSections: { label: string; items: NavItem[] }[] = [
  {
    label: "Overview",
    items: [
      { label: "Dashboard", href: "/",          icon: LayoutDashboard, key: "ov-dashboard" },
      
    ],
  },
  {
    label: "Money",
    items: [
      { label: "Accounts",     href: "/money/accounts",     icon: Wallet,         key: "money-accounts"     },
      { label: "Transactions", href: "/money/transactions", icon: ArrowLeftRight, key: "money-transactions" },
      { label: "Spending",     href: "/money/spending",     icon: PieChart,       key: "money-spending"     },
    ],
  },
  {
    label: "Investments",
    items: [
      { label: "Portfolio", href: "/investments",         icon: Building2, badge: "+12.4%", key: "inv-portfolio" },
      { label: "Stocks",    href: "/investments/stocks",  icon: Building2,                  key: "inv-stocks"    },
      { label: "Crypto",    href: "/investments/crypto",  icon: Bitcoin,                    key: "inv-crypto"    },
      { label: "Farming",   href: "/investments/farming", icon: Sprout,                     key: "inv-farming"   },
      { label: "SACCOs",    href: "/investments/saccos",  icon: Users,                      key: "inv-saccos"    },
    ],
  },
  {
    label: "Planning",
    items: [
      { label: "Goals",         href: "/goals",         icon: Target,    key: "plan-goals"    },
      { label: "Forecasting",   href: "/forecasting",   icon: Telescope, key: "plan-forecast" },
      { label: "Opportunities", href: "/opportunities", icon: Lightbulb, key: "plan-opps"     },
    ],
  },
];

function SidebarContent({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname();

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* Logo */}
      <div style={{ padding: "24px 20px 20px", borderBottom: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 32, height: 32, background: "var(--mali-gold)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M9 1L2 5.5V13L9 17L16 13V5.5L9 1Z" fill="var(--mali-emerald)" opacity="0.4" />
              <path d="M9 4L4 7V12L9 15L14 12V7L9 4Z" fill="var(--mali-emerald)" />
            </svg>
          </div>
          <div>
            <div style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 600, color: "#fff", letterSpacing: "0.5px" }}>Mali</div>
            <div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", letterSpacing: "1.5px", textTransform: "uppercase" }}>Wealth Platform</div>
          </div>
        </div>
        {onClose && (
          <button onClick={onClose} style={{ border: "none", background: "none", cursor: "pointer", color: "rgba(255,255,255,0.5)", padding: 4 }}>
            <X size={20} />
          </button>
        )}
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: "16px 12px", display: "flex", flexDirection: "column", gap: 2, overflowY: "auto" }}>
        {navSections.map((section) => (
          <div key={section.label}>
            <div style={{ fontSize: 10, fontWeight: 500, letterSpacing: "1.2px", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", padding: "12px 8px 6px" }}>
              {section.label}
            </div>
            {section.items.map((item) => {
              const Icon     = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.key ?? item.href}
                  href={item.href}
                  onClick={onClose}
                  style={{
                    display: "flex", alignItems: "center", gap: 10,
                    padding: "9px 10px", borderRadius: 8, fontSize: 13.5,
                    fontWeight: isActive ? 500 : 400,
                    color: isActive ? "#fff" : "rgba(255,255,255,0.65)",
                    background: isActive ? "rgba(255,255,255,0.13)" : "transparent",
                    textDecoration: "none",
                    transition: "background 0.15s, color 0.15s",
                    marginBottom: 1,
                  }}
                >
                  <Icon size={16} style={{ opacity: isActive ? 1 : 0.8, flexShrink: 0 }} />
                  <span style={{ flex: 1 }}>{item.label}</span>
                  {item.badge && (
                    <span style={{ background: "var(--mali-gold)", color: "var(--mali-emerald)", fontSize: 10, fontWeight: 600, padding: "1px 6px", borderRadius: 10 }}>
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div style={{ padding: "16px 12px", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: 8, borderRadius: 8, cursor: "pointer" }}>
          <div style={{ width: 32, height: 32, borderRadius: "50%", background: "var(--mali-gold)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 600, color: "var(--mali-emerald)", flexShrink: 0 }}>
            DM
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 13, fontWeight: 500, color: "rgba(255,255,255,0.9)", lineHeight: 1.3 }}>David Mwangi</div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)" }}>Mali Premium</div>
          </div>
          <ChevronDown size={14} color="rgba(255,255,255,0.4)" />
        </div>
      </div>
    </div>
  );
}

export default function Sidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Desktop sidebar */}
      <aside
        className="mali-sidebar-desktop"
        style={{
          width: 220,
          flexShrink: 0,
          background: "var(--mali-emerald)",
          height: "100vh",
          overflowY: "auto",
        }}
      >
        <SidebarContent />
      </aside>

      {/* Mobile hamburger */}
      <button
        className="mali-menu-btn"
        onClick={() => setMobileOpen(true)}
        style={{
          position: "fixed",
          top: 14,
          left: 14,
          zIndex: 100,
          width: 40,
          height: 40,
          borderRadius: 10,
          background: "var(--mali-emerald)",
          border: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 2px 12px rgba(0,0,0,0.2)",
        }}
      >
        <Menu size={18} color="#fff" />
      </button>

      {/* Backdrop */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.5)",
            zIndex: 200,
          }}
        />
      )}

      {/* Mobile drawer */}
      <aside
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 260,
          height: "100vh",
          background: "var(--mali-emerald)",
          zIndex: 300,
          transform: mobileOpen ? "translateX(0)" : "translateX(-100%)",
          transition: "transform 0.25s ease",
          overflowY: "auto",
        }}
      >
        <SidebarContent onClose={() => setMobileOpen(false)} />
      </aside>
    </>
  );
}