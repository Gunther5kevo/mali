"use client";

import type { InvestmentType, RiskLevel, LiquidityLevel } from "@/types";

export interface FilterState {
  type:      InvestmentType | "all";
  risk:      RiskLevel      | "all";
  liquidity: LiquidityLevel | "all";
}

interface OpportunitiesFilterProps {
  filters:   FilterState;
  onChange:  (f: FilterState) => void;
  totalShown: number;
}

const typeOptions:      { value: InvestmentType | "all"; label: string }[] = [
  { value: "all",      label: "All Types"   },
  { value: "mmf",      label: "MMF"         },
  { value: "stocks",   label: "Stocks"      },
  { value: "sacco",    label: "SACCO"       },
  { value: "farming",  label: "Farming"     },
  { value: "crypto",   label: "Crypto"      },
  { value: "business", label: "Business"    },
];

const riskOptions: { value: RiskLevel | "all"; label: string }[] = [
  { value: "all",    label: "Any Risk"  },
  { value: "low",    label: "Low"       },
  { value: "medium", label: "Medium"    },
  { value: "high",   label: "High"      },
];

const liquidityOptions: { value: LiquidityLevel | "all"; label: string }[] = [
  { value: "all",     label: "Any Liquidity" },
  { value: "daily",   label: "Daily"         },
  { value: "weekly",  label: "Weekly"        },
  { value: "monthly", label: "Monthly"       },
  { value: "locked",  label: "Locked"        },
];

function FilterGroup<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: { value: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
      <span style={{ fontSize: 11, fontWeight: 500, color: "var(--mali-slate-400)", textTransform: "uppercase", letterSpacing: "0.8px", whiteSpace: "nowrap" }}>
        {label}
      </span>
      <div style={{ display: "flex", background: "var(--mali-slate-100)", borderRadius: 8, padding: 3, gap: 2 }}>
        {options.map((opt) => (
          <button
            key={opt.value}
            onClick={() => onChange(opt.value)}
            style={{
              padding: "5px 11px",
              borderRadius: 6,
              fontSize: 12,
              fontWeight: 500,
              cursor: "pointer",
              border: "none",
              fontFamily: "var(--font-body)",
              whiteSpace: "nowrap",
              background: value === opt.value ? "var(--mali-white)" : "transparent",
              color:      value === opt.value ? "var(--mali-slate-900)" : "var(--mali-slate-400)",
              transition: "background 0.15s, color 0.15s",
            }}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function OpportunitiesFilter({ filters, onChange, totalShown }: OpportunitiesFilterProps) {
  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid var(--mali-slate-100)",
        borderRadius: 12,
        padding: "14px 20px",
        marginBottom: 16,
        display: "flex",
        alignItems: "center",
        gap: 20,
        flexWrap: "wrap",
      }}
    >
      <FilterGroup
        label="Type"
        options={typeOptions}
        value={filters.type}
        onChange={(v) => onChange({ ...filters, type: v })}
      />

      <div style={{ width: 1, height: 24, background: "var(--mali-slate-100)" }} />

      <FilterGroup
        label="Risk"
        options={riskOptions}
        value={filters.risk}
        onChange={(v) => onChange({ ...filters, risk: v })}
      />

      <div style={{ width: 1, height: 24, background: "var(--mali-slate-100)" }} />

      <FilterGroup
        label="Liquidity"
        options={liquidityOptions}
        value={filters.liquidity}
        onChange={(v) => onChange({ ...filters, liquidity: v })}
      />

      <div style={{ marginLeft: "auto", fontSize: 12, color: "var(--mali-slate-400)" }}>
        {totalShown} result{totalShown !== 1 ? "s" : ""}
      </div>
    </div>
  );
}