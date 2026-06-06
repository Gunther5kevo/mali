"use client";

import { investments } from "@/lib/data";
import { formatKES } from "@/lib/utils";

const COLORS = [
  "var(--mali-emerald-mid)",
  "var(--mali-gold)",
  "var(--mali-emerald-light)",
  "var(--mali-slate-400)",
  "var(--mali-slate-200)",
  "var(--mali-slate-100)",
];

export default function AssetAllocation() {
  const items = investments.filter((i) => i.allocation > 0);

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
            Asset Allocation
          </div>
          <div style={{ fontSize: 11, color: "var(--mali-slate-400)", marginTop: 2 }}>
            Current distribution
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
          Rebalance →
        </button>
      </div>

      <div style={{ padding: "18px 20px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {items.map((inv, i) => (
            <div key={inv.id} style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: COLORS[i],
                  flexShrink: 0,
                  border: i === items.length - 1 ? "1px solid var(--mali-slate-200)" : "none",
                }}
              />
              <span
                style={{
                  fontSize: 13,
                  color: "var(--mali-slate-600)",
                  flex: 1,
                  whiteSpace: "nowrap",
                }}
              >
                {inv.name.replace(" Fund", "").replace(" Portfolio", "")}
              </span>
              <div
                style={{
                  flex: 1.5,
                  height: 4,
                  background: "var(--mali-slate-100)",
                  borderRadius: 2,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: `${inv.allocation}%`,
                    height: "100%",
                    background: COLORS[i],
                    borderRadius: 2,
                  }}
                />
              </div>
              <span
                style={{
                  fontSize: 13,
                  fontWeight: 500,
                  color: "var(--mali-slate-900)",
                  minWidth: 32,
                  textAlign: "right",
                }}
              >
                {inv.allocation}%
              </span>
              <span
                style={{
                  fontSize: 11,
                  color: "var(--mali-slate-400)",
                  minWidth: 72,
                  textAlign: "right",
                }}
              >
                {formatKES(inv.currentValue, true)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
