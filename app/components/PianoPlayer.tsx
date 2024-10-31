import React, { useEffect, useState } from "react";
import * as Tone from "tone";
import { useSongStore } from "~/store";
import { retrieveSong } from "~/handlers/retrieveSong";
import { useParams } from "@remix-run/react";
import { useAlert } from "~/context/AlertContext";

const MidiPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentNote, setCurrentNote] = useState<{
    note: string | null;
    duration: string | null;
  }>({ note: null, duration: null });

  const { song, name, author, tone, setAuthor, setSong, setName, setTone } = useSongStore();
  const { id } = useParams();
  const {showAlert} = useAlert()

  useEffect(() =>{
    handleRetrieveSong()
  })

  const handleRetrieveSong = async () => {
    if(!id || id === 'none') return
    try {
      const retrievedSong = await retrieveSong(id);
      setAuthor(retrievedSong.song_data.author)
      setSong(retrievedSong.song_data.notes)
      setName(retrievedSong.song_data.name)
      setTone(retrievedSong.song_data.tone)
    } catch (error:any) {
      showAlert(error.message, 'warning', true)
    }
  };

  const melody = song;

  const playMelody = async () => {
    await Tone.start();

    const synth = new Tone.PolySynth(Tone.Synth).toDestination();
    const now = Tone.now();

    setIsPlaying(true);

    melody.forEach(({ note, duration, time }) => {
      const roundedDuration = parseFloat(duration.toFixed(3));

      setTimeout(() => {
        synth.triggerAttackRelease(note, roundedDuration, now + time);
        setCurrentNote({ note, duration: String(roundedDuration) });
      }, time * 1000);
    });
  };
  
  return (
    <div className="flex items-start space-x-4">
      <div className="flex flex-col items-center justify-center text-center p-4 bg-blue-800 text-white rounded-md shadow-md w-72 h-64">
        <h2 className="text-xl font-bold">Song: {name}</h2>
        <p className="text-lg">Author: {author}</p>
        <p className="text-lg text-blue-100">Tone: {tone}</p>
      </div>

      <div className="flex flex-col items-center bg-gray-100 p-10 rounded-lg shadow-md w-72 h-64">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Play song:</h2>
        <button
          onClick={playMelody}
          disabled={isPlaying}
          className={`px-6 py-3 rounded-md font-semibold text-white transition duration-200 ${
            isPlaying
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          }`}
        >
          {isPlaying ? "Play..." : "Playing the melody"}
        </button>
      </div>

      <div className="flex flex-col space-y-8">
        <div className="h-28 w-32 text-center p-4 bg-black text-white rounded-md shadow-md">
          <p className="text-xl">Note:</p>
          <h2 className="font-bold mt-4 text-xl text-green-300">
            {currentNote.note || "N/A"}
          </h2>
        </div>

        <div className="h-28 w-32 text-center p-4 bg-black text-white rounded-md shadow-md">
          <p className="text-xl">Duration:</p>
          <h2 className="font-bold mt-4 text-xl text-green-300">
            {currentNote.duration || "N/A"}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default MidiPlayer;
