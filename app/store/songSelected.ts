import { create } from 'zustand';

interface Song {
    id: string;
    name: string;
    tone: string;
    author: string;
}

interface SongSelectedState {
    songSelected: Song | null; 
    setSongSelected: (song: Song) => void;
}

const useSongSelected = create<SongSelectedState>((set) => ({
    songSelected: null,  
    setSongSelected: (songSelected) => set({ songSelected }), 
}));

export default useSongSelected;
