import type { MetaFunction } from "@remix-run/node";
import Piano from "~/components/Piano";
import { useTranslation } from "react-i18next";

export const meta: MetaFunction = () => {
  const { t } = useTranslation('seo');

  return [
    { title: t('piano.title') },
    { name: "description", content: t('piano.description') },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    { charSet: "utf-8" },
    { name: "author", content: "Mateo Javier Zamora Lorente" },
    { name: "keywords", content: t('piano.keywords') },
    { property: "og:title", content: t('piano.ogTitle') },
    { property: "og:description", content: t('piano.ogDescription') },
    { property: "og:image", content: t('piano.ogImage') },
    { property: "og:url", content: t('piano.ogUrl') },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: t('piano.twitterTitle') },
    { name: "twitter:description", content: t('piano.twitterDescription') },
    { name: "twitter:image", content: t('piano.twitterImage') },
    { name: "robots", content: "index, follow" },
  ];
};


export default function Index() {
  const { t } = useTranslation('seo'); 

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-16">
        <Piano />
        <div className="hidden portrait:flex justify-center items-center text-center bg-black text-white p-4 rounded-md fixed top-0 left-0 w-full z-50 h-[100vh] ">
          <h2 className="text-lg font-bold">{t('piano.warning')}</h2>
        </div>
      </div>
    </div>
  );
}
