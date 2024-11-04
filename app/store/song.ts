import { create } from 'zustand';

interface Note {
  note: string;
  time: number;
  velocity: number;
  duration: number;
}

interface SongStore {
  song: Note[];
  name: string;
  author: string,
  tone: string,
  setSong: (song: Note[]) => void;
  setName: (name: string) => void;
  setTone: (tone: string) => void,
  setAuthor: (author: string) => void
}

const useSongStore = create<SongStore>((set) => ({
  song: [
		{
			"note": "C4",
			"time": 0.0,
			"velocity": 0.6664795023529568,
			"duration": 0.25
		},
		{
			"note": "D4",
			"time": 0.25,
			"velocity": 0.4129966992887576,
			"duration": 0.5
		},
		{
			"note": "E4",
			"time": 0.75,
			"velocity": 0.6584694031340286,
			"duration": 0.5
		},
		{
			"note": "G5",
			"time": 1.25,
			"velocity": 0.7674149828134197,
			"duration": 0.5
		},
		{
			"note": "E5",
			"time": 1.75,
			"velocity": 0.3088815002620205,
			"duration": 0.5
		},
		{
			"note": "F5",
			"time": 2.25,
			"velocity": 0.33743575379097485,
			"duration": 0.5
		},
		{
			"note": "D4",
			"time": 2.75,
			"velocity": 0.4589893542778737,
			"duration": 1.0
		},
		{
			"note": "D5",
			"time": 3.75,
			"velocity": 0.7473976148482697,
			"duration": 1.0
		}
	],
  name: 'Example',
  author: 'Example',
  tone: 'C Major',
  setSong: (song) => set({ song }),
  setName: (name) => set({name}),
  setTone: (tone) => set({tone}),
  setAuthor: (author) => set({author})
}));

export default useSongStore;

