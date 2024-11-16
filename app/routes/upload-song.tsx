import type { MetaFunction } from "@remix-run/node";
import MidiUploader from "~/components/MidiUploader";
import GenerateSong from "~/components/GenerateSong";
import { useTranslation } from "react-i18next";

export const meta: MetaFunction = () => {
  const { t } = useTranslation('seo');

  return [
    { title: t('midiUploaderPage.title') },
    { name: "description", content: t('midiUploaderPage.description') },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    { charSet: "utf-8" },
    { name: "author", content: "Mateo Javier Zamora Lorente" },
    { name: "keywords", content: t('midiUploaderPage.keywords') },
    { property: "og:title", content: t('midiUploaderPage.ogTitle') },
    { property: "og:description", content: t('midiUploaderPage.ogDescription') },
    { property: "og:image", content: t('midiUploaderPage.ogImage') },
    { property: "og:url", content: t('midiUploaderPage.ogUrl') },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: t('midiUploaderPage.twitterTitle') },
    { name: "twitter:description", content: t('midiUploaderPage.twitterDescription') },
    { name: "twitter:image", content: t('midiUploaderPage.twitterImage') },
    { name: "robots", content: "index, follow" },
  ];
};

export default function Index() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex justify-center items-center gap-16">
        <MidiUploader />
        <GenerateSong />
      </div>
    </div>
  );
}
