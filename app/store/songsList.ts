import { create } from 'zustand';

interface Song {
    id: string;
    name: string;
    tone: string;
    author: string;
}

interface SongListStore {
    songs: Song[];
    setSongsList: (songsList: Song[]) => void;
}

const useSongListStore = create<SongListStore>((set) => ({
    songs: [],
    setSongsList: (songsList) => set({ songs: songsList }), 
}));

export default useSongListStore;
