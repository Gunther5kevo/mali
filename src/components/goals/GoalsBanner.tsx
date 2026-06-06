"use client";

import { goals } from "@/lib/data";
import { formatKES } from "@/lib/utils";
import { Target } from "lucide-react";

export default function GoalsBanner() {
  const totalTarget  = goals.reduce((s, g) => s + g.targetAmount, 0);
  const totalSaved   = goals.reduce((s, g) => s + g.currentAmount, 0);
  const totalMonthly = goals.reduce((s, g) => s + g.monthlyContribution, 0);
  const overallPct   = ((totalSaved / totalTarget) * 100).toFixed(1);

  const onTrack   = goals.filter((g) => g.status === "on-track").length;
  const behind    = goals.filter((g) => g.status === "behind").length;
  const completed = goals.filter((g) => g.status === "completed").length;

  return (
    <div
      style={{
        background: "var(--mali-emerald)",
        borderRadius: 16,
        padding: "28px 32px",
        marginBottom: 20,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Rings */}
      <div style={{ position: "absolute", top: -50, right: -50, width: 260, height: 260, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.05)" }} />
      <div style={{ position: "absolute", bottom: -80, right: 80, width: 320, height: 320, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.03)" }} />

      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", position: "relative", zIndex: 1 }}>

        {/* Left */}
        <div>
          <div style={{ fontSize: 11, fontWeight: 500, letterSpacing: "1.5px", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginBottom: 8 }}>
            Goals Overview
          </div>
          <div style={{ fontFamily: "var(--font-display)", fontSize: 44, fontWeight: 500, color: "#fff", letterSpacing: "-1px", lineHeight: 1 }}>
            {formatKES(totalSaved)}
          </div>
          <div style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", marginTop: 8 }}>
            saved of {formatKES(totalTarget)} total target
          </div>

          {/* Overall progress bar */}
          <div style={{ marginTop: 20, width: 420 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
              <span style={{ fontSize: 11, color: "rgba(255,255,255,0.4)" }}>Overall progress</span>
              <span style={{ fontSize: 11, fontWeight: 500, color: "rgba(255,255,255,0.7)" }}>{overallPct}%</span>
            </div>
            <div style={{ height: 6, background: "rgba(255,255,255,0.12)", borderRadius: 3, overflow: "hidden" }}>
              <div
                style={{
                  width: `${overallPct}%`,
                  height: "100%",
                  background: "var(--mali-gold)",
                  borderRadius: 3,
                }}
              />
            </div>
          </div>

          {/* Status pills */}
          <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
            {[
              { label: `${onTrack} On track`,   bg: "rgba(126,232,162,0.12)", color: "#7ee8a2" },
              { label: `${behind} Behind`,       bg: "rgba(244,165,165,0.12)", color: "#f4a5a5" },
              { label: `${completed} Completed`, bg: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.5)" },
            ].map((pill) => (
              <div
                key={pill.label}
                style={{
                  padding: "4px 12px",
                  borderRadius: 20,
                  background: pill.bg,
                  fontSize: 12,
                  fontWeight: 500,
                  color: pill.color,
                }}
              >
                {pill.label}
              </div>
            ))}
          </div>
        </div>

        {/* Right */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px 40px", paddingTop: 4 }}>
          {[
            { label: "Active Goals",       value: String(goals.length),          sub: "Being tracked" },
            { label: "Monthly Committed",  value: formatKES(totalMonthly, true), sub: "Across all goals" },
            { label: "Remaining to Save",  value: formatKES(totalTarget - totalSaved, true), sub: "To reach all targets" },
            { label: "Nearest Goal",       value: "Land – Kitengela",            sub: "63% complete" },
          ].map((s) => (
            <div key={s.label} style={{ textAlign: "right" }}>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginBottom: 4 }}>{s.label}</div>
              <div style={{ fontSize: 17, fontWeight: 500, color: "#fff" }}>{s.value}</div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginTop: 2 }}>{s.sub}</div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}