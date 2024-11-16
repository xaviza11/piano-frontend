import { MetaFunction } from "@remix-run/node";
import SearchSongs from "~/components/SearchSongs";
import { useAlert } from "~/context/AlertContext";
import { useTranslation } from "react-i18next";

export const meta: MetaFunction = () => {

  const {t} = useTranslation('seo')

  return [
    { title: t('index.title') },  
    { name: "description", content: t('index.description') },  
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    { charSet: "utf-8" },
    { name: "author", content: "Mateo Javier Zamora Lorente" },
    { name: "keywords", content: t('index.keywords') }, 

    { property: "og:title", content: t('index.ogTitle') },
    { property: "og:description", content: t('index.ogDescription') },
    { property: "og:image", content: t('index.ogImage') },
    { property: "og:url", content: t('index.ogUrl') },

    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: t('index.twitterTitle') },
    { name: "twitter:description", content: t('index.twitterDescription') },
    { name: "twitter:image", content: t('index.twitterImage') },

    { name: "robots", content: "index, follow" },
  ];
};


export default function Index() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-16">
        <SearchSongs />
      </div>
    </div>
  );
}
