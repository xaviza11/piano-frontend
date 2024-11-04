const API_URL = import.meta.env.VITE_PUBLIC_API_URL;
import Cookies from 'universal-cookie';

export async function generateSong(tone: string) {
  const cookies = new Cookies();
  const guestToken = cookies.get('guestToken');

  try {
    const encodedTone = encodeURIComponent(tone);

    const response = await fetch(`${API_URL}/song/generate_song?tone=${encodedTone}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${guestToken}`,
      },
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result);
    }

    return result;

  } catch (error) {
    console.error("Error generating song:", error);
    throw error;
  }
}
