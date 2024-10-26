import type { MetaFunction } from "@remix-run/node";
import Piano from "~/components/Piano";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div className="flex h-screen items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-16">
        <Piano />
      </div>
    </div>
  );
}
