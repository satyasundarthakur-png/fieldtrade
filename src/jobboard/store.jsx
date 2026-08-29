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

  const addLaborPreset = useCallback((jobId, amount) => {
    setJobs((prev) =>
      prev.map((j) => (j.id === jobId ? { ...j, laborCost: j.laborCost + amount } : j)),
    );
  }, []);

  const setLabor = useCallback((jobId, laborCost) => {
    setJobs((prev) => prev.map((j) => (j.id === jobId ? { ...j, laborCost } : j)));
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
    setLabor,
    addLaborPreset,
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
