"use client";

import { useState } from "react";
import Topbar from "@/components/layout/Topbar";
import OpportunitiesBanner from "@/components/opportunities/OpportunitiesBanner";
import OpportunitiesFilter, { type FilterState } from "@/components/opportunities/OpportunitiesFilter";
import OpportunityCards from "@/components/opportunities/OpportunityCards";
import ComparisonTable from "@/components/opportunities/ComparisonTable";
import ReturnRiskChart from "@/components/opportunities/ReturnRiskChart";
import { opportunities } from "@/lib/data";

export default function OpportunitiesPage() {
  const [filters, setFilters] = useState<FilterState>({
    type:      "all",
    risk:      "all",
    liquidity: "all",
  });

  const [comparing, setComparing] = useState<string[]>([]);

  const filtered = opportunities.filter((opp) => {
    if (filters.type      !== "all" && opp.type      !== filters.type)      return false;
    if (filters.risk      !== "all" && opp.riskLevel  !== filters.risk)      return false;
    if (filters.liquidity !== "all" && opp.liquidity  !== filters.liquidity) return false;
    return true;
  });

  function toggleCompare(id: string) {
    setComparing((prev) =>
      prev.includes(id)
        ? prev.filter((i) => i !== id)
        : prev.length < 4
        ? [...prev, id]
        : prev
    );
  }

  return (
    <>
      <Topbar title="Opportunities" subtitle="Discover and compare investment options" />

      <div style={{ flex: 1, overflowY: "auto", padding: "24px 28px" }}>

        <OpportunitiesBanner />

        {/* Comparison notice */}
        {comparing.length >= 2 && (
          <div
            style={{
              background: "var(--mali-emerald-subtle)",
              border: "1px solid var(--mali-emerald-muted)",
              borderRadius: 10,
              padding: "11px 16px",
              fontSize: 13,
              color: "var(--mali-emerald-mid)",
              fontWeight: 500,
              marginBottom: 12,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <span>Comparing {comparing.length} opportunities — scroll down to see the table</span>
            <button
              onClick={() => setComparing([])}
              style={{
                fontSize: 12,
                color: "var(--mali-emerald-mid)",
                border: "1px solid var(--mali-emerald-muted)",
                background: "#fff",
                padding: "4px 10px",
                borderRadius: 6,
                cursor: "pointer",
                fontFamily: "var(--font-body)",
                fontWeight: 500,
              }}
            >
              Clear all
            </button>
          </div>
        )}

        <OpportunitiesFilter
          filters={filters}
          onChange={setFilters}
          totalShown={filtered.length}
        />

        <OpportunityCards
          opportunities={filtered}
          comparing={comparing}
          onToggleCompare={toggleCompare}
        />

        {/* Comparison table — only shows when 2+ selected */}
        <ComparisonTable
          comparingIds={comparing}
          onRemove={(id) => setComparing((prev) => prev.filter((i) => i !== id))}
        />

        {/* Return vs Risk scatter */}
        <ReturnRiskChart />

      </div>
    </>
  );
}