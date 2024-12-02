import type { MetaFunction } from "@remix-run/node";
import SearchSong from "~/components/SearchSongs";
import SongsDisplayer from "~/components/SongsDisplayer";
import { useTranslation } from "react-i18next";

export const meta: MetaFunction = () => {
  const { t } = useTranslation('seo');

  return [
    { title: t('searchPage.title') },
    { name: "description", content: t('searchPage.description') },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    { charSet: "utf-8" },
    { name: "author", content: "Mateo Javier Zamora Lorente" },
    { name: "keywords", content: t('searchPage.keywords') },
    { property: "og:title", content: t('searchPage.ogTitle') },
    { property: "og:description", content: t('searchPage.ogDescription') },
    { property: "og:image", content: t('searchPage.ogImage') },
    { property: "og:url", content: t('searchPage.ogUrl') },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: t('searchPage.twitterTitle') },
    { name: "twitter:description", content: t('searchPage.twitterDescription') },
    { name: "twitter:image", content: t('searchPage.twitterImage') },
    { name: "robots", content: "index, follow" },
  ];
};

export default function Index() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex flex-row items-center gap-16 portrait:flex-col portrait:gap-8 portrait:overflow-x-auto">
        <SearchSong />
        <SongsDisplayer />
      </div>
    </div>
  );
}
