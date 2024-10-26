import React, { useState } from 'react';
import * as Tone from 'tone';

const MidiPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentNote, setCurrentNote] = useState<{ note: string | null; duration: string | null }>({ note: null, duration: null });

  const songName = 'Supermarket';
  const songAuthor = 'SuperSkilled';
  const songTone = 'C Major';

  const melody = [
    { note: 'C4', duration: 0.5, time: 0 },
    { note: 'E4', duration: '4n', time: 0.5 },
    { note: 'G4', duration: '4n', time: 1 },
    { note: 'C5', duration: '4n', time: 1.5 },
  ];

  const playMelody = async () => {
    await Tone.start();

    const synth = new Tone.PolySynth(Tone.Synth).toDestination();
    const now = Tone.now();

    setIsPlaying(true);

    melody.forEach(({ note, duration, time }) => {
      setTimeout(() => {
        synth.triggerAttackRelease(note, duration, now + time);
        setCurrentNote({ note, duration: String(duration) });
      }, time * 1000);
    });

    setTimeout(() => {
      setIsPlaying(false);
      setCurrentNote({ note: null, duration: null });
    }, 2000);
  };

  return (
    <div className="flex items-start space-x-4">

         <div className="flex flex-col items-center justify-center text-center p-4 bg-blue-800 text-white rounded-md shadow-md w-72 h-64">
  <h2 className="text-xl font-bold">Song: {songName}</h2>
  <p className="text-lg">Author: {songAuthor}</p>
  <p className="text-lg text-blue-200">Tone: {songTone}</p>
</div>

      <div className="flex flex-col items-center bg-gray-100 p-10 rounded-lg shadow-md w-72 h-64">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Play song:</h2>
        <button
          onClick={playMelody}
          disabled={isPlaying}
          className={`px-6 py-3 rounded-md font-semibold text-white transition duration-200 ${isPlaying ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50'}`}
        >
          {isPlaying ? 'Reproduciendo...' : 'Reproducir Melodía'}
        </button>
      </div>

            {/* Contenedor de Nota y Duración en una columna */}
            <div className="flex flex-col space-y-8">
        {/* Display de la Nota Actual */}
        <div className="h-28 w-32 text-center p-4 bg-black text-white rounded-md shadow-md">
          <p className="text-xl">Note:</p>
          <h2 className="font-bold mt-4 text-xl text-green-300">{currentNote.note || 'N/A'}</h2>
        </div>

        {/* Display de la Duración Actual */}
        <div className="h-28 w-32 text-center p-4 bg-black text-white rounded-md shadow-md">
          <p className="text-xl">Duration:</p>
          <h2 className="font-bold mt-4 text-xl text-green-300">{currentNote.duration || 'N/A'}</h2>
        </div>
      </div>
    </div>
  );
};

export default MidiPlayer;
