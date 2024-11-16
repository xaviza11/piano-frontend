import { MetaFunction } from "@remix-run/node";
import Register from "~/components/Register";
import { useTranslation } from "react-i18next";

export const meta: MetaFunction = () => {
  const { t } = useTranslation('seo');

  return [
    { title: t('registerPage.title') },
    { name: "description", content: t('registerPage.description') },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    { charSet: "utf-8" },
    { name: "author", content: "Mateo Javier Zamora Lorente" },
    { name: "keywords", content: t('registerPage.keywords') },
    { property: "og:title", content: t('registerPage.ogTitle') },
    { property: "og:description", content: t('registerPage.ogDescription') },
    { property: "og:image", content: t('registerPage.ogImage') },
    { property: "og:url", content: t('registerPage.ogUrl') },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: t('registerPage.twitterTitle') },
    { name: "twitter:description", content: t('registerPage.twitterDescription') },
    { name: "twitter:image", content: t('registerPage.twitterImage') },
    { name: "robots", content: "noindex, nofollow" },
  ];
};

export default function Index() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-16">
        <Register />
      </div>
    </div>
  );
}
