import React from "react";
import { Camera, MapPin, IndianRupee, AlertTriangle, User, ShieldCheck } from "lucide-react";
import { STAGES, STAGE_LABEL, TRADES } from "../data/trades";
import { useStore } from "../store";

export default function JobBoard({ onSelect }) {
  const { trade, jobs } = useStore();
  const t = TRADES[trade];
  const grandTotal = jobs.reduce(
    (sum, j) => sum + j.laborCost + j.materialsTotal + (j.diagnosticFee || 0),
    0,
  );

  return (
    <div className="flex-1 min-h-0 overflow-x-auto flex flex-col">
      <div className="px-4 md:px-8 py-2.5 flex items-center justify-between border-b border-line dark:border-zinc-800 bg-boneDim dark:bg-[#16181D] shrink-0">
        <span className="text-xs font-medium text-charcoal/70 dark:text-zinc-400">
          Billed per{" "}
          <span className="font-semibold text-charcoal dark:text-zinc-100">{t.jobUnit}</span>
        </span>
        <span className="font-mono text-xs text-charcoal dark:text-zinc-400">
          Pipeline value:{" "}
          <span className="font-bold text-safetyDeep dark:text-safety">
            ₹{grandTotal.toLocaleString("en-IN")}
          </span>
        </span>
      </div>
      <div className="flex h-full min-w-[900px] md:min-w-0">
        {STAGES.map((stage) => {
          const stageJobs = jobs.filter((j) => j.stage === stage);
          return (
            <div
              key={stage}
              className="flex-1 border-r border-line dark:border-zinc-800 last:border-r-0 flex flex-col min-h-0 bg-boneDim/50 dark:bg-[#0d0e11]"
            >
              <div className="px-4 py-3 border-b-2 border-charcoal/15 dark:border-zinc-800 flex items-center justify-between shrink-0 bg-boneDim dark:bg-[#16181D]">
                <span className="font-display text-lg uppercase tracking-wide text-charcoal dark:text-zinc-100 font-semibold">
                  {STAGE_LABEL[stage]}
                </span>
                <span className="font-mono text-xs font-semibold text-bone bg-charcoal dark:bg-safety dark:text-black px-2 py-0.5 rounded-full min-w-[22px] text-center">
                  {stageJobs.length}
                </span>
              </div>
              <div className="flex-1 overflow-y-auto px-3 py-3 space-y-2.5">
                {stageJobs.map((job) => {
                  const total = job.laborCost + job.materialsTotal + (job.diagnosticFee || 0);
                  const riskTags = job.riskTags || [];
                  const skills = job.requiredSkills || [];
                  const preJobItems = t.checklist?.preJob || [];
                  const preJobDone = preJobItems.filter((i) => job.checklist?.preJob?.[i]).length;
                  const hasPreJob = preJobItems.length > 0 && stage !== "quoted";

                  return (
                    <button
                      key={job.id}
                      onClick={() => onSelect(job.id)}
                      className="w-full text-left bg-white dark:bg-[#16181D] border border-line dark:border-zinc-800 rounded-md p-3.5 shadow-[0_1px_2px_rgba(23,23,23,0.06)] dark:shadow-none hover:border-safety hover:shadow-[0_2px_8px_rgba(23,23,23,0.12)] dark:hover:border-safety/60 transition-all"
                    >
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <p className="font-semibold text-[15px] text-charcoal dark:text-zinc-100 leading-snug">
                          {job.title}
                        </p>
                        {riskTags.length > 0 && (
                          <span
                            className="flex items-center gap-0.5 text-[10px] font-mono font-semibold text-rose bg-rose/10 border border-rose/30 px-1.5 py-0.5 rounded shrink-0"
                            title={riskTags.join(", ")}
                          >
                            <AlertTriangle size={11} /> {riskTags.length}
                          </span>
                        )}
                      </div>
                      <p className="text-xs font-medium text-charcoal/70 dark:text-zinc-400 mb-1 flex items-center gap-1">
                        <User size={11} className="text-steel dark:text-zinc-500" /> {job.client}
                      </p>
                      <p className="text-xs text-steel dark:text-zinc-500 flex items-center gap-1 mb-2.5">
                        <MapPin size={11} /> {job.address}
                      </p>

                      {/* Real technical scope — required skills for this job, not decoration */}
                      {skills.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-2.5">
                          {skills.slice(0, 3).map((skill) => (
                            <span
                              key={skill}
                              className="text-[10px] font-mono bg-boneDim dark:bg-black/40 text-steel dark:text-zinc-400 px-1.5 py-0.5 rounded border border-line dark:border-zinc-700"
                            >
                              {skill}
                            </span>
                          ))}
                          {skills.length > 3 && (
                            <span className="text-[10px] font-mono text-steel dark:text-zinc-500 px-1 py-0.5">
                              +{skills.length - 3}
                            </span>
                          )}
                        </div>
                      )}

                      {/* Real pre-job safety check status, not a fabricated "verified" pulse */}
                      {hasPreJob && (
                        <div className="flex items-center gap-1.5 mb-2.5 text-[11px]">
                          <ShieldCheck
                            size={12}
                            className={
                              preJobDone === preJobItems.length
                                ? "text-ok"
                                : "text-amber dark:text-amber"
                            }
                          />
                          <span
                            className={
                              preJobDone === preJobItems.length
                                ? "text-ok font-medium"
                                : "text-steel dark:text-zinc-400"
                            }
                          >
                            Safety check: {preJobDone}/{preJobItems.length}
                          </span>
                        </div>
                      )}

                      <div className="flex items-center justify-between pt-2.5 border-t border-line dark:border-zinc-800">
                        <span className="font-mono text-base font-bold text-charcoal dark:text-zinc-100 flex items-center">
                          <IndianRupee size={14} className="inline" strokeWidth={2.5} />
                          {total.toLocaleString("en-IN")}
                        </span>
                        {job.photos > 0 && (
                          <span className="flex items-center gap-1 text-[11px] font-medium bg-boneDim dark:bg-black/40 text-steel dark:text-zinc-400 px-1.5 py-0.5 rounded-sm border border-line dark:border-zinc-700">
                            <Camera size={12} /> {job.photos}
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })}
                {stageJobs.length === 0 && (
                  <p className="text-xs text-steel/40 dark:text-zinc-600 text-center py-6">
                    No jobs
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
