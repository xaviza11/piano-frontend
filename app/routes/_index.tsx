import { MetaFunction } from "@remix-run/node";
import SearchSongs from "~/components/SearchSongs";
import { useAlert } from "~/context/AlertContext"; 

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

    { name: "robots", content: "index, follow" }, 
  ];
};


export default function Index() {
  const { showAlert } = useAlert();

  const handlerOpenAlert = () => {
    showAlert("Hello! This is an alert.", "info", true); 
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-16">
        <SearchSongs />
      </div>
    </div>
  );
}
