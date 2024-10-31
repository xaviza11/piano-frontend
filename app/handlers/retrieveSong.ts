import Cookies from 'universal-cookie';

const API_URL = import.meta.env.VITE_PUBLIC_API_URL;

interface SongResponse {
    song_data: {
        name: string;
        tone: string;
        author: string;
        notes: Array<{
            note: string;
            time: number;
            velocity: number;
            duration: number;
        }>;
    };
}

export async function retrieveSong(songId: string): Promise<SongResponse> {
    if (!songId) throw new Error('Song ID is required');

    const cookies = new Cookies();
    const guestToken = cookies.get('guestToken');

    try {
        const response = await fetch(`${API_URL}/song/retrieve/${songId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${guestToken}`,
            },
        });

        if (response.status !== 200) {
            const result = await response.json();
            throw new Error(result.detail || "Failed to retrieve song.");
        }

        return await response.json() as SongResponse; 
    } catch (error:any) {
        throw new Error(error.message);
    }
}
