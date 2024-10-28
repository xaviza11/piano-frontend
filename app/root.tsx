// src/App.tsx
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useNavigate
} from "@remix-run/react";
import type { LinksFunction, LoaderFunction } from "@remix-run/node";
import Footer from "./components/Footer";
import { manageGuestToken } from "./plugins/manageGuestToken";
import { AlertProvider } from './context/AlertContext';
import Cookies from "universal-cookie";
import "./tailwind.css";
import Navbar from "./components/NavBar";
import CookieConsent from "./components/CookiesBanner";
import { useEffect } from "react";

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
  const cookies = new Cookies(request.headers.get('cookie'), { path: '/' });
  const guestToken = cookies.get("guestToken");
  const guestTokenDate = cookies.get("guestTokenDate");

  try{
  const guestTokenResponse = await manageGuestToken(guestToken, guestTokenDate);
  const { token, date, message } = guestTokenResponse;
  return { token, date, message };
  }catch(error){
    return { token: 'none', date: 'none', message:'Falied to fetch' };
  }
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
  const { token, date, message } = useLoaderData();
  const navigate = useNavigate();

  useEffect(() => {
    const cookies = new Cookies();
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);

    if (message !== "Token created" && message !== "Token is valid")  {
      if(typeof message !== 'string') return
      cookies.remove("guestToken", { path: '/' });
      cookies.remove("guestTokenDate", { path: '/' });
      cookies.remove("userName", {path: "/"})
      navigate("/500");
    } else {
      cookies.set('guestToken', token.toString(), { path: '/', httpOnly: false, secure: false, expires });
      cookies.set('guestTokenDate', new Date(date).toISOString(), { path: '/', httpOnly: false, secure: false, expires });
    }
  }, []);

  return (
    <AlertProvider>
      <Outlet />
    </AlertProvider>
  );
}
