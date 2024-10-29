import Cookies from 'universal-cookie';
const API_URL = import.meta.env.VITE_PUBLIC_API_URL;
import { isValidTone } from '~/utils/validators';

interface Note {
    note: string;
    time: number;
    velocity: number;
    duration: number
}

export async function createSong(songData: {name: string, tone: string, author: string, notes: Note[]}) {


    if(!isValidTone(songData.tone)) throw new Error('Tone is invalid')

    const cookies = new Cookies();
    const accessToken = cookies.get('accessToken');

    if (!accessToken) {
        throw new Error("User is not authenticated.");
    }

    try {
        const response = await fetch(`${API_URL}/song/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`,
            },
            body: JSON.stringify(songData),
        });

        if (response.status !== 200) {
            const result = await response.json();
            throw new Error(result.detail || "Failed to create song.");
        }

        return await response.json();
    } catch (error: any) {
        throw new Error(error.message);
    }
}
