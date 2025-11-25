// components/LinksList.js
export default function LinksList({ links = [] }) {
  const safeLinks = [];

  // for…of + if: filtrado manual para ejemplificar control de flujo
  for (const link of links) {
    if (link && typeof link.name === "string" && typeof link.href === "string") {
      safeLinks.push(link);
    }
  }

  return (
    <div className="grid grid-cols-1 gap-x-8 gap-y-6 text-base/7 font-semibold text-white sm:grid-cols-2 md:flex lg:gap-x-10">
      {safeLinks.map((l) => (
        <a key={l.name} href={l.href} className="hover:underline">
          {l.name} <span aria-hidden="true">→</span>
        </a>
      ))}
    </div>
  );
}