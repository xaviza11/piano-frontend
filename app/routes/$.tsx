// app/routes/$*.tsx
import { MetaFunction } from "@remix-run/node";
import { useTranslation } from "react-i18next";

export const meta: MetaFunction = () => {

  const {t} = useTranslation('seo')

  return [
    { title: t('notFound.title') },
    { name: "description", content: t('notFound.description') },
    { name: "keywords", content: t('notFound.keywords') },
    { property: "og:title", content: t('notFound.ogTitle') },
    { property: "og:description", content: t('notFound.ogDescription') },
    { property: "og:image", content: t('notFound.ogImage') },
    { property: "og:url", content: t('notFound.ogUrl') },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: t('notFound.twitterTitle') },
    { name: "twitter:description", content: t('notFound.twitterDescription') },
    { name: "twitter:image", content: t('notFound.twitterImage') },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    { charSet: "utf-8" },
    { name: "author", content: "Mateo Javier Zamora Lorente" },
    { name: "robots", content: "noindex, nofollow" },
  ];
};


export default function NotFoundPage() {

  const {t} = useTranslation('translation')

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white">
      <h2 className="text-2xl font-bold text-black">404</h2>
      <h2 className="text-xl mt-4 text-black">{t('notFound.error')}</h2>
      <p className="mt-2 text-gray-800">{t('notFound.text')}</p>
      <a
        href="/"
        className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        {t('notFound.back')}
      </a>
    </div>
  );
}
