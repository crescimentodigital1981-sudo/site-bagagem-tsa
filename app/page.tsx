import Link from "next/link";
import SearchBox from "@/components/SearchBox";
import { allItems, getAllCategories, type TsaStatus } from "@/lib/items";

function StatusPill({ status }: { status: TsaStatus }) {
  const styles: Record<TsaStatus, string> = {
    YES: "bg-emerald-100 text-emerald-800",
    LIMITED: "bg-amber-100 text-amber-800",
    NO: "bg-rose-100 text-rose-800",
  };

  return (
    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${styles[status]}`}>
      {status}
    </span>
  );
}

export default function HomePage() {
  const categories = getAllCategories();

  return (
    <div className="space-y-12">
      <section className="text-center space-y-4 py-6">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Can I Bring This on a Plane?
        </h1>
        <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
          Check TSA carry-on and checked baggage rules in seconds before you head to the airport.
        </p>
        <div className="max-w-2xl mx-auto pt-2 text-left">
          <SearchBox items={allItems} />
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900">Browse by Category</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/category/${cat.slug}`}
              className="bg-white border border-slate-200 rounded-xl p-4 hover:border-blue-400 hover:shadow-sm transition flex items-center justify-between"
            >
              <span className="font-semibold text-slate-900">{cat.name}</span>
              <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
                {cat.count} {cat.count === 1 ? "item" : "items"}
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900">Popular TSA Items</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {allItems.map((item) => (
            <Link
              key={item.slug}
              href={`/can-i-bring/${item.slug}`}
              className="bg-white border border-slate-200 rounded-xl p-4 hover:border-blue-400 hover:shadow-sm transition space-y-2"
            >
              <div className="flex items-center justify-between gap-2">
                <h3 className="font-semibold text-slate-900">{item.name}</h3>
                <span className="text-xs text-slate-500">{item.category}</span>
              </div>
              <p className="text-sm text-slate-600 line-clamp-2">{item.shortAnswer}</p>
              <div className="flex items-center gap-3 pt-1 text-xs text-slate-700">
                <span className="flex items-center gap-1">
                  Carry-On: <StatusPill status={item.carryOnStatus} />
                </span>
                <span className="flex items-center gap-1">
                  Checked: <StatusPill status={item.checkedStatus} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
