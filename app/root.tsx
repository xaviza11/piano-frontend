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
import { manageAccessToken } from './plugins/manageAccessToken';
import { AlertProvider } from './context/AlertContext';
import Cookies from "universal-cookie";
import "./tailwind.css";
import Navbar from "./components/NavBar";
import CookieConsent from "./components/CookiesBanner";
import { useEffect } from "react";
import i18n from "./i18n"
import { I18nextProvider } from 'react-i18next';

export const loader: LoaderFunction = async ({ request }) => {
  const cookies = new Cookies(request.headers.get("cookie"), { path: "/" });
  const guestToken = cookies.get("guestToken");
  const guestTokenDate = cookies.get("guestTokenDate");
  const accessToken = cookies.get("accessToken");
  const accessTokenDate = cookies.get("accessTokenDate");

  try {
    const guestTokenResponse = await manageGuestToken(guestToken, guestTokenDate);
    const accessTokenResponse = await manageAccessToken(accessToken, accessTokenDate);

    return {
      guestToken: guestTokenResponse.token,
      guestTokenDate: guestTokenResponse.date,
      guestTokenMessage: guestTokenResponse.message,
      accessToken: accessTokenResponse.token,
      accessTokenDate: accessTokenResponse.date,
      accessTokenMessage: accessTokenResponse.message
    };
  } catch (error) {
    return { guestToken: 'none', guestTokenDate: 'none', guestTokenMessage: 'Failed to fetch', accessToken: 'none', accessTokenDate: 'none', accessTokenMessage: 'Failed to fetch' };
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
      <body className="bg-[url('/background-app.jpg')] bg-cover bg-center">
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
  const { guestToken, guestTokenDate, guestTokenMessage, accessToken, accessTokenDate, accessTokenMessage } = useLoaderData();
  const navigate = useNavigate();

  useEffect(() => {
    const cookies = new Cookies();
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);

    if (guestTokenMessage !== "Token created" && guestTokenMessage !== "Token is valid") {
      cookies.remove("guestToken", { path: "/" });
      cookies.remove("guestTokenDate", { path: "/" });
      cookies.remove("userName", { path: "/" });
      navigate("/500");
    } else {
      cookies.set("guestToken", guestToken, { path: "/", expires });
      cookies.set("guestTokenDate", new Date(guestTokenDate).toISOString(), { path: "/", expires });
    }

    if (accessTokenMessage === "Token renewed successfully" || accessTokenMessage === "Token is valid") {
      cookies.set("accessToken", accessToken, { path: "/", expires });
      cookies.set("accessTokenDate", new Date(accessTokenDate).toISOString(), { path: "/", expires });
    } else if (accessTokenMessage === "Failed to renew token") {
      cookies.remove("accessToken", { path: "/" });
      cookies.remove("accessTokenDate", { path: "/" });
      navigate("/500");
    }
  }, []);

  return (
    <I18nextProvider i18n={i18n}>
    <AlertProvider>
      <Outlet />
    </AlertProvider>
    </I18nextProvider>
  );
}
