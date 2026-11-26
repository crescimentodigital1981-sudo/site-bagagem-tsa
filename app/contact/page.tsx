import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/config";

export const metadata: Metadata = {
  title: "Contact Us",
  description: `Get in touch with the ${SITE_NAME} team for questions, corrections, or item requests.`,
};

export default function ContactPage() {
  return (
    <article className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 space-y-4">
      <h1 className="text-3xl font-extrabold text-slate-900">Contact Us</h1>
      <p className="text-slate-700 leading-relaxed">
        Have a question about a specific item, noticed a rule update, or want to
        suggest a new TSA guide for {SITE_NAME}? We would love to hear from you.
      </p>
      <p className="text-slate-700 leading-relaxed">
        You can reach our editorial team by email at:{" "}
        <a
          href="mailto:contact@example.com"
          className="text-blue-700 font-semibold hover:underline"
        >
          contact@example.com
        </a>
      </p>
      <p className="text-sm text-slate-500 pt-2">
        Please note that we cannot answer urgent flight-specific questions or
        override airport security decisions. For immediate travel assistance,
        contact your airline or the TSA directly.
      </p>
    </article>
  );
}
