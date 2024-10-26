import React, { useState } from 'react';
import { parseMidi } from 'midi-file';

const MidiUploader = () => {
  const [songTitle, setSongTitle] = useState('');
  const [songAuthor, setSongAuthor] = useState('');
  const [songTone, setSongTone] = useState('C');

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const arrayBuffer = e.target?.result;
          const midiArray = new Uint8Array(arrayBuffer as ArrayBuffer);
          const midiJson = parseMidi(midiArray);
          const formattedMidi = transformMidiJson(midiJson);
          console.log("Formatted MIDI JSON:", formattedMidi);
        } catch (error) {
          console.error("Error al analizar el archivo MIDI:", error);
        }
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const transformMidiJson = (midiJson: any) => {
    const { header, tracks } = midiJson;
    const ticksPerBeat = header.ticksPerBeat;

    const formattedTracks = tracks.map((track: any) => {
      let currentTime = 0;
      const trackNotes = [];
      track.forEach((event: any) => {
        currentTime += event.deltaTime;
        if (event.type === 'noteOn' && event.velocity > 0) {
          trackNotes.push({
            note: midiNoteNumberToName(event.noteNumber),
            time: currentTime / ticksPerBeat,
            velocity: event.velocity / 127,
            duration: 0,
          });
        }
        if (event.type === 'noteOff' || (event.type === 'noteOn' && event.velocity === 0)) {
          const lastNote = trackNotes.slice().reverse().find(
            (n: any) => n.note === midiNoteNumberToName(event.noteNumber) && n.duration === 0
          );
          if (lastNote) {
            lastNote.duration = (currentTime / ticksPerBeat) - lastNote.time;
          }
        }
      });
      return trackNotes;
    });

    return {
      header: {
        ticksPerBeat: ticksPerBeat,
        format: header.format,
        numTracks: header.numTracks,
      },
      tracks: formattedTracks.filter((track) => track.length > 0),
    };
  };

  const midiNoteNumberToName = (number: number) => {
    const noteNames = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    const octave = Math.floor(number / 12) - 1;
    const note = noteNames[number % 12];
    return `${note}${octave}`;
  };

  return (
    <div className="flex flex-col items-center border border-blue-400 p-8 rounded-lg shadow-md max-w-md mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">MIDI Uploader</h1>

      <div className="w-full mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
          Title:
        </label>
        <input
          id="title"
          type="text"
          value={songTitle}
          onChange={(e) => setSongTitle(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded bg-white"
          placeholder="Enter song title"
        />
      </div>

      <div className="w-full mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="author">
          Author:
        </label>
        <input
          id="author"
          type="text"
          value={songAuthor}
          onChange={(e) => setSongAuthor(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded bg-white"
          placeholder="Enter author name"
        />
      </div>

      <div className="w-full mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="tone">
          Tone:
        </label>
        <select
  id="tone"
  value={songTone}
  onChange={(e) => setSongTone(e.target.value)}
  className="w-full p-2 border border-gray-300 rounded bg-white text-gray-700"
>
  <optgroup label="Major">
    <option value="C">C Major</option>
    <option value="C#">C# Major</option>
    <option value="D">D Major</option>
    <option value="D#">D# Major</option>
    <option value="E">E Major</option>
    <option value="F">F Major</option>
    <option value="F#">F# Major</option>
    <option value="G">G Major</option>
    <option value="G#">G# Major</option>
    <option value="A">A Major</option>
    <option value="A#">A# Major</option>
    <option value="B">B Major</option>
  </optgroup>
  <optgroup label="Minor">
    <option value="Cm">C Minor</option>
    <option value="C#m">C# Minor</option>
    <option value="Dm">D Minor</option>
    <option value="D#m">D# Minor</option>
    <option value="Em">E Minor</option>
    <option value="Fm">F Minor</option>
    <option value="F#m">F# Minor</option>
    <option value="Gm">G Minor</option>
    <option value="G#m">G# Minor</option>
    <option value="Am">A Minor</option>
    <option value="A#m">A# Minor</option>
    <option value="Bm">B Minor</option>
  </optgroup>
</select>

      </div>

      <input
        type="file"
        accept=".mid,.midi"
        onChange={handleFileUpload}
        className="mb-4 p-2 border border-blue-500 rounded text-blue-500 cursor-pointer"
      />

      <button
        onClick={() => console.log({ songTitle, songAuthor, songTone })}
        className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        Upload MIDI
      </button>
    </div>
  );
};

export default MidiUploader;
