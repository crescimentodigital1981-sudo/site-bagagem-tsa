import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/config";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy Policy for ${SITE_NAME}, including information about cookies, advertising, and affiliate links.`,
};

export default function PrivacyPolicyPage() {
  return (
    <article className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 space-y-4">
      <h1 className="text-3xl font-extrabold text-slate-900">Privacy Policy</h1>
      <p className="text-slate-700 leading-relaxed">
        At {SITE_NAME}, we respect your privacy. We do not collect personally
        identifiable information unless you voluntarily contact us.
      </p>
      <h2 className="text-xl font-bold text-slate-900 pt-2">
        Cookies &amp; Advertising
      </h2>
      <p className="text-slate-700 leading-relaxed">
        We may use third-party advertising partners, such as Google AdSense, to
        serve ads when you visit our website. These partners may use cookies to
        display ads based on your prior visits to this or other websites.
      </p>
      <h2 className="text-xl font-bold text-slate-900 pt-2">Affiliate Links</h2>
      <p className="text-slate-700 leading-relaxed">
        Some links on this site are affiliate links, including links to Amazon.
        If you click on an affiliate link and make a purchase, we may earn a
        small commission at no extra cost to you.
      </p>
    </article>
  );
}
