import { MetaFunction } from "@remix-run/node";
import PianoPlayer from "~/components/PianoPlayer";
import { useTranslation } from "react-i18next";

export const meta: MetaFunction = () => {
  const { t } = useTranslation('seo');

  return [
    { title: t('musicPlayer.title') },
    { name: "description", content: t('musicPlayer.description') },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    { charSet: "utf-8" },
    { name: "author", content: "Mateo Javier Zamora Lorente" },
    { name: "keywords", content: t('musicPlayer.keywords') },
    { property: "og:title", content: t('musicPlayer.ogTitle') },
    { property: "og:description", content: t('musicPlayer.ogDescription') },
    { property: "og:image", content: t('musicPlayer.ogImage') },
    { property: "og:url", content: t('musicPlayer.ogUrl') },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: t('musicPlayer.twitterTitle') },
    { name: "twitter:description", content: t('musicPlayer.twitterDescription') },
    { name: "twitter:image", content: t('musicPlayer.twitterImage') },
    { name: "robots", content: "index, follow" },
  ];
};

export default function Index() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-16">
        <PianoPlayer />
      </div>
    </div>
  );
}
