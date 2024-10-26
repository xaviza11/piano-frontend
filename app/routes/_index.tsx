import { useState } from "react";
import type { MetaFunction } from "@remix-run/node";
import SearchSongs from "~/components/SearchSongs";
import Alert from "~/components/Alert";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState<'info' | 'error' | 'warning' | 'info'>("info")
  const [isAlertDismissible, setIsAlertDismissible] = useState(true)

  const handlerOpenAlert = () => { //warn This is only one example for open alert, delete it at create the handler
    setAlertMessage("Hello! This is an alert.");
    setIsAlertVisible(true); 
  };

  return (
    <div className="flex h-screen items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-16">
        {isAlertVisible && (<Alert message={alertMessage} type={alertType} dismissible={isAlertDismissible} onClose={() => setIsAlertVisible(false)}/>)}
        <SearchSongs />
      </div>
    </div>
  );
}
