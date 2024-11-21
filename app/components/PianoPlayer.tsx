import React, { useEffect, useState } from "react";
import * as Tone from "tone";
import { useSongStore } from "~/store";
import { retrieveSong } from "~/handlers/retrieveSong";
import { useParams } from "@remix-run/react";
import { useAlert } from "~/context/AlertContext";
import { useTranslation } from "react-i18next";

const MidiPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentNote, setCurrentNote] = useState<{
    note: string | null;
    duration: string | null;
  }>({ note: null, duration: null });

  const { song, name, author, tone, setAuthor, setSong, setName, setTone } = useSongStore();
  const { id } = useParams();
  const {showAlert} = useAlert()

  const {t} = useTranslation()

  useEffect(() =>{
    handleRetrieveSong()
  }, [])

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
    <div className="flex justify-center items-center space-x-4 font-montserrat font-bold">
      <div className="flex flex-col items-center justify-center text-center p-4 bg-blue-800 text-white rounded-md shadow-md w-[30vw] h-[60vh]">
        <h2 className="text-xl font-bold">{t('player.song')} {name}</h2>
        <p className="text-lg">{t('player.author')} {author}</p>
        <p className="text-lg text-blue-100">{t('player.tone')} {tone}</p>
      </div>

      <div className="flex flex-col items-center justify-center bg-gray-100 p-10 rounded-lg shadow-md w-[40vw] h-[60vh]">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('player.playSong')}</h2>
        <button
          onClick={playMelody}
          disabled={isPlaying}
          className={`px-6 py-3 rounded-md font-semibold text-white transition duration-200 font-pacifico ${
            isPlaying
              ? "bg-green-400 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          }`}
        >
          {isPlaying ? `${t('player.playing')}` : `${t('player.play')}` }
        </button>
      </div>

      <div className="flex flex-col justify-between h-[60vh]">
        <div className="h-[28vh] w-32 text-center p-4 bg-black text-white rounded-md shadow-md">
          <p className="text-xl">{t('player.playing')}</p>
          <h2 className="font-bold mt-4 text-xl text-green-300">
            {currentNote.note || "N/A"}
          </h2>
        </div>

        <div className="h-[28vh] w-32 text-center p-4 bg-black text-white rounded-md shadow-md">
          <p className="text-xl">{t('player.duration')}</p>
          <h2 className="font-bold mt-4 text-xl text-green-300">
            {currentNote.duration || "N/A"}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default MidiPlayer;
