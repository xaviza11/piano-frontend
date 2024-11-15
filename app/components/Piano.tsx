import React, { useEffect, useState } from 'react';
import * as Tone from 'tone';

const Piano = () => {
  const [activeKeys, setActiveKeys] = useState<string[]>([]);
  const [instrument, setInstrument] = useState<string>('FMSynth');
  const [volume, setVolume] = useState<number>(0);

  const playNote = (note: any) => {
    let synth;
    const options = { volume };

    switch (instrument) {
      case 'FMSynth':
        synth = new Tone.FMSynth(options).toDestination();
        break;
      case 'AMSynth':
        synth = new Tone.AMSynth(options).toDestination();
        break;
      case 'MonoSynth':
        synth = new Tone.MonoSynth(options).toDestination();
        break;
      case 'Synth':
        synth = new Tone.Synth(options).toDestination();
        break;
      default:
        synth = new Tone.Synth(options).toDestination();
    }
    synth.triggerAttackRelease(note, '8n');
  };

  const notes = [
    { note: 'C4', key: 'A', isBlack: false },
    { note: 'C#4', key: 'W', isBlack: true },
    { note: 'D4', key: 'S', isBlack: false },
    { note: 'D#4', key: 'E', isBlack: true },
    { note: 'E4', key: 'D', isBlack: false },
    { note: 'F4', key: 'F', isBlack: false },
    { note: 'F#4', key: 'T', isBlack: true },
    { note: 'G4', key: 'J', isBlack: false },
    { note: 'G#4', key: 'I', isBlack: true },
    { note: 'A4', key: 'K', isBlack: false },
    { note: 'A#4', key: 'O', isBlack: true },
    { note: 'B4', key: 'L', isBlack: false },
    { note: 'C5', key: 'Ñ', isBlack: false },
  ];

  const handleKeyPress = (event: any) => {
    const key = event.key.toUpperCase();
    const noteObj = notes.find(n => n.key === key);
    if (noteObj && !activeKeys.includes(noteObj.key)) {
      playNote(noteObj.note);
      setActiveKeys(prevKeys => [...prevKeys, noteObj.key]);
    }
  };

  const handleKeyRelease = (event: any) => {
    const key = event.key.toUpperCase();
    setActiveKeys(prevKeys => prevKeys.filter(k => k !== key));
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    window.addEventListener('keyup', handleKeyRelease);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      window.removeEventListener('keyup', handleKeyRelease);
    };
  }, [activeKeys]);

  return (
    <div className="piano-container flex flex-col items-center bg-black w-[40vw] min-w-[600px] md:min-w-[650px]">
      <div className="w-full flex justify-around mb-4">
        <div className="mt-4 ml-4">
          <select
            value={instrument}
            onChange={e => setInstrument(e.target.value)}
            className="p-2 bg-white rounded-md text-black"
          >
            <option value="FMSynth">FM Synth</option>
            <option value="AMSynth">AM Synth</option>
            <option value="MonoSynth">Mono Synth</option>
            <option value="Synth">Synth</option>
          </select>
        </div>

        <div className="mt-5 mr-4">
          <input
            type="range"
            min="-30"
            max="0"
            step="1"
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="w-64"
          />
          <label className="ml-2 text-white">{volume} dB</label>
        </div>
      </div>

      <div className="flex justify-center items-end h-38 bg-black mb-2 ml-2 mr-2 rounded-t-md">
        {notes.map(({ note, key, isBlack }) => (
          <div
            key={note}
            className={`relative group w-8 h-32 border border-gray-300 m-1 cursor-pointer flex justify-center items-center font-bold rounded-t-md ${
              isBlack ? 'bg-black text-white' : 'bg-white text-black'
            } ${activeKeys.includes(key) ? 'text-white bg-blue-300' : ''}`}
            onMouseDown={() => {
              playNote(note);
              setActiveKeys(prevKeys => [...prevKeys, key]);
            }}
            onMouseUp={() => setActiveKeys(prevKeys => prevKeys.filter(k => k !== key))}
          >
            {key}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Piano;
