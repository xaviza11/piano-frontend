// app/routes/$*.tsx
import { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    //{ title: "New Remix App" },  //warn change it whit the language
    //{ name: "description", content: "Welcome to Remix!" },  //warn change it whit the language
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    { charSet: "utf-8" },
    { name: "author", content: "Mateo Javier Zamora Lorente" },
    { name: "robots", content: "noindex, nofollow" },
  ];
};


export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white">
      <h2 className="text-2xl font-bold text-black">404</h2>
      <h2 className="text-xl mt-4 text-black">Page Not Found</h2>
      <p className="mt-2 text-gray-800">Sorry, the page you are looking for does not exist.</p>
      <a href="/" className="mt-4 text-blue-500 hover:underline">Go back to the homepage</a>
    </div>
  );
}
