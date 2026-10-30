import Link from "next/link";
import ClientEditor from "@/components/ClientEditor";
import { DICTS, langPath, resolveLang, type Lang } from "@/lib/i18n";
import { AUTHOR, SITE_URL } from "@/lib/site";

export default async function Home({ params }: PageProps<"/[[...lang]]">) {
  const lang = await resolveLang(params);
  const d = DICTS[lang];
  const other: Lang = lang === "zh" ? "en" : "zh";
  const a = d.article;

  const url = `${SITE_URL}${langPath(lang)}`;
  const author = { "@type": "Person", name: AUTHOR.name };

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: d.siteName,
      alternateName: DICTS[other].siteName,
      url,
      description: d.description,
      inLanguage: d.htmlLang,
      author,
      publisher: author,
    },
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: d.siteName,
      url,
      description: d.description,
      keywords: d.keywords.join(", "),
      author,
      creator: author,
      applicationCategory: "DeveloperApplication",
      operatingSystem: "Any",
      inLanguage: d.htmlLang,
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      featureList: a.features.map((f) => f.title),
    },
    {
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: a.howToTitle,
      inLanguage: d.htmlLang,
      step: a.howTo.map((step, i) => ({
        "@type": "HowToStep",
        position: i + 1,
        name: step.title,
        text: step.body,
        url,
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      inLanguage: d.htmlLang,
      mainEntity: a.faq.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />

      <header className="relative flex h-14 items-center gap-4 bg-ikb px-4 text-cream md:px-6">
        {/* 品牌签名：左上角细沙色横线 */}
        <span aria-hidden className="absolute top-0 left-4 h-1 w-16 bg-sand md:left-6" />
        <h1 className="font-heading text-lg font-semibold tracking-tight">{d.siteName}</h1>
        <p className="hidden truncate font-body text-sm text-cream/75 sm:block">{d.tagline}</p>
        <Link
          href={langPath(other)}
          hrefLang={DICTS[other].htmlLang}
          aria-label={d.switchLangLabel}
          className="ml-auto rounded-md border border-cream/40 px-3 py-1 font-heading text-sm transition-colors hover:border-sand hover:text-sand"
        >
          {d.switchLang}
        </Link>
      </header>

      <main>
        <div className="h-[calc(100dvh-3.5rem)] md:min-h-[520px]">
          <ClientEditor lang={lang} t={d.ui} />
        </div>

        <article className="mx-auto max-w-5xl px-4 py-16 md:px-6 md:py-24">
          <div className="h-0.5 w-16 bg-ikb" />
          <p className="mt-4 font-heading text-xs text-mute lowercase">01 · {a.eyebrow}</p>
          <h2 className="mt-2 font-heading text-2xl font-semibold text-ink md:text-3xl">{a.h2}</h2>
          <p className="mt-4 max-w-3xl font-body text-base leading-relaxed text-ink/85">{a.intro}</p>

          <h2 className="mt-16 font-heading text-xl font-medium text-ink">{a.howToTitle}</h2>
          <ol className="mt-6 grid gap-6 md:grid-cols-3">
            {a.howTo.map((step, i) => (
              <li key={step.title} className="border-l-2 border-ikb pl-4">
                <p className="font-heading text-xs text-mute">step {i + 1}</p>
                <h3 className="mt-1 font-heading text-base font-semibold text-ink">{step.title}</h3>
                <p className="mt-2 font-body text-sm leading-relaxed text-ink/80">{step.body}</p>
              </li>
            ))}
          </ol>

          <h2 className="mt-16 font-heading text-xl font-medium text-ink">{a.diagramsTitle}</h2>
          <dl className="mt-6 grid gap-x-8 gap-y-6 sm:grid-cols-2">
            {a.diagrams.map((dg) => (
              <div key={dg.name}>
                <dt className="font-heading text-base font-medium text-ink">{dg.name}</dt>
                <dd className="mt-1 font-body text-sm leading-relaxed text-ink/80">{dg.body}</dd>
              </div>
            ))}
          </dl>

          <h2 className="mt-16 font-heading text-xl font-medium text-ink">{a.featuresTitle}</h2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {a.features.map((f, i) => (
              <li
                key={f.title}
                className={`rounded-md border-t-4 bg-paper p-6 ${i === 2 ? "border-terracotta" : "border-ikb"}`}
              >
                <p className="font-heading text-xs text-mute">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="mt-2 font-heading text-base font-semibold text-ink">{f.title}</h3>
                <p className="mt-2 font-body text-sm leading-relaxed text-ink/80">{f.body}</p>
              </li>
            ))}
          </ul>

          <h2 className="mt-16 font-heading text-xl font-medium text-ink">{a.faqTitle}</h2>
          <dl className="mt-6 divide-y divide-paper border-y border-paper">
            {a.faq.map((f) => (
              <div key={f.q} className="py-6">
                <dt className="font-heading text-base font-medium text-ink">{f.q}</dt>
                <dd className="mt-2 max-w-3xl font-body leading-relaxed text-ink/80">{f.a}</dd>
              </div>
            ))}
          </dl>
        </article>
      </main>

      <footer className="border-t border-paper px-4 py-8 md:px-6">
        <div className="mx-auto flex max-w-5xl justify-between font-heading text-xs text-mute">
          <span>{a.footer}</span>
          <span>
            © {d.siteName} · {AUTHOR.name}
          </span>
        </div>
      </footer>
    </>
  );
}
