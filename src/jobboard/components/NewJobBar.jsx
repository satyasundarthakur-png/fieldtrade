import React, { useState } from "react";
import { Plus } from "lucide-react";
import { TRADES } from "../data/trades";
import { useStore } from "../store";

export default function NewJobBar() {
  const { trade, addJob } = useStore();
  const t = TRADES[trade];
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [client, setClient] = useState("");
  const [address, setAddress] = useState("");

  const handleAdd = () => {
    if (!title.trim() || !client.trim()) return;
    addJob(trade, title.trim(), client.trim(), address.trim());
    setTitle("");
    setClient("");
    setAddress("");
    setOpen(false);
  };

  return (
    <div className="border-b border-line dark:border-zinc-800 px-4 md:px-8 py-3 flex items-center gap-3 flex-wrap">
      {!open ? (
        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-1.5 bg-safety text-white text-sm font-semibold px-4 py-2 rounded-md hover:bg-safetyDeep transition-colors shadow-sm"
        >
          <Plus size={16} strokeWidth={2.5} /> New {t.jobLabel.toLowerCase()}
        </button>
      ) : (
        <>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Job title"
            className="border border-line dark:border-zinc-700 dark:bg-[#16181D] dark:text-zinc-100 rounded-sm px-2.5 py-1.5 text-sm flex-1 min-w-[140px] focus:border-safety"
          />
          <input
            value={client}
            onChange={(e) => setClient(e.target.value)}
            placeholder="Client name"
            className="border border-line dark:border-zinc-700 dark:bg-[#16181D] dark:text-zinc-100 rounded-sm px-2.5 py-1.5 text-sm w-36 focus:border-safety"
          />
          <input
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Address"
            className="border border-line dark:border-zinc-700 dark:bg-[#16181D] dark:text-zinc-100 rounded-sm px-2.5 py-1.5 text-sm w-36 focus:border-safety"
          />
          <button
            onClick={handleAdd}
            className="bg-charcoal text-bone text-sm font-medium px-3 py-1.5 rounded-sm"
          >
            Add
          </button>
          <button onClick={() => setOpen(false)} className="text-steel text-sm">
            Cancel
          </button>
        </>
      )}
    </div>
  );
}
