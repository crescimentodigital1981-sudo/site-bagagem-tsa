import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/config";

export const metadata: Metadata = {
  title: "About Us",
  description: `Learn more about ${SITE_NAME} and how we help travelers check TSA baggage rules.`,
};

export default function AboutPage() {
  return (
    <article className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 space-y-4">
      <h1 className="text-3xl font-extrabold text-slate-900">About {SITE_NAME}</h1>
      <p className="text-slate-700 leading-relaxed">
        {SITE_NAME} is an independent travel resource created to help passengers
        quickly check what items are allowed in carry-on and checked luggage
        before arriving at airport security.
      </p>
      <p className="text-slate-700 leading-relaxed">
        Our guides are organized to give you a fast, clear answer along with
        practical packing tips and common questions based on publicly available
        TSA guidelines.
      </p>
      <p className="text-slate-700 leading-relaxed">
        Please note that we are not affiliated with the Transportation Security
        Administration (TSA) or any airline. Final screening decisions always
        rest with the TSA officer at the checkpoint.
      </p>
    </article>
  );
}
