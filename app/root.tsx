// src/App.tsx
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  redirect
} from "@remix-run/react";
import type { LinksFunction, LoaderFunction } from "@remix-run/node";
import Footer from "./components/Footer";
import { manageGuestToken } from "./plugins/manageGuestToken";
import { manageCookiesBanner } from "./plugins/manageCookiesBanner";
import { AlertProvider } from './context/AlertContext';

import "./tailwind.css";
import Navbar from "./components/NavBar";
import CookieConsent from "./components/CookiesBanner";

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export const loader: LoaderFunction = async ({ request }) => {
  const guestTokenResponse = await manageGuestToken(request);

  const url = new URL(request.url);
  if (guestTokenResponse.status !== 200 && url.pathname !== '/500') {
    return redirect("/500"); 
  }

  return {guestTokenResponse} 
};

export function Layout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Navbar />
        {children}
        <CookieConsent />
        <ScrollRestoration />
        <Scripts />
        <Footer />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <AlertProvider>
      <Outlet />
    </AlertProvider>
  );
}
