import React from "react";
import { X, Brain, Wrench as SkillIcon, ExternalLink } from "lucide-react";
import { TRADES } from "../data/trades";
import { useStore } from "../store";

export default function TradeProfile({ onClose }) {
  const { trade } = useStore();
  const t = TRADES[trade];
  const Icon = t.icon;

  return (
    <div
      className="fixed inset-0 z-30 bg-charcoal/50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-bone max-w-lg w-full max-h-[85vh] overflow-y-auto rounded-md border border-line"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-6 py-5 border-b border-line flex items-start justify-between sticky top-0 bg-bone">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-md bg-charcoal text-safety flex items-center justify-center shrink-0">
              <Icon size={20} />
            </div>
            <p className="font-display text-3xl uppercase tracking-wide text-charcoal">{t.label}</p>
          </div>
          <button onClick={onClose} className="text-steel hover:text-charcoal">
            <X size={18} />
          </button>
        </div>

        <div className="px-6 py-5 space-y-6">
          <div>
            <p className="font-mono text-[10px] tracking-[0.15em] uppercase text-safety mb-2 flex items-center gap-1.5">
              <Brain size={12} /> Mindset & nature
            </p>
            <p className="text-sm text-charcoal/80 leading-relaxed">{t.mindset}</p>
          </div>

          <div>
            <p className="font-mono text-[10px] tracking-[0.15em] uppercase text-safety mb-2 flex items-center gap-1.5">
              <SkillIcon size={12} /> Core skills
            </p>
            <div className="flex flex-wrap gap-1.5">
              {t.skills.map((s) => (
                <span
                  key={s}
                  className="text-xs bg-boneDim border border-line px-2.5 py-1 rounded-full text-charcoal/80"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          <div>
            <p className="font-mono text-[10px] tracking-[0.15em] uppercase text-safety mb-2 flex items-center gap-1.5">
              <ExternalLink size={12} /> Real tools they actually use
            </p>
            <div className="space-y-2">
              {t.realTools.map((tool) => (
                <div
                  key={tool.name}
                  className="flex items-center justify-between text-sm border-b border-boneDim pb-2 last:border-0"
                >
                  <span className="font-medium text-charcoal">{tool.name}</span>
                  <span className="text-xs text-steel text-right">{tool.use}</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-steel/70 mt-3 italic">
              Most independent tradespeople in India stitch together WhatsApp Business (comms),
              Vyapar or Khatabook (money), and Urban Company or word-of-mouth (leads) — rather than
              one unified app. That gap is what the WhatsApp-share and UPI-link features below are
              aimed at.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
