import { API_URL } from "~/utils/client.envoriment";

export async function renewGuestToken(token: string) {
  if (!token) {
    console.error("No token provided for renewal.");
    return new Response("Token is required", { status: 400 });
  }

  try {
    const response = await fetch(`${API_URL}/guestToken/renew`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json", 
      },
    });

    if (!response.ok) {
      const errorText = await response.text(); 
      console.error("Error during POST request:", errorText);
      throw new Error(`Error ${response.status}: ${errorText}`);
    }

    const result = await response.json();
    
    return new Response(JSON.stringify(result), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error in renewing guest token:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
