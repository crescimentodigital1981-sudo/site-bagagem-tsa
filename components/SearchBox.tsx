"use client";

import { useState } from "react";
import Link from "next/link";
import type { TravelItem, TsaStatus } from "@/lib/items";

function StatusBadge({ label, status }: { label: string; status: TsaStatus }) {
  const colors: Record<TsaStatus, string> = {
    YES: "bg-emerald-100 text-emerald-800 border-emerald-200",
    LIMITED: "bg-amber-100 text-amber-800 border-amber-200",
    NO: "bg-rose-100 text-rose-800 border-rose-200",
  };

  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${colors[status]}`}
    >
      {label}: {status}
    </span>
  );
}

export default function SearchBox({ items }: { items: TravelItem[] }) {
  const [query, setQuery] = useState("");

  const trimmed = query.trim().toLowerCase();
  const filtered = trimmed
    ? items.filter(
        (item) =>
          item.name.toLowerCase().includes(trimmed) ||
          item.category.toLowerCase().includes(trimmed)
      )
    : [];

  return (
    <div className="w-full">
      <div className="relative">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search an item (e.g., power bank, shampoo, laptop, razor)..."
          aria-label="Search TSA item rules"
          className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3.5 text-base text-slate-900 shadow-sm focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-200"
        />
      </div>

      {trimmed && (
        <div className="mt-4 space-y-3">
          {filtered.length === 0 ? (
            <p className="text-sm text-slate-600 bg-white border border-slate-200 rounded-xl p-4">
              No items found for &ldquo;{query}&rdquo;. Try another keyword.
            </p>
          ) : (
            filtered.map((item) => (
              <Link
                key={item.slug}
                href={`/can-i-bring/${item.slug}`}
                className="block bg-white border border-slate-200 rounded-xl p-4 hover:border-blue-400 hover:shadow-sm transition"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div>
                    <h3 className="font-semibold text-slate-900">{item.name}</h3>
                    <p className="text-xs text-slate-500">{item.category}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <StatusBadge label="Carry-On" status={item.carryOnStatus} />
                    <StatusBadge label="Checked" status={item.checkedStatus} />
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      )}
    </div>
  );
}
