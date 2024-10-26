// app/routes/$*.tsx
import { MetaFunction } from "@remix-run/node";
import NotFound from "~/components/NotFound";

export const meta: MetaFunction = () => {
  return [
    { title: "404 - Página no encontrada" },
    { name: "description", content: "Página no encontrada" },
  ];
};

export default function NotFoundPage() {
  return <NotFound />;
}
