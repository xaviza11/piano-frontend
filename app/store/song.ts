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
  song: [ {
    "note": "E3",
    "time": 0.028645833333333332,
    "velocity": 0.31496062992125984,
    "duration": 0.5026041666666666
  },
  {
    "note": "E3",
    "time": 0.03125,
    "velocity": 0.7874015748031497,
    "duration": 0.24739583333333331
  },
  {
    "note": "B3",
    "time": 0.25,
    "velocity": 0.31496062992125984,
    "duration": 0.25
  },
  {
    "note": "B3",
    "time": 0.5,
    "velocity": 0.31496062992125984,
    "duration": 0.5
  },
  {
    "note": "B3",
    "time": 0.5,
    "velocity": 0.5354330708661418,
    "duration": 0.25
  },
  {
    "note": "B3",
    "time": 0.75,
    "velocity": 0.31496062992125984,
    "duration": 0.25
  },
  {
    "note": "C4",
    "time": 1,
    "velocity": 0.31496062992125984,
    "duration": 0.5
  },
  {
    "note": "C4",
    "time": 1,
    "velocity": 0.31496062992125984,
    "duration": 0.25
  },
  {
    "note": "B3",
    "time": 1.25,
    "velocity": 0.31496062992125984,
    "duration": 0.25
  },
  {
    "note": "A3",
    "time": 1.5,
    "velocity": 0.31496062992125984,
    "duration": 0.5
  },
  {
    "note": "A3",
    "time": 1.5,
    "velocity": 0.5354330708661418,
    "duration": 0.25
  },],
  name: 'Example',
  author: 'Example',
  tone: 'C Major',
  setSong: (song) => set({ song }),
  setName: (name) => set({name}),
  setTone: (tone) => set({tone}),
  setAuthor: (author) => set({author})
}));

export default useSongStore;

