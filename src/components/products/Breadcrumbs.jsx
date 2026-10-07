import Link from "next/link";

/** Migas de pan. El último elemento es texto plano: ya estás en él. */
export default function Breadcrumbs({ items, label }) {
  return (
    <nav aria-label={label} className="mb-6">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-gray-500">
        {items.map((item, index) => {
          const last = index === items.length - 1;
          return (
            <li key={item.href ?? item.label} className="flex items-center gap-2">
              {index > 0 && <span aria-hidden="true">›</span>}
              {last || !item.href ? (
                <span className="text-klug-blue font-medium">{item.label}</span>
              ) : (
                <Link href={item.href} className="hover:text-klug-blue transition-colors">
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
