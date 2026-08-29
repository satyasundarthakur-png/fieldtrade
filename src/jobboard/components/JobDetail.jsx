import React, { useState } from "react";
import {
  X,
  Plus,
  Camera,
  IndianRupee,
  ArrowRight,
  MessageCircle,
  QrCode,
  Check,
  AlertTriangle,
  ClipboardCheck,
  Package,
} from "lucide-react";
import { STAGES, STAGE_LABEL, TRADES } from "../data/trades";
import { useStore } from "../store";
import SkillSelector from "./SkillSelector";

export default function JobDetail({ jobId, onClose }) {
  const {
    trade,
    jobs,
    moveJob,
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
  } = useStore();
  const t = TRADES[trade];
  const job = jobs.find((j) => j.id === jobId);
  const [matName, setMatName] = useState("");
  const [matQty, setMatQty] = useState("");
  const [matCost, setMatCost] = useState("");

  if (!job) return null;

  const total = job.laborCost + job.materialsTotal + (job.diagnosticFee || 0);
  const stageIdx = STAGES.indexOf(job.stage);
  const nextStage = STAGES[stageIdx + 1];
  const riskTags = job.riskTags || [];
  const checklist = job.checklist || { preJob: {}, completion: {} };

  // Job completion verification is mandatory before Invoiced, per real trade
  // standards (voltage test verified, pressure held, etc.) — not just a status flip.
  const completionItems = t.checklist?.completion || [];
  const completionDone = completionItems.every((item) => checklist.completion?.[item]);
  const gateMove = job.stage === "in-progress" && completionItems.length > 0 && !completionDone;

  const handleAddMaterial = () => {
    if (!matName.trim() || !matQty || !matCost) return;
    addMaterial(job.id, matName.trim(), Number(matQty), Number(matCost));
    setMatName("");
    setMatQty("");
    setMatCost("");
  };

  // Real pattern from Vyapar/Khatabook: share the quote/invoice as a WhatsApp
  // message instead of relying on the client having any app of their own.
  const buildShareText = () => {
    const lines = [
      `*${businessName || "Invoice"}*`,
      `${t.jobLabel}: ${job.title}`,
      `Client: ${job.client}`,
      job.address ? `Address: ${job.address}` : null,
      "",
      ...job.materials.map((m) => `${m.name} — ${m.qty} × ₹${m.unitCost} = ₹${m.qty * m.unitCost}`),
      job.diagnosticFee ? `Diagnostic/visit fee — ₹${job.diagnosticFee}` : null,
      job.laborCost ? `Labor — ₹${job.laborCost}` : null,
      "",
      `*Total: ₹${total.toLocaleString("en-IN")}*`,
      upiId ? `\nPay via UPI: ${upiId}` : null,
    ].filter(Boolean);
    return lines.join("\n");
  };

  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(buildShareText())}`;

  // Real pattern from PhonePe/GPay/Paytm-style UPI deep links: upi://pay intent
  // that opens directly in whichever UPI app the client already has installed.
  const upiUrl = upiId
    ? `upi://pay?pa=${encodeURIComponent(upiId)}&pn=${encodeURIComponent(businessName || "Trade Job Board")}&am=${total}&cu=INR&tn=${encodeURIComponent(job.title)}`
    : null;

  return (
    <div className="fixed inset-0 md:static md:inset-auto z-20 flex justify-end bg-charcoal/40 md:bg-transparent">
      <div className="w-full md:w-[440px] bg-white dark:bg-[#16181D] h-full border-l border-line dark:border-zinc-800 flex flex-col shadow-xl md:shadow-none">
        <div className="px-6 py-5 border-b border-line dark:border-zinc-800 flex items-start justify-between">
          <div>
            <p className="font-mono text-[10px] tracking-[0.15em] uppercase text-safety mb-1">
              {STAGE_LABEL[job.stage]} · {t.jobLabel}
            </p>
            <p className="font-display text-2xl leading-tight text-charcoal dark:text-zinc-100">
              {job.title}
            </p>
            <p className="text-xs text-steel mt-1">
              {job.client} · {job.address}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-steel hover:text-charcoal dark:hover:text-zinc-100"
          >
            <X size={18} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
          {/* Risk & complexity tags — pricing risk, not just labor hours */}
          {t.riskTags?.length > 0 && (
            <div>
              <p className="font-mono text-[10px] tracking-[0.15em] uppercase text-steel mb-2.5 flex items-center gap-1.5">
                <AlertTriangle size={12} /> Risk & complexity
              </p>
              <div className="flex flex-wrap gap-1.5">
                {t.riskTags.map((tag) => {
                  const active = riskTags.includes(tag);
                  return (
                    <button
                      key={tag}
                      onClick={() => toggleRiskTag(job.id, tag)}
                      className={[
                        "text-[11px] border rounded-full px-2.5 py-1 transition-colors",
                        active
                          ? "bg-rose/15 border-rose text-rose"
                          : "bg-boneDim dark:bg-black/30 border-line dark:border-zinc-800 text-charcoal/60 dark:text-zinc-400 hover:border-rose/50",
                      ].join(" ")}
                    >
                      {tag}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Required skills for this specific job — grouped dropdown, distinct
              from the trade's general skill list in the profile panel */}
          {t.skillGroups?.length > 0 && (
            <SkillSelector
              skillGroups={t.skillGroups}
              selectedSkills={job.requiredSkills || []}
              onToggleSkill={(skill) => toggleJobSkill(job.id, skill)}
            />
          )}

          {/* Pre-job safety checklist — shown once scheduled */}
          {job.stage !== "quoted" && t.checklist?.preJob?.length > 0 && (
            <div>
              <p className="font-mono text-[10px] tracking-[0.15em] uppercase text-steel mb-2.5 flex items-center gap-1.5">
                <ClipboardCheck size={12} /> Pre-job safety check
              </p>
              <div className="space-y-1.5">
                {t.checklist.preJob.map((item) => (
                  <label
                    key={item}
                    className="flex items-center gap-2 text-sm text-charcoal/80 dark:text-zinc-300 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={!!checklist.preJob?.[item]}
                      onChange={() => toggleChecklistItem(job.id, "preJob", item)}
                      className="accent-safety w-4 h-4"
                    />
                    {item}
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Completion verification — mandatory before Invoiced */}
          {job.stage === "in-progress" && completionItems.length > 0 && (
            <div>
              <p className="font-mono text-[10px] tracking-[0.15em] uppercase text-steel mb-2.5 flex items-center gap-1.5">
                <ClipboardCheck size={12} /> Completion verification
              </p>
              <div className="space-y-1.5">
                {completionItems.map((item) => (
                  <label
                    key={item}
                    className="flex items-center gap-2 text-sm text-charcoal/80 dark:text-zinc-300 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={!!checklist.completion?.[item]}
                      onChange={() => toggleChecklistItem(job.id, "completion", item)}
                      className="accent-ok w-4 h-4"
                    />
                    {item}
                  </label>
                ))}
              </div>
              {!completionDone && (
                <p className="text-[11px] text-amber mt-1.5">
                  All items must be checked before moving to Invoiced.
                </p>
              )}
            </div>
          )}

          {/* Materials */}
          <div>
            <p className="font-mono text-[10px] tracking-[0.15em] uppercase text-steel mb-2.5">
              Materials ({t.jobUnit})
            </p>
            <div className="space-y-1.5 mb-3">
              {job.materials.map((m) => (
                <div
                  key={m.id}
                  className="flex items-center justify-between text-sm py-1.5 border-b border-boneDim"
                >
                  <span className="text-charcoal dark:text-zinc-100">{m.name}</span>
                  <span className="font-mono text-xs text-steel">
                    {m.qty} × ₹{m.unitCost} = ₹{(m.qty * m.unitCost).toLocaleString("en-IN")}
                  </span>
                </div>
              ))}
              {job.materials.length === 0 && (
                <p className="text-xs text-steel/50">No materials added yet.</p>
              )}
            </div>

            {/* Whole-kit one-tap population — for a standard job, avoid adding
                5-6 items one at a time on a small keyboard */}
            {t.commonKits?.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-2">
                {t.commonKits.map((kit) => (
                  <button
                    key={kit.name}
                    onClick={() => addKit(job.id, kit)}
                    className="text-[11px] bg-charcoal text-bone rounded-full px-2.5 py-1 flex items-center gap-1 hover:bg-charcoalSoft transition-colors"
                  >
                    <Package size={11} /> {kit.name}
                  </button>
                ))}
              </div>
            )}

            {/* One-tap single-item presets — fast-track field quoting */}
            {t.commonMaterials?.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-2.5">
                {t.commonMaterials.map((cm) => (
                  <button
                    key={cm.name}
                    onClick={() => addMaterial(job.id, cm.name, 1, cm.unitCost)}
                    className="text-[11px] bg-boneDim dark:bg-black/30 hover:bg-safety/15 hover:text-safetyDeep border border-line dark:border-zinc-800 rounded-full px-2.5 py-1 text-charcoal/70 dark:text-zinc-400 transition-colors"
                  >
                    + {cm.name} <span className="text-steel">₹{cm.unitCost}</span>
                  </button>
                ))}
              </div>
            )}

            <div className="flex gap-1.5">
              <input
                value={matName}
                onChange={(e) => setMatName(e.target.value)}
                placeholder="Item"
                className="flex-1 border border-line dark:border-zinc-800 dark:bg-[#0d0e11] dark:text-zinc-100 rounded-sm px-2 py-1.5 text-xs focus:border-safety"
              />
              <input
                value={matQty}
                onChange={(e) => setMatQty(e.target.value)}
                placeholder="Qty"
                className="w-14 border border-line dark:border-zinc-800 dark:bg-[#0d0e11] dark:text-zinc-100 rounded-sm px-2 py-1.5 text-xs focus:border-safety"
              />
              <input
                value={matCost}
                onChange={(e) => setMatCost(e.target.value)}
                placeholder="₹/unit"
                className="w-16 border border-line dark:border-zinc-800 dark:bg-[#0d0e11] dark:text-zinc-100 rounded-sm px-2 py-1.5 text-xs focus:border-safety"
              />
              <button
                onClick={handleAddMaterial}
                className="bg-charcoal text-bone px-2.5 rounded-sm"
              >
                <Plus size={14} />
              </button>
            </div>
          </div>

          {/* Diagnostic / visit fee — separate from execution quote, real trade pricing pattern */}
          <div>
            <p className="font-mono text-[10px] tracking-[0.15em] uppercase text-steel mb-2.5">
              Diagnostic / visit fee
            </p>
            <div className="flex items-center gap-2">
              <IndianRupee size={14} className="text-steel" />
              <input
                type="number"
                value={job.diagnosticFee || 0}
                onChange={(e) => setDiagnosticFee(job.id, Number(e.target.value) || 0)}
                className="w-32 border border-line dark:border-zinc-800 dark:bg-[#0d0e11] dark:text-zinc-100 rounded-sm px-2 py-1.5 text-sm focus:border-safety"
              />
              <span className="text-[11px] text-steel/60">
                charged for finding the issue, separate from the fix
              </span>
            </div>
          </div>

          {/* Labor */}
          <div>
            <p className="font-mono text-[10px] tracking-[0.15em] uppercase text-steel mb-2.5">
              Labor cost
            </p>
            {t.laborPresets?.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-2.5">
                {t.laborPresets.map((lp) => (
                  <button
                    key={lp.label}
                    onClick={() => addLaborPreset(job.id, lp.amount)}
                    className="text-[11px] bg-boneDim dark:bg-black/30 hover:bg-safety/15 hover:text-safetyDeep border border-line dark:border-zinc-800 rounded-full px-2.5 py-1 text-charcoal/70 dark:text-zinc-400 transition-colors"
                  >
                    + {lp.label} <span className="text-steel">₹{lp.amount}</span>
                  </button>
                ))}
              </div>
            )}
            <div className="flex items-center gap-2">
              <IndianRupee size={14} className="text-steel" />
              <input
                type="number"
                value={job.laborCost}
                onChange={(e) => setLabor(job.id, Number(e.target.value) || 0)}
                className="w-32 border border-line dark:border-zinc-800 dark:bg-[#0d0e11] dark:text-zinc-100 rounded-sm px-2 py-1.5 text-sm focus:border-safety"
              />
              <span className="text-[11px] text-steel/60">
                tap presets above to add, or edit directly
              </span>
            </div>
          </div>

          {/* Photos placeholder */}
          <div>
            <p className="font-mono text-[10px] tracking-[0.15em] uppercase text-steel mb-2.5">
              Before / after photos
            </p>
            <button className="w-full border-2 border-dashed border-line dark:border-zinc-800 rounded-md py-6 flex flex-col items-center gap-2 text-steel/60 hover:border-safety/50 hover:text-safety transition-colors">
              <Camera size={20} />
              <span className="text-xs">
                {job.photos > 0 ? `${job.photos} photos attached` : "Attach site photos"}
              </span>
            </button>
          </div>

          {/* Total */}
          <div className="bg-boneDim dark:bg-black/30 rounded-md p-4">
            <div className="flex justify-between text-xs text-steel mb-1">
              <span>Materials</span>
              <span>₹{job.materialsTotal.toLocaleString("en-IN")}</span>
            </div>
            {job.diagnosticFee > 0 && (
              <div className="flex justify-between text-xs text-steel mb-1">
                <span>Diagnostic / visit fee</span>
                <span>₹{job.diagnosticFee.toLocaleString("en-IN")}</span>
              </div>
            )}
            <div className="flex justify-between text-xs text-steel mb-2">
              <span>Labor</span>
              <span>₹{job.laborCost.toLocaleString("en-IN")}</span>
            </div>
            <div className="flex justify-between font-display text-xl text-charcoal dark:text-zinc-100 pt-2 border-t border-line dark:border-zinc-800">
              <span>Total</span>
              <span>₹{total.toLocaleString("en-IN")}</span>
            </div>
          </div>

          {/* WhatsApp share + UPI — the real workflow, not a generic "invoice tool" */}
          <div>
            <p className="font-mono text-[10px] tracking-[0.15em] uppercase text-steel mb-2.5">
              Send to client
            </p>
            <div className="flex gap-1.5 mb-2">
              <input
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                placeholder="Your business name"
                className="flex-1 border border-line dark:border-zinc-800 dark:bg-[#0d0e11] dark:text-zinc-100 rounded-sm px-2 py-1.5 text-xs focus:border-safety"
              />
              <input
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
                placeholder="your-upi@bank"
                className="flex-1 border border-line dark:border-zinc-800 dark:bg-[#0d0e11] dark:text-zinc-100 rounded-sm px-2 py-1.5 text-xs focus:border-safety"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 bg-ok text-white rounded-sm py-2 text-xs font-medium hover:opacity-90 transition-opacity"
              >
                <MessageCircle size={14} /> Share on WhatsApp
              </a>
              <a
                href={upiUrl || "#"}
                onClick={(e) => !upiUrl && e.preventDefault()}
                className={[
                  "flex items-center justify-center gap-1.5 rounded-sm py-2 text-xs font-medium transition-opacity",
                  upiUrl
                    ? "bg-charcoal text-bone hover:opacity-90"
                    : "bg-line text-steel/50 cursor-not-allowed",
                ].join(" ")}
              >
                <QrCode size={14} /> Request via UPI
              </a>
            </div>
            {!upiId && (
              <p className="text-[10px] text-steel/50 mt-1.5">
                Add your UPI ID above to enable direct payment requests.
              </p>
            )}

            <button
              onClick={() => markPaid(job.id, !job.paidAt)}
              className={[
                "w-full mt-2 flex items-center justify-center gap-1.5 rounded-sm py-2 text-xs font-medium border transition-colors",
                job.paidAt
                  ? "bg-ok/10 border-ok text-ok"
                  : "bg-white border-line dark:border-zinc-800 text-steel hover:border-ok hover:text-ok",
              ].join(" ")}
            >
              <Check size={14} />
              {job.paidAt
                ? `Paid via UPI · ${new Date(job.paidAt).toLocaleString("en-IN", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}`
                : "Mark as Paid via UPI"}
            </button>
          </div>
        </div>

        <div className="px-6 py-4 border-t border-line dark:border-zinc-800">
          {nextStage ? (
            <button
              onClick={() => !gateMove && moveJob(job.id, nextStage)}
              disabled={gateMove}
              className={[
                "w-full rounded-sm py-2.5 text-sm font-medium flex items-center justify-center gap-2 transition-colors",
                gateMove
                  ? "bg-line text-steel/50 cursor-not-allowed"
                  : "bg-safety text-white hover:bg-safetyDeep",
              ].join(" ")}
            >
              Move to {STAGE_LABEL[nextStage]} <ArrowRight size={15} />
            </button>
          ) : (
            <p className="text-center text-xs text-ok font-medium py-2">Invoiced — job complete</p>
          )}
        </div>
      </div>
    </div>
  );
}
