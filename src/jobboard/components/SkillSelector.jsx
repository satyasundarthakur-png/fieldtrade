import React from "react";
import { X } from "lucide-react";

// Lets a tradesperson tag which specific skills a job demands, grouped by
// category (diagnostics vs. execution, etc.) — distinct from the trade-wide
// skill list shown in the "About this trade" panel. Useful for jobs handed
// off to a helper/apprentice who needs to know exactly what's required.
export default function SkillSelector({ skillGroups, selectedSkills, onToggleSkill }) {
  if (!skillGroups?.length) return null;

  const handleSelect = (e) => {
    const skill = e.target.value;
    if (skill) onToggleSkill(skill);
    e.target.value = "";
  };

  return (
    <div>
      <p className="font-mono text-[10px] tracking-[0.15em] uppercase text-steel mb-2.5">
        Required skills for this job
      </p>
      <select
        onChange={handleSelect}
        value=""
        className="w-full border border-line rounded-sm px-2 py-1.5 text-xs bg-white focus:border-safety mb-2"
      >
        <option value="">+ Add skill requirement</option>
        {skillGroups.map((group) => (
          <optgroup key={group.category} label={group.category}>
            {group.skills.map((skill) => (
              <option key={skill} value={skill}>
                {skill}
              </option>
            ))}
          </optgroup>
        ))}
      </select>

      {selectedSkills?.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {selectedSkills.map((skill) => (
            <span
              key={skill}
              className="flex items-center gap-1 text-[11px] bg-safety/10 text-safetyDeep border border-safety/30 px-2 py-1 rounded-full"
            >
              {skill}
              <button
                onClick={() => onToggleSkill(skill)}
                className="hover:text-rose"
                aria-label={`Remove ${skill}`}
              >
                <X size={11} />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
