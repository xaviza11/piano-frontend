import { API_URL } from "~/utils/client.environment";

export async function generateGuestToken() {
  try {
    const response = await fetch(`${API_URL}/guestToken/create`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Error generating guest token");
    }

    const { guest_token, date, message } = await response.json();

    return { message, guest_token, date };
  } catch (error) {
    console.error("Error generating guest token:", error);
    throw error;
  }
}
