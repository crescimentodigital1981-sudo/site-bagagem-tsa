import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/config";

export const metadata: Metadata = {
  title: "Disclaimer",
  description: `Important travel and TSA information disclaimer for ${SITE_NAME}.`,
};

export default function DisclaimerPage() {
  return (
    <article className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 space-y-4">
      <h1 className="text-3xl font-extrabold text-slate-900">Disclaimer</h1>
      <p className="text-slate-700 leading-relaxed">
        The information provided on {SITE_NAME} is for general informational
        purposes only. While we strive to keep our baggage guides accurate and
        up to date, airport security regulations can change at any time.
      </p>
      <p className="text-slate-700 leading-relaxed">
        {SITE_NAME} is not affiliated with, endorsed by, or connected to the
        Transportation Security Administration (TSA), the Federal Aviation
        Administration (FAA), or any airline.
      </p>
      <p className="text-slate-700 leading-relaxed">
        The final decision on whether an item is allowed through the checkpoint
        always rests with the TSA officer on duty. Always verify critical items
        with your airline and official government sources before traveling.
      </p>
    </article>
  );
}
