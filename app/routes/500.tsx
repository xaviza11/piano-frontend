// app/routes/500.tsx
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

export default function Error500Page() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white text-center text-black">
      <h1 className="text-6xl font-bold">500</h1>
      <h2 className="text-2xl mt-4">Internal Server Error</h2>
      <p className="mt-2">Something went wrong. Please try again later.</p>
      <a
        href="/"
        className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Go Back Home
      </a>
    </div>
  );
}
