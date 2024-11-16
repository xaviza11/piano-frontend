import type { MetaFunction } from "@remix-run/node";
import SignIn from "~/components/SignIn";
import { useTranslation } from "react-i18next";

export const meta: MetaFunction = () => {
  const { t } = useTranslation('seo');

  return [
    { title: t('signInPage.title') },
    { name: "description", content: t('signInPage.description') },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    { charSet: "utf-8" },
    { name: "author", content: "Mateo Javier Zamora Lorente" },
    { name: "keywords", content: t('signInPage.keywords') },
    { property: "og:title", content: t('signInPage.ogTitle') },
    { property: "og:description", content: t('signInPage.ogDescription') },
    { property: "og:image", content: t('signInPage.ogImage') },
    { property: "og:url", content: t('signInPage.ogUrl') },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: t('signInPage.twitterTitle') },
    { name: "twitter:description", content: t('signInPage.twitterDescription') },
    { name: "twitter:image", content: t('signInPage.twitterImage') },
    { name: "robots", content: "noindex, nofollow" },
  ];
};

export default function Index() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-16">
        <SignIn />
      </div>
    </div>
  );
}
