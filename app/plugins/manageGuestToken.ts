import { guestTokenCookie, guestTokenDate } from "~/utils/cookies";
import { generateGuestToken } from "~/handlers/generateGuestToken"; 
import {renewGuestToken} from '~/handlers/renewGuestToken'
import { json } from "@remix-run/node";

export async function manageGuestToken(request:any) {
  const cookieHeader = request.headers.get("Cookie");
  const cookies = {
    guestToken: await guestTokenCookie.parse(cookieHeader),
    guestTokenDate: await guestTokenDate.parse(cookieHeader),
  };

  const currentTime = new Date();
  const tokenDate = cookies.guestTokenDate ? new Date(cookies.guestTokenDate.date) : null;

  if (!cookies.guestToken || !cookies.guestTokenDate) return await generateGuestToken();

  if (tokenDate) {
    const timeDiff = currentTime.getTime() - tokenDate.getTime();
    const oneDay = 24 * 60 * 60 * 1000;

    if (timeDiff < oneDay) {
      return await renewGuestTokenHandler(cookies.guestToken);
    }
  }

  return json({ message: "Token is valid", token: cookies.guestToken, date: tokenDate });
}

async function renewGuestTokenHandler(token: string) {
  const response = await renewGuestToken(token);

  if (response.ok) {
    const { guest_token, date } = await response.json();

    const newGuestTokenCookie = await guestTokenCookie.serialize({ guest_token });
    const newGuestTokenDateCookie = await guestTokenDate.serialize({ date });

    const headers = new Headers();
    headers.append("Set-Cookie", newGuestTokenCookie);
    headers.append("Set-Cookie", newGuestTokenDateCookie);

    return new Response(JSON.stringify({ message: "Token renewed successfully", token: guest_token, date }), {
      headers
    });
  }

  return new Response("Failed to renew token", { status: 500 });
}