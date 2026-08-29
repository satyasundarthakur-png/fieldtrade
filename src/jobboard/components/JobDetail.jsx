import React, { useState } from "react";
import { X, Plus, Camera, IndianRupee, ArrowRight, MessageCircle, QrCode } from "lucide-react";
import { STAGES, STAGE_LABEL, TRADES } from "../data/trades";
import { useStore } from "../store";

export default function JobDetail({ jobId, onClose }) {
  const {
    trade,
    jobs,
    moveJob,
    addMaterial,
    setLabor,
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

  const total = job.laborCost + job.materialsTotal;
  const stageIdx = STAGES.indexOf(job.stage);
  const nextStage = STAGES[stageIdx + 1];

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
      <div className="w-full md:w-[440px] bg-white h-full border-l border-line flex flex-col shadow-xl md:shadow-none">
        <div className="px-6 py-5 border-b border-line flex items-start justify-between">
          <div>
            <p className="font-mono text-[10px] tracking-[0.15em] uppercase text-safety mb-1">
              {STAGE_LABEL[job.stage]} · {t.jobLabel}
            </p>
            <p className="font-display text-2xl leading-tight text-charcoal">{job.title}</p>
            <p className="text-xs text-steel mt-1">
              {job.client} · {job.address}
            </p>
          </div>
          <button onClick={onClose} className="text-steel hover:text-charcoal">
            <X size={18} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
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
                  <span className="text-charcoal">{m.name}</span>
                  <span className="font-mono text-xs text-steel">
                    {m.qty} × ₹{m.unitCost} = ₹{(m.qty * m.unitCost).toLocaleString("en-IN")}
                  </span>
                </div>
              ))}
              {job.materials.length === 0 && (
                <p className="text-xs text-steel/50">No materials added yet.</p>
              )}
            </div>
            <div className="flex gap-1.5">
              <input
                value={matName}
                onChange={(e) => setMatName(e.target.value)}
                placeholder="Item"
                className="flex-1 border border-line rounded-sm px-2 py-1.5 text-xs focus:border-safety"
              />
              <input
                value={matQty}
                onChange={(e) => setMatQty(e.target.value)}
                placeholder="Qty"
                className="w-14 border border-line rounded-sm px-2 py-1.5 text-xs focus:border-safety"
              />
              <input
                value={matCost}
                onChange={(e) => setMatCost(e.target.value)}
                placeholder="₹/unit"
                className="w-16 border border-line rounded-sm px-2 py-1.5 text-xs focus:border-safety"
              />
              <button
                onClick={handleAddMaterial}
                className="bg-charcoal text-bone px-2.5 rounded-sm"
              >
                <Plus size={14} />
              </button>
            </div>
          </div>

          {/* Labor */}
          <div>
            <p className="font-mono text-[10px] tracking-[0.15em] uppercase text-steel mb-2.5">
              Labor cost
            </p>
            <div className="flex items-center gap-2">
              <IndianRupee size={14} className="text-steel" />
              <input
                type="number"
                value={job.laborCost}
                onChange={(e) => setLabor(job.id, Number(e.target.value) || 0)}
                className="w-32 border border-line rounded-sm px-2 py-1.5 text-sm focus:border-safety"
              />
            </div>
          </div>

          {/* Photos placeholder */}
          <div>
            <p className="font-mono text-[10px] tracking-[0.15em] uppercase text-steel mb-2.5">
              Before / after photos
            </p>
            <button className="w-full border-2 border-dashed border-line rounded-md py-6 flex flex-col items-center gap-2 text-steel/60 hover:border-safety/50 hover:text-safety transition-colors">
              <Camera size={20} />
              <span className="text-xs">
                {job.photos > 0 ? `${job.photos} photos attached` : "Attach site photos"}
              </span>
            </button>
          </div>

          {/* Total */}
          <div className="bg-boneDim rounded-md p-4">
            <div className="flex justify-between text-xs text-steel mb-1">
              <span>Materials</span>
              <span>₹{job.materialsTotal.toLocaleString("en-IN")}</span>
            </div>
            <div className="flex justify-between text-xs text-steel mb-2">
              <span>Labor</span>
              <span>₹{job.laborCost.toLocaleString("en-IN")}</span>
            </div>
            <div className="flex justify-between font-display text-xl text-charcoal pt-2 border-t border-line">
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
                className="flex-1 border border-line rounded-sm px-2 py-1.5 text-xs focus:border-safety"
              />
              <input
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
                placeholder="your-upi@bank"
                className="flex-1 border border-line rounded-sm px-2 py-1.5 text-xs focus:border-safety"
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
          </div>
        </div>

        <div className="px-6 py-4 border-t border-line">
          {nextStage ? (
            <button
              onClick={() => moveJob(job.id, nextStage)}
              className="w-full bg-safety text-white rounded-sm py-2.5 text-sm font-medium flex items-center justify-center gap-2 hover:bg-safetyDeep transition-colors"
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
