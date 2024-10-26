import type { MetaFunction } from "@remix-run/node";
import Register from "~/components/Register";

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
        <Register />
      </div>
    </div>
  );
}
