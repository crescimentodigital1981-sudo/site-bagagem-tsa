import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  allItems,
  getItemBySlug,
  getRelatedItems,
  type TsaStatus,
} from "@/lib/items";
import { SITE_NAME, SITE_URL } from "@/lib/config";

export const dynamicParams = false;

export function generateStaticParams() {
  return allItems.map((item) => ({
    slug: item.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = getItemBySlug(slug);
  if (!item) return {};

  const url = `${SITE_URL}/can-i-bring/${item.slug}`;

  return {
    title: `Can You Bring ${item.name} on a Plane? (TSA Rules)`,
    description: item.shortAnswer,
    alternates: {
      canonical: url,
    },
  };
}

function StatusCard({
  title,
  status,
}: {
  title: string;
  status: TsaStatus;
}) {
  const styles: Record<TsaStatus, { bg: string; badge: string; text: string }> = {
    YES: {
      bg: "bg-emerald-50 border-emerald-200",
      badge: "bg-emerald-600 text-white",
      text: "Allowed",
    },
    LIMITED: {
      bg: "bg-amber-50 border-amber-200",
      badge: "bg-amber-500 text-white",
      text: "Allowed with Restrictions",
    },
    NO: {
      bg: "bg-rose-50 border-rose-200",
      badge: "bg-rose-600 text-white",
      text: "Not Allowed",
    },
  };

  const style = styles[status];

  return (
    <div className={`rounded-xl border p-5 ${style.bg}`}>
      <p className="text-sm font-medium text-slate-600">{title}</p>
      <div className="mt-2 flex items-center gap-2">
        <span className={`px-3 py-1 rounded-full text-sm font-bold ${style.badge}`}>
          {status}
        </span>
        <span className="text-sm font-medium text-slate-800">{style.text}</span>
      </div>
    </div>
  );
}

export default async function ItemPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = getItemBySlug(slug);

  if (!item) {
    notFound();
  }

  const relatedItems = getRelatedItems(item.relatedSlugs);
  const amazonUrl = `https://www.amazon.com/s?k=${encodeURIComponent(
    item.amazonKeyword
  )}`;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: item.category,
        item: `${SITE_URL}/category/${item.categorySlug}`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: item.name,
        item: `${SITE_URL}/can-i-bring/${item.slug}`,
      },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: item.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <article className="space-y-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <nav aria-label="Breadcrumb" className="text-sm text-slate-500 flex flex-wrap gap-1">
        <Link href="/" className="hover:text-slate-900">
          Home
        </Link>
        <span>/</span>
        <Link
          href={`/category/${item.categorySlug}`}
          className="hover:text-slate-900"
        >
          {item.category}
        </Link>
        <span>/</span>
        <span className="text-slate-900 font-medium">{item.name}</span>
      </nav>

      <header className="space-y-3">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Can You Bring {item.name} on a Plane?
        </h1>
        <p className="text-lg text-slate-700 bg-white border border-slate-200 rounded-xl p-4">
          <strong className="text-slate-900">Quick Answer:</strong>{" "}
          {item.shortAnswer}
        </p>
      </header>

      <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <StatusCard title="Carry-On Bag" status={item.carryOnStatus} />
        <StatusCard title="Checked Bag" status={item.checkedStatus} />
      </section>

      {/* Fixed-height AdSense slot (zero CLS) */}
      <div
        aria-label="Advertisement"
        className="w-full h-[250px] bg-slate-100 border border-dashed border-slate-300 rounded-xl flex items-center justify-center text-xs text-slate-400"
      >
        Advertisement
      </div>

      <section className="bg-white border border-slate-200 rounded-xl p-6 space-y-3">
        <h2 className="text-xl font-bold text-slate-900">
          Official TSA Rules for {item.name}
        </h2>
        <p className="text-slate-700 leading-relaxed">{item.tsaRuleDetail}</p>
      </section>

      <section className="bg-blue-50 border border-blue-200 rounded-xl p-6 space-y-4">
        <div className="space-y-2">
          <h2 className="text-xl font-bold text-slate-900">Packing Tip</h2>
          <p className="text-slate-700 leading-relaxed">{item.packingTip}</p>
        </div>
        <div>
          <a
            href={amazonUrl}
            target="_blank"
            rel="nofollow sponsored noopener noreferrer"
            className="inline-flex items-center justify-center rounded-lg bg-amber-400 hover:bg-amber-500 text-slate-950 font-semibold px-5 py-3 text-sm transition shadow-sm"
          >
            Shop TSA-Approved {item.name} Essentials on Amazon →
          </a>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900">
          Frequently Asked Questions
        </h2>
        <div className="space-y-3">
          {item.faqs.map((faq, idx) => (
            <div
              key={idx}
              className="bg-white border border-slate-200 rounded-xl p-5 space-y-1.5"
            >
              <h3 className="font-semibold text-slate-900">{faq.question}</h3>
              <p className="text-sm text-slate-700 leading-relaxed">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </section>

      {relatedItems.length > 0 && (
        <section className="space-y-4 pt-4 border-t border-slate-200">
          <h2 className="text-xl font-bold text-slate-900">
            Related TSA Items
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {relatedItems.map((rel) => (
              <Link
                key={rel.slug}
                href={`/can-i-bring/${rel.slug}`}
                className="bg-white border border-slate-200 rounded-xl p-4 hover:border-blue-400 transition flex items-center justify-between"
              >
                <span className="font-medium text-slate-900">{rel.name}</span>
                <span className="text-xs text-blue-700 font-semibold">
                  View Rules →
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
