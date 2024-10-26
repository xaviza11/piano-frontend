import { API_URL } from "~/utils/client.envoriment";
import { guestTokenCookie, guestTokenDate } from "~/utils/cookies";

export async function generateGuestToken() {
  try {
    const response = await fetch(`${API_URL}/guestToken/create`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Error generating guest token");
    }

    const { guest_token, date } = await response.json();

    const cookie1 = await guestTokenCookie.serialize({
      guest_token,
    });

    const cookie2 = await guestTokenDate.serialize({
      date: date,
    });

    const headers = new Headers();
    headers.append("Set-Cookie", cookie1);
    headers.append("Set-Cookie", cookie2)

    return new Response("Token created", {
      headers,
    });
  } catch (error) {
    console.error("Error generating guest token:", error);
    throw error;
  }
}
