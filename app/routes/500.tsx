// app/routes/500.tsx
import { MetaFunction } from "@remix-run/node";
import { useTranslation } from "react-i18next";

export const meta: MetaFunction = () => {
  const { t } = useTranslation('seo');

  return [
    { title: t('serverDown.title') },
    { name: "description", content: t('serverDown.description') },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    { charSet: "utf-8" },
    { name: "author", content: "Mateo Javier Zamora Lorente" },
    { name: "robots", content: "noindex, nofollow" },
    { property: "og:title", content: t('serverDown.ogTitle') },
    { property: "og:description", content: t('serverDown.ogDescription') },
    { property: "og:image", content: t('serverDown.ogImage') },
    { property: "og:url", content: t('serverDown.ogUrl') },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: t('serverDown.twitterTitle') },
    { name: "twitter:description", content: t('serverDown.twitterDescription') },
    { name: "twitter:image", content: t('serverDown.twitterImage') }
  ];
};

export default function Error500Page() {

  const {t} = useTranslation('translation')

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white text-center text-black bg-white">
      <h1 className="text-6xl font-bold">500</h1>
      <h2 className="text-2xl mt-4">{t('serverDown.error')}</h2>
      <p className="mt-2">{t('serverDown.text')}</p>
      <a
        href="/"
        className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        {t('serverDown.back')}
      </a>
    </div>
  );
}
