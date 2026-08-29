import React from "react";
import { Camera, MapPin, IndianRupee } from "lucide-react";
import { STAGES, STAGE_LABEL, TRADES } from "../data/trades";
import { useStore } from "../store";

export default function JobBoard({ onSelect }) {
  const { trade, jobs } = useStore();
  const t = TRADES[trade];
  const grandTotal = jobs.reduce((sum, j) => sum + j.laborCost + j.materialsTotal, 0);

  return (
    <div className="flex-1 min-h-0 overflow-x-auto flex flex-col">
      <div className="px-4 md:px-8 py-2 flex items-center justify-between border-b border-line bg-boneDim/40 shrink-0">
        <span className="text-xs text-steel">
          Billed per <span className="font-medium text-charcoal">{t.jobUnit}</span>
        </span>
        <span className="font-mono text-xs text-charcoal">
          Pipeline value: <span className="font-medium">₹{grandTotal.toLocaleString("en-IN")}</span>
        </span>
      </div>
      <div className="flex h-full min-w-[900px] md:min-w-0">
        {STAGES.map((stage) => {
          const stageJobs = jobs.filter((j) => j.stage === stage);
          return (
            <div
              key={stage}
              className="flex-1 border-r border-line last:border-r-0 flex flex-col min-h-0"
            >
              <div className="px-4 py-3 border-b border-line flex items-center justify-between shrink-0">
                <span className="font-display text-lg uppercase tracking-wide text-charcoal">
                  {STAGE_LABEL[stage]}
                </span>
                <span className="font-mono text-xs text-steel bg-boneDim px-1.5 py-0.5 rounded-sm">
                  {stageJobs.length}
                </span>
              </div>
              <div className="flex-1 overflow-y-auto px-3 py-3 space-y-2.5">
                {stageJobs.map((job) => {
                  const total = job.laborCost + job.materialsTotal;
                  return (
                    <button
                      key={job.id}
                      onClick={() => onSelect(job.id)}
                      className="w-full text-left bg-white border border-line rounded-md p-3.5 hover:border-safety/60 hover:shadow-sm transition-all"
                    >
                      <p className="font-medium text-sm text-charcoal leading-snug mb-1.5">
                        {job.title}
                      </p>
                      <p className="text-xs text-steel mb-0.5">{job.client}</p>
                      <p className="text-xs text-steel/70 flex items-center gap-1 mb-2.5">
                        <MapPin size={10} /> {job.address}
                      </p>
                      <div className="flex items-center justify-between pt-2 border-t border-line/70">
                        <span className="font-mono text-xs font-medium text-charcoal flex items-center">
                          <IndianRupee size={11} className="inline" />
                          {total.toLocaleString("en-IN")}
                        </span>
                        {job.photos > 0 && (
                          <span className="flex items-center gap-1 text-[10px] text-steel">
                            <Camera size={11} /> {job.photos}
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })}
                {stageJobs.length === 0 && (
                  <p className="text-xs text-steel/40 text-center py-6">No jobs</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
