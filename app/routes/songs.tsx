import type { MetaFunction } from "@remix-run/node";
import SignIn from "~/components/SignIn";
import SongsDisplayer from "~/components/SongsDisplayer"

export const meta: MetaFunction = () => {
  return [
    //{ title: "New Remix App" },  //warn change it whit the language
    //{ name: "description", content: "Welcome to Remix!" },  //warn change it whit the language
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    { charSet: "utf-8" },
    { name: "author", content: "Mateo Javier Zamora Lorente" },
    //{ name: "keywords", content: "music, piano..." }, //warn change it whit the language

    //{property: "og:title", content: "Tittle" },  //warn change it whit the language
    //{ property: "og:description", content: "Description" },  //warn change it whit the language
    { property: "og:image", content: "Image" },
    //{ property: "og:url", content: "URL of the page" },  //warn change it whit the language

    { name: "twitter:card", content: "summary_large_image" }, 
    //{ name: "twitter:title", content: "Tittle" },  //warn change it whit the language
    //{ name: "twitter:description", content: "Description" },  //warn change it whit the language
    { name: "twitter:image", content: "URL of image" },

    { name: "robots", content: "noindex, nofollow" }, 
  ];
};


const exampleSongs = [
    { id: "1", title: "Song One", author: "Author A", tone: "C Major" },
    { id: "2", title: "Song Two", author: "Author B", tone: "D Minor" },
    { id: "3", title: "Song Three", author: "Author C", tone: "G Major" },
    { id: "4", title: "Song Four", author: "Author D", tone: "A Minor" },
    { id: "5", title: "Song Five", author: "Author E", tone: "F Major" },
    { id: "6", title: "Song Six", author: "Author F", tone: "E Minor" },
    { id: "7", title: "Song Seven", author: "Author G", tone: "B Major" },
    { id: "8", title: "Song Eight", author: "Author H", tone: "A Major" },
  ];

export default function Index() {
  return (
    <div className="flex h-screen items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-16">
        <SongsDisplayer songs={exampleSongs} />
      </div>
    </div>
  );
}
