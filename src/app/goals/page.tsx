"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import Topbar from "@/components/layout/Topbar";
import GoalsBanner from "@/components/goals/GoalsBanner";
import GoalCards from "@/components/goals/GoalCards";
import GoalProjections from "@/components/goals/GoalProjections";
import GoalsSummaryTable from "@/components/goals/GoalsSummaryTable";
import AddGoalForm from "@/components/goals/AddGoalForm";

export default function GoalsPage() {
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <Topbar title="Goals & Planning" subtitle="Track progress toward your financial targets" />

      <div className="mali-page-content" style={{ flex: 1, overflowY: "auto", padding: "24px 28px" }}>

        {/* Add goal button row */}
        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 16 }}>
          <button
            onClick={() => setShowForm(true)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              padding: "9px 16px",
              borderRadius: 8,
              border: "none",
              background: "var(--mali-emerald)",
              color: "#fff",
              fontSize: 13,
              fontWeight: 500,
              cursor: "pointer",
              fontFamily: "var(--font-body)",
            }}
          >
            <Plus size={14} />
            New Goal
          </button>
        </div>

        <GoalsBanner />
        <GoalCards />
        <GoalProjections />
        <GoalsSummaryTable />
      </div>

      {showForm && <AddGoalForm onClose={() => setShowForm(false)} />}
    </>
  );
}