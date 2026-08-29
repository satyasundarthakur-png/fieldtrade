import { TRADES, STAGES } from "./trades";

function buildSeed() {
  const jobs = [];
  let jobId = 1;

  Object.entries(TRADES).forEach(([tradeKey, trade]) => {
    trade.sampleJobs.forEach((sample, i) => {
      const stage = STAGES[i % STAGES.length];
      const materials = trade.materialCategories.slice(0, 2).map((cat, mi) => ({
        id: `m${jobId}${mi}`,
        name: cat,
        qty: [2, 5, 1, 3][mi % 4],
        unitCost: [350, 120, 900, 60][mi % 4],
      }));
      const materialsTotal = materials.reduce((sum, m) => sum + m.qty * m.unitCost, 0);
      const laborCost = [1500, 2500, 3200, 1800][i % 4];

      jobs.push({
        id: `j${jobId++}`,
        trade: tradeKey,
        title: sample.title,
        client: sample.client,
        address: sample.address,
        stage,
        materials,
        laborCost,
        materialsTotal,
        photos: stage === "invoiced" || stage === "in-progress" ? 2 : 0,
        paidAt: stage === "invoiced" ? "2026-08-25T10:00:00.000Z" : null,
        diagnosticFee: 0,
        riskTags: [],
        checklist: { preJob: {}, completion: {} },
        createdAt: "2026-08-2" + ((i % 9) + 1),
      });
    });
  });

  return jobs;
}

export const SEED_JOBS = buildSeed();
