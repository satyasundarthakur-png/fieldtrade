import React from "react";
import { TRADES, TRADE_ORDER } from "../data/trades";
import { useStore } from "../store";

export default function TradeStrip() {
  const { trade, setTrade } = useStore();

  return (
    <div className="bg-charcoal px-4 md:px-8 flex items-center gap-1 overflow-x-auto">
      {TRADE_ORDER.map((key) => {
        const t = TRADES[key];
        const Icon = t.icon;
        const active = key === trade;
        return (
          <button
            key={key}
            onClick={() => setTrade(key)}
            className={[
              "flex items-center gap-2 px-4 py-3.5 border-b-2 shrink-0 transition-colors font-display text-lg tracking-wide uppercase",
              active
                ? "border-safety text-bone"
                : "border-transparent text-bone/40 hover:text-bone/70",
            ].join(" ")}
          >
            <Icon size={15} strokeWidth={2} />
            {t.label}
          </button>
        );
      })}
    </div>
  );
}
