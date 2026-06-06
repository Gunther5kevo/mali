"use client";

import { Download, Plus } from "lucide-react";
import { useMaliStore } from "@/store";

const periods = ["1M", "3M", "6M", "1Y", "ALL"] as const;

interface TopbarProps {
  title: string;
  subtitle?: string;
}

export default function Topbar({ title, subtitle }: TopbarProps) {
  const { activePeriod, setActivePeriod } = useMaliStore();

  const now = new Date();
  const dateStr = now.toLocaleDateString("en-KE", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <header
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "16px 28px",
        background: "var(--mali-white)",
        borderBottom: "1px solid var(--mali-slate-100)",
        flexShrink: 0,
      }}
    >
      <div>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 20,
            fontWeight: 500,
            color: "var(--mali-slate-900)",
            lineHeight: 1.2,
          }}
        >
          {title}
        </h1>
        <p style={{ fontSize: 12, color: "var(--mali-slate-400)", marginTop: 2 }}>
          {subtitle ?? `${dateStr} · Nairobi`}
        </p>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        {/* Period Selector */}
        <div
          style={{
            display: "flex",
            background: "var(--mali-slate-100)",
            borderRadius: 8,
            padding: 3,
            gap: 2,
          }}
        >
          {periods.map((p) => (
            <button
              key={p}
              onClick={() => setActivePeriod(p)}
              style={{
                padding: "4px 10px",
                borderRadius: 6,
                fontSize: 12,
                fontWeight: 500,
                cursor: "pointer",
                border: "none",
                fontFamily: "var(--font-body)",
                background: activePeriod === p ? "var(--mali-white)" : "transparent",
                color: activePeriod === p ? "var(--mali-slate-900)" : "var(--mali-slate-400)",
                transition: "background 0.15s, color 0.15s",
              }}
            >
              {p}
            </button>
          ))}
        </div>

        {/* Export */}
        <button
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            padding: "7px 14px",
            borderRadius: 8,
            fontSize: 13,
            fontWeight: 500,
            cursor: "pointer",
            border: "none",
            fontFamily: "var(--font-body)",
            background: "var(--mali-slate-100)",
            color: "var(--mali-slate-600)",
          }}
        >
          <Download size={14} />
          Export
        </button>

        {/* Add Asset */}
        <button
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            padding: "7px 14px",
            borderRadius: 8,
            fontSize: 13,
            fontWeight: 500,
            cursor: "pointer",
            border: "none",
            fontFamily: "var(--font-body)",
            background: "var(--mali-emerald)",
            color: "#fff",
          }}
        >
          <Plus size={14} />
          Add Asset
        </button>
      </div>
    </header>
  );
}
