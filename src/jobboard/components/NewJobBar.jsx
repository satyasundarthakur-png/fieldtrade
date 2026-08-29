import React, { useRef, useState } from "react";
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
  const clientInputRef = useRef(null);

  const handleAdd = () => {
    if (!title.trim() || !client.trim()) return;
    addJob(trade, title.trim(), client.trim(), address.trim());
    setTitle("");
    setClient("");
    setAddress("");
    setOpen(false);
  };

  // Speed-first entry: picking a sub-service opens the form with the title
  // already filled in, so the only typing left is the client name.
  const handleSelectSubdivision = (e) => {
    const jobType = e.target.value;
    e.target.value = "";
    if (!jobType) return;
    setTitle(jobType);
    setOpen(true);
    setTimeout(() => clientInputRef.current?.focus(), 0);
  };

  return (
    <div className="border-b border-line dark:border-zinc-800 px-4 md:px-8 py-3 flex items-center gap-2 flex-wrap">
      {!open ? (
        <>
          <button
            onClick={() => setOpen(true)}
            className="flex items-center gap-1.5 bg-safety text-white text-sm font-semibold px-4 py-2 rounded-md hover:bg-safetyDeep transition-colors shadow-sm"
          >
            <Plus size={16} strokeWidth={2.5} /> New {t.jobLabel.toLowerCase()}
          </button>

          {t.subdivisions?.length > 0 && (
            <select
              value=""
              onChange={handleSelectSubdivision}
              className="bg-white dark:bg-[#16181D] text-charcoal dark:text-zinc-200 border border-line dark:border-zinc-700 font-mono text-xs rounded-md px-3 py-2 outline-none focus:border-safety transition-colors cursor-pointer max-w-[220px]"
            >
              <option value="">Quick add by job type…</option>
              {t.subdivisions.map((group) => (
                <optgroup key={group.category} label={group.category}>
                  {group.items.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
          )}
        </>
      ) : (
        <>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Job title"
            className="border border-line dark:border-zinc-700 dark:bg-[#16181D] dark:text-zinc-100 rounded-sm px-2.5 py-1.5 text-sm flex-1 min-w-[140px] focus:border-safety"
          />
          <input
            ref={clientInputRef}
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
          <button
            onClick={() => {
              setOpen(false);
              setTitle("");
            }}
            className="text-steel text-sm"
          >
            Cancel
          </button>
        </>
      )}
    </div>
  );
}
