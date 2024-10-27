import { MetaFunction } from "@remix-run/node";
import SearchSongs from "~/components/SearchSongs";
import { useAlert } from "~/context/AlertContext"; // Asegúrate de que la ruta sea correcta

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  const { showAlert } = useAlert();

  const handlerOpenAlert = () => {
    showAlert("Hello! This is an alert.", "info", true); 
  };

  return (
    <div className="flex h-screen items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-16">
        <SearchSongs />
      </div>
    </div>
  );
}
