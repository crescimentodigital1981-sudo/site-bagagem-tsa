import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getAllCategories,
  getItemsByCategory,
  type TsaStatus,
} from "@/lib/items";
import { SITE_NAME, SITE_URL } from "@/lib/config";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllCategories().map((cat) => ({
    categorySlug: cat.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ categorySlug: string }>;
}): Promise<Metadata> {
  const { categorySlug } = await params;
  const items = getItemsByCategory(categorySlug);
  if (items.length === 0) return {};

  const categoryName = items[0].category;
  const url = `${SITE_URL}/category/${categorySlug}`;

  return {
    title: `${categoryName} — TSA Rules for Planes`,
    description: `Check TSA carry-on and checked bag rules for ${categoryName.toLowerCase()} items before you fly.`,
    alternates: {
      canonical: url,
    },
  };
}

function StatusPill({ status }: { status: TsaStatus }) {
  const styles: Record<TsaStatus, string> = {
    YES: "bg-emerald-100 text-emerald-800",
    LIMITED: "bg-amber-100 text-amber-800",
    NO: "bg-rose-100 text-rose-800",
  };

  return (
    <span
      className={`px-2 py-0.5 rounded-full text-xs font-semibold ${styles[status]}`}
    >
      {status}
    </span>
  );
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ categorySlug: string }>;
}) {
  const { categorySlug } = await params;
  const items = getItemsByCategory(categorySlug);

  if (items.length === 0) {
    notFound();
  }

  const categoryName = items[0].category;

  return (
    <div className="space-y-8">
      <nav aria-label="Breadcrumb" className="text-sm text-slate-500">
        <Link href="/" className="hover:text-slate-900">
          Home
        </Link>{" "}
        / <span className="text-slate-900 font-medium">{categoryName}</span>
      </nav>

      <header className="space-y-2">
        <h1 className="text-3xl font-extrabold text-slate-900">
          {categoryName} — TSA Baggage Rules
        </h1>
        <p className="text-slate-600">
          Browse all {items.length} {categoryName.toLowerCase()} items on{" "}
          {SITE_NAME} to see what is allowed in carry-on and checked luggage.
        </p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {items.map((item) => (
          <Link
            key={item.slug}
            href={`/can-i-bring/${item.slug}`}
            className="bg-white border border-slate-200 rounded-xl p-4 hover:border-blue-400 hover:shadow-sm transition space-y-2"
          >
            <h2 className="font-semibold text-slate-900">{item.name}</h2>
            <p className="text-sm text-slate-600 line-clamp-2">
              {item.shortAnswer}
            </p>
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
    </div>
  );
}
