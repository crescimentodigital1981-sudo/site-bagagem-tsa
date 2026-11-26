import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { SITE_NAME, SITE_URL } from "@/lib/config";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — TSA Carry-On & Checked Bag Rules`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Quickly check what you can bring on a plane in your carry-on or checked luggage under current TSA rules.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col antialiased">
        <header className="bg-white border-b border-slate-200">
          <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
            <Link
              href="/"
              className="text-xl font-bold text-slate-900 tracking-tight hover:text-blue-700"
            >
              ✈️ {SITE_NAME}
            </Link>
            <nav className="flex items-center gap-4 text-sm font-medium text-slate-600">
              <Link href="/" className="hover:text-slate-900">
                Search
              </Link>
              <Link href="/about" className="hover:text-slate-900">
                About
              </Link>
              <Link href="/contact" className="hover:text-slate-900">
                Contact
              </Link>
            </nav>
          </div>
        </header>

        <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-8">
          {children}
        </main>

        <footer className="bg-white border-t border-slate-200 mt-12">
          <div className="max-w-4xl mx-auto px-4 py-6 text-sm text-slate-600 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p>© {new Date().getFullYear()} {SITE_NAME}. All rights reserved.</p>
            <div className="flex flex-wrap items-center gap-4">
              <Link href="/about" className="hover:text-slate-900">
                About
              </Link>
              <Link href="/privacy-policy" className="hover:text-slate-900">
                Privacy Policy
              </Link>
              <Link href="/disclaimer" className="hover:text-slate-900">
                Disclaimer
              </Link>
              <Link href="/contact" className="hover:text-slate-900">
                Contact
              </Link>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
