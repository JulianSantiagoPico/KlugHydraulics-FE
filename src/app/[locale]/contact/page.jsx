import DistributorsMap from "@/components/ui/DistributorsMap";
import PageHeader from "@/components/ui/PageHeader";
import { getDistributors } from "@/data/distributors";
import { locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import { alternates } from "@/lib/metadata";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = getDictionary(locale);
  return {
    title: t.contact.title,
    description: `${t.contact.whereTitle} ${t.contact.emailValue}`,
    alternates: alternates(locale, "/contact"),
  };
}

export default async function ContactPage({ params }) {
  const { locale } = await params;
  const t = getDictionary(locale);

  const details = [
    { label: t.contact.office, value: t.contact.officeValue },
    { label: t.contact.email, value: t.contact.emailValue, href: `mailto:${t.contact.emailValue}` },
    { label: t.contact.phone, value: t.contact.phoneValue, href: `tel:${t.contact.phoneValue.replace(/\s/g, "")}` },
  ];

  return (
    <>
      <PageHeader title={t.contact.title} />

      <DistributorsMap
        theme="light"
        distributors={getDistributors(locale)}
        title={t.contact.whereTitle}
        contactLabel={t.distributors.contact}
      />

      <section className="container mx-auto px-4 pb-20">
        <dl className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {details.map((detail) => (
            <div key={detail.label}>
              <dt className="text-lg font-bold text-klug-navy mb-2">{detail.label}</dt>
              <dd className="text-klug-navy">
                {detail.href ? (
                  <a href={detail.href} className="hover:text-klug-blue transition-colors">
                    {detail.value}
                  </a>
                ) : (
                  detail.value
                )}
              </dd>
            </div>
          ))}
        </dl>
      </section>
    </>
  );
}
