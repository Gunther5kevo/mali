"use client";

import { useState } from "react";
import {
  ShieldCheck, MapPin, Home, Car,
  GraduationCap, Briefcase, Plane, Sunset, Target, X,
} from "lucide-react";
import type { GoalCategory } from "@/types";

const categories: { value: GoalCategory; label: string; icon: any }[] = [
  { value: "emergency",  label: "Emergency Fund", icon: ShieldCheck   },
  { value: "land",       label: "Buy Land",        icon: MapPin        },
  { value: "home",       label: "Home / Build",    icon: Home          },
  { value: "vehicle",    label: "Vehicle",         icon: Car           },
  { value: "education",  label: "Education",       icon: GraduationCap },
  { value: "business",   label: "Business",        icon: Briefcase     },
  { value: "travel",     label: "Travel",          icon: Plane         },
  { value: "retirement", label: "Retirement",      icon: Sunset        },
  { value: "other",      label: "Other",           icon: Target        },
];

const categoryColors: Record<GoalCategory, string> = {
  emergency:  "var(--mali-emerald-mid)",
  land:       "var(--mali-gold)",
  home:       "#3a5fa0",
  vehicle:    "var(--mali-slate-600)",
  education:  "#7a3fa0",
  business:   "var(--mali-emerald-light)",
  travel:     "#2a7a8a",
  retirement: "var(--mali-gold)",
  other:      "var(--mali-slate-500)",
};

const categoryBg: Record<GoalCategory, string> = {
  emergency:  "var(--mali-emerald-subtle)",
  land:       "var(--mali-gold-muted)",
  home:       "#eff4ff",
  vehicle:    "var(--mali-slate-100)",
  education:  "#f5eeff",
  business:   "var(--mali-emerald-muted)",
  travel:     "#eaf7f9",
  retirement: "var(--mali-gold-muted)",
  other:      "var(--mali-slate-100)",
};

interface AddGoalFormProps {
  onClose: () => void;
}

export default function AddGoalForm({ onClose }: AddGoalFormProps) {
  const [selectedCategory, setSelectedCategory] = useState<GoalCategory | null>(null);
  const [name, setName] = useState("");
  const [targetAmount, setTargetAmount] = useState("");
  const [currentAmount, setCurrentAmount] = useState("");
  const [monthlyContribution, setMonthlyContribution] = useState("");
  const [targetDate, setTargetDate] = useState("");

  // Live projection
  const target  = parseFloat(targetAmount.replace(/,/g, "")) || 0;
  const current = parseFloat(currentAmount.replace(/,/g, "")) || 0;
  const monthly = parseFloat(monthlyContribution.replace(/,/g, "")) || 0;
  const remaining = target - current;
  const monthsNeeded = monthly > 0 ? Math.ceil(remaining / monthly) : null;

  const inputStyle = {
    width: "100%",
    padding: "10px 12px",
    borderRadius: 8,
    border: "1px solid var(--mali-slate-100)",
    fontSize: 13,
    fontFamily: "var(--font-body)",
    color: "var(--mali-slate-900)",
    background: "#fff",
    outline: "none",
  };

  const labelStyle = {
    fontSize: 12,
    fontWeight: 500,
    color: "var(--mali-slate-600)",
    marginBottom: 6,
    display: "block" as const,
    textTransform: "uppercase" as const,
    letterSpacing: "0.5px",
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(15,26,20,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 50,
        padding: 24,
      }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: 16,
          width: "100%",
          maxWidth: 560,
          maxHeight: "90vh",
          overflowY: "auto",
          boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
        }}
      >
        {/* Modal header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "20px 24px",
            borderBottom: "1px solid var(--mali-slate-100)",
          }}
        >
          <div>
            <div style={{ fontSize: 16, fontWeight: 500, color: "var(--mali-slate-900)", fontFamily: "var(--font-display)" }}>
              New Goal
            </div>
            <div style={{ fontSize: 12, color: "var(--mali-slate-400)", marginTop: 2 }}>
              Set a target and start tracking
            </div>
          </div>
          <button
            onClick={onClose}
            style={{ border: "none", background: "none", cursor: "pointer", color: "var(--mali-slate-400)", padding: 4 }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Form body */}
        <div style={{ padding: "24px" }}>

          {/* Category picker */}
          <div style={{ marginBottom: 20 }}>
            <label style={labelStyle}>Goal Type</label>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
              {categories.map((cat) => {
                const Icon = cat.icon;
                const isSelected = selectedCategory === cat.value;
                return (
                  <button
                    key={cat.value}
                    onClick={() => { setSelectedCategory(cat.value); if (!name) setName(cat.label); }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      padding: "10px 12px",
                      borderRadius: 10,
                      border: isSelected ? `1.5px solid ${categoryColors[cat.value]}` : "1.5px solid var(--mali-slate-100)",
                      background: isSelected ? categoryBg[cat.value] : "#fff",
                      cursor: "pointer",
                      fontFamily: "var(--font-body)",
                      fontSize: 12,
                      fontWeight: isSelected ? 500 : 400,
                      color: isSelected ? categoryColors[cat.value] : "var(--mali-slate-600)",
                      transition: "all 0.15s",
                    }}
                  >
                    <Icon size={14} />
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Goal name */}
          <div style={{ marginBottom: 16 }}>
            <label style={labelStyle}>Goal Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Buy land in Kitengela"
              style={inputStyle}
            />
          </div>

          {/* Amounts row */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
            <div>
              <label style={labelStyle}>Target Amount (KES)</label>
              <input
                value={targetAmount}
                onChange={(e) => setTargetAmount(e.target.value)}
                placeholder="e.g. 2,000,000"
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>Already Saved (KES)</label>
              <input
                value={currentAmount}
                onChange={(e) => setCurrentAmount(e.target.value)}
                placeholder="e.g. 500,000"
                style={inputStyle}
              />
            </div>
          </div>

          {/* Contribution + date row */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}>
            <div>
              <label style={labelStyle}>Monthly Contribution (KES)</label>
              <input
                value={monthlyContribution}
                onChange={(e) => setMonthlyContribution(e.target.value)}
                placeholder="e.g. 30,000"
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>Target Date</label>
              <input
                type="date"
                value={targetDate}
                onChange={(e) => setTargetDate(e.target.value)}
                style={inputStyle}
              />
            </div>
          </div>

          {/* Live projection */}
          {monthly > 0 && target > 0 && (
            <div
              style={{
                background: "var(--mali-emerald-subtle)",
                borderRadius: 10,
                padding: "14px 16px",
                marginBottom: 20,
                borderLeft: "3px solid var(--mali-emerald-mid)",
              }}
            >
              <div style={{ fontSize: 12, fontWeight: 500, color: "var(--mali-emerald-mid)", marginBottom: 6 }}>
                Projection
              </div>
              <div style={{ fontSize: 13, color: "var(--mali-slate-600)" }}>
                At <strong style={{ color: "var(--mali-slate-900)" }}>KES {parseInt(monthlyContribution.replace(/,/g,"")).toLocaleString()}/month</strong>,
                you will reach your goal in approximately{" "}
                <strong style={{ color: "var(--mali-slate-900)" }}>
                  {monthsNeeded} month{monthsNeeded !== 1 ? "s" : ""}
                </strong>
                {monthsNeeded && (
                  <> ({Math.floor(monthsNeeded / 12)} yr{monthsNeeded >= 24 ? "s" : ""} {monthsNeeded % 12} mo)</>
                )}.
              </div>
            </div>
          )}

          {/* Actions */}
          <div style={{ display: "flex", gap: 10 }}>
            <button
              onClick={onClose}
              style={{
                flex: 1,
                padding: "11px",
                borderRadius: 8,
                border: "1px solid var(--mali-slate-100)",
                background: "#fff",
                fontSize: 13,
                fontWeight: 500,
                color: "var(--mali-slate-500)",
                cursor: "pointer",
                fontFamily: "var(--font-body)",
              }}
            >
              Cancel
            </button>
            <button
              style={{
                flex: 2,
                padding: "11px",
                borderRadius: 8,
                border: "none",
                background: "var(--mali-emerald)",
                fontSize: 13,
                fontWeight: 500,
                color: "#fff",
                cursor: "pointer",
                fontFamily: "var(--font-body)",
              }}
            >
              Create Goal
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}