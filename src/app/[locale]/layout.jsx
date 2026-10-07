import { Poppins } from "next/font/google";
import { notFound } from "next/navigation";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingLogos from "@/components/layout/FloatingLogos";
import QuoteModal from "@/components/quote/QuoteModal";
import { QuoteProvider } from "@/components/quote/QuoteProvider";
import { isLocale, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";

import "../globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://klughydraulics.com";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = getDictionary(locale);

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: `${t.meta.siteName} — ${t.meta.tagline}`,
      template: `%s | ${t.meta.siteName}`,
    },
    description: t.meta.defaultDescription,
    alternates: {
      canonical: `/${locale}`,
      languages: Object.fromEntries(locales.map((code) => [code, `/${code}`])),
    },
    openGraph: {
      type: "website",
      siteName: t.meta.siteName,
      title: `${t.meta.siteName} — ${t.meta.tagline}`,
      description: t.meta.defaultDescription,
      locale,
    },
  };
}

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const t = getDictionary(locale);

  return (
    <html lang={locale} className={poppins.variable} suppressHydrationWarning>
      <body className="min-h-screen flex flex-col antialiased" suppressHydrationWarning>
        <QuoteProvider>
          <Header locale={locale} t={t} />
          <main className="flex-grow">{children}</main>
          <Footer locale={locale} t={t} />
          <FloatingLogos />
          <QuoteModal locale={locale} t={t} />
        </QuoteProvider>
      </body>
    </html>
  );
}
