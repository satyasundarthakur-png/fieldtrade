import React, { createContext, useContext, useState, useCallback } from "react";
import { SEED_JOBS } from "./data/seed";
import { TRADE_ORDER } from "./data/trades";

const StoreContext = createContext(null);

export function StoreProvider({ children }) {
  const [trade, setTrade] = useState(TRADE_ORDER[0]);
  const [jobs, setJobs] = useState(SEED_JOBS);
  const [upiId, setUpiId] = useState("");
  const [businessName, setBusinessName] = useState("");

  const moveJob = useCallback((jobId, newStage) => {
    setJobs((prev) => prev.map((j) => (j.id === jobId ? { ...j, stage: newStage } : j)));
  }, []);

  const addJob = useCallback((tradeKey, title, client, address) => {
    const id = `j${Date.now()}`;
    setJobs((prev) => [
      ...prev,
      {
        id,
        trade: tradeKey,
        title,
        client,
        address,
        stage: "quoted",
        materials: [],
        laborCost: 0,
        materialsTotal: 0,
        photos: 0,
        paidAt: null,
        diagnosticFee: 0,
        riskTags: [],
        checklist: { preJob: {}, completion: {} },
        requiredSkills: [],
        createdAt: new Date().toISOString().slice(0, 10),
      },
    ]);
    return id;
  }, []);

  const addMaterial = useCallback((jobId, name, qty, unitCost) => {
    setJobs((prev) =>
      prev.map((j) => {
        if (j.id !== jobId) return j;
        const existing = j.materials.find((m) => m.name === name && m.unitCost === unitCost);
        const materials = existing
          ? j.materials.map((m) => (m === existing ? { ...m, qty: m.qty + qty } : m))
          : [...j.materials, { id: `m${Date.now()}`, name, qty, unitCost }];
        const materialsTotal = materials.reduce((sum, m) => sum + m.qty * m.unitCost, 0);
        return { ...j, materials, materialsTotal };
      }),
    );
  }, []);

  const addKit = useCallback((jobId, kit) => {
    setJobs((prev) =>
      prev.map((j) => {
        if (j.id !== jobId) return j;
        let materials = [...j.materials];
        kit.items.forEach((item) => {
          const qty = item.qty || 1;
          const existing = materials.find(
            (m) => m.name === item.name && m.unitCost === item.unitCost,
          );
          materials = existing
            ? materials.map((m) => (m === existing ? { ...m, qty: m.qty + qty } : m))
            : [
                ...materials,
                { id: `m${Date.now()}${item.name}`, name: item.name, qty, unitCost: item.unitCost },
              ];
        });
        const materialsTotal = materials.reduce((sum, m) => sum + m.qty * m.unitCost, 0);
        return { ...j, materials, materialsTotal };
      }),
    );
  }, []);

  const addLaborPreset = useCallback((jobId, amount) => {
    setJobs((prev) =>
      prev.map((j) => (j.id === jobId ? { ...j, laborCost: j.laborCost + amount } : j)),
    );
  }, []);

  const setLabor = useCallback((jobId, laborCost) => {
    setJobs((prev) => prev.map((j) => (j.id === jobId ? { ...j, laborCost } : j)));
  }, []);

  const setDiagnosticFee = useCallback((jobId, diagnosticFee) => {
    setJobs((prev) => prev.map((j) => (j.id === jobId ? { ...j, diagnosticFee } : j)));
  }, []);

  const toggleRiskTag = useCallback((jobId, tag) => {
    setJobs((prev) =>
      prev.map((j) => {
        if (j.id !== jobId) return j;
        const riskTags = j.riskTags || [];
        const next = riskTags.includes(tag)
          ? riskTags.filter((t) => t !== tag)
          : [...riskTags, tag];
        return { ...j, riskTags: next };
      }),
    );
  }, []);

  // Checklist items are keyed by their own text (simple, no separate ID scheme
  // needed since a trade's checklist text is stable and unique per stage).
  const toggleChecklistItem = useCallback((jobId, phase, item) => {
    setJobs((prev) =>
      prev.map((j) => {
        if (j.id !== jobId) return j;
        const checklist = j.checklist || { preJob: {}, completion: {} };
        const phaseState = { ...checklist[phase], [item]: !checklist[phase]?.[item] };
        return { ...j, checklist: { ...checklist, [phase]: phaseState } };
      }),
    );
  }, []);

  // Required-skill tagging — what this specific job demands, distinct from
  // the trade's general skill list shown in the profile panel.
  const toggleJobSkill = useCallback((jobId, skill) => {
    setJobs((prev) =>
      prev.map((j) => {
        if (j.id !== jobId) return j;
        const requiredSkills = j.requiredSkills || [];
        const next = requiredSkills.includes(skill)
          ? requiredSkills.filter((s) => s !== skill)
          : [...requiredSkills, skill];
        return { ...j, requiredSkills: next };
      }),
    );
  }, []);

  // Single-tap "paid" toggle — real pattern for closing the loop once a UPI
  // request has been sent, instead of a separate reconciliation step.
  const markPaid = useCallback((jobId, paid) => {
    setJobs((prev) =>
      prev.map((j) =>
        j.id === jobId
          ? {
              ...j,
              paidAt: paid ? new Date().toISOString() : null,
              stage: paid ? "invoiced" : j.stage,
            }
          : j,
      ),
    );
  }, []);

  const value = {
    trade,
    setTrade,
    jobs: jobs.filter((j) => j.trade === trade),
    moveJob,
    addJob,
    addMaterial,
    addKit,
    setLabor,
    addLaborPreset,
    setDiagnosticFee,
    toggleRiskTag,
    toggleChecklistItem,
    toggleJobSkill,
    markPaid,
    upiId,
    setUpiId,
    businessName,
    setBusinessName,
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}
