import React from "react";

/**
 * FilterBar - I have added pill-style filter for tasks
 *
 * Props:
 *  - value: "All" | "Completed" | "Pending"
 *  - onChange: (newValue) => void
 *  - counts: { all: number, completed: number, pending: number }
 */
export default function FilterBar({
  value = "All",
  onChange,
  counts = { all: 0, completed: 0, pending: 0 },
}) {
  const items = [
    { key: "All", label: `All (${counts.all})` },
    { key: "Completed", label: `Completed (${counts.completed})` },
    { key: "Pending", label: `Pending (${counts.pending})` },
  ];

  return (
    <div className="flex flex-wrap items-center gap-2">
      {items.map((it) => {
        const active = value === it.key;
        return (
          <button
            key={it.key}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(it.key)}
            className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm transition-colors duration-150 focus:outline-none
              ${
                active
                  ? "bg-[#6B705C] text-white shadow-sm"
                  : "bg-white border border-gray-200 text-slate-700 hover:bg-gray-50"
              }`}
          >
            <span className="select-none">{it.label}</span>
          </button>
        );
      })}
    </div>
  );
}
