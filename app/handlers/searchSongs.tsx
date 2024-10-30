import Cookies from 'universal-cookie';
const API_URL = import.meta.env.VITE_PUBLIC_API_URL;
import { isValidTone } from '~/utils/validators';

interface Query {
    author: string | undefined,
    name: string | undefined,
    tone: string | undefined
}

export async function searchSongs(query: Query) {

    if(!query.name && !query.author && !query.tone) throw new Error('Need values to find')

    const cookies = new Cookies();
    const guestToken = cookies.get('guestToken');

    const params = {}

    if (typeof query.name === 'string') params.name = query.name;
    if (typeof query.author === 'string') params.author = query.author;
    if (typeof query.tone === 'string') params.tone = query.tone;
    
    const urlParams = new URLSearchParams(params).toString();

    try {
        const response = await fetch(API_URL + '/song/retrieve_songs?' + urlParams, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${guestToken}`,
            },
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
