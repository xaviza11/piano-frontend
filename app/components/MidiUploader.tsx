import React, { useState } from "react";
import { parseMidi } from "midi-file";
import { useSongStore } from "~/store";
import { createSong } from "~/handlers/createSong";
import { useAlert } from "~/context/AlertContext";

const MidiUploader = () => {
  const [songTitle, setSongTitle] = useState("");
  const [songAuthor, setSongAuthor] = useState("");
  const [songTone, setSongTone] = useState("C");
  const [midiFile, setMidiFile] = useState<File | null>(null);

  const { setSong, setName, setTone, setAuthor } = useSongStore();

  const {showAlert} = useAlert()

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setMidiFile(file); 
    }
  };

  const handleUpload = async () => {
    if (midiFile) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          const arrayBuffer = e.target?.result;
          const midiArray = new Uint8Array(arrayBuffer as ArrayBuffer);
          const midiJson = parseMidi(midiArray);
          const formattedMidi = transformMidiJson(midiJson);

          await createSong({name: songTitle, tone: songTone, author: songAuthor, notes: formattedMidi.tracks[0]})

          setSong(formattedMidi.tracks[0]);
          setName(songTitle);
          setTone(songTone);
          setAuthor(songAuthor);

          showAlert("Song uploaded successfully", "success", true)
        } catch (error: any) {
          showAlert(error.message, "warning", true)
        }
      };
      reader.readAsArrayBuffer(midiFile);
    }
  };

  const transformMidiJson = (midiJson: any) => {
    const { header, tracks } = midiJson;
    const ticksPerBeat = header.ticksPerBeat;

    const formattedTracks = tracks.map((track: any) => {
      let currentTime = 0;
      const trackNotes = [] as any;
      track.forEach((event: any) => {
        currentTime += event.deltaTime;
        if (event.type === "noteOn" && event.velocity > 0) {
          trackNotes.push({
            note: midiNoteNumberToName(event.noteNumber),
            time: currentTime / ticksPerBeat,
            velocity: event.velocity / 127,
            duration: 0,
          });
        }
        if (
          event.type === "noteOff" ||
          (event.type === "noteOn" && event.velocity === 0)
        ) {
          const lastNote = trackNotes
            .slice()
            .reverse()
            .find(
              (n: any) =>
                n.note === midiNoteNumberToName(event.noteNumber) &&
                n.duration === 0
            );
          if (lastNote) {
            lastNote.duration = currentTime / ticksPerBeat - lastNote.time;
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
      tracks: formattedTracks.filter((track:any) => track.length > 0),
    };
  };

  const midiNoteNumberToName = (number: number) => {
    const noteNames = [
      "C",
      "C#",
      "D",
      "D#",
      "E",
      "F",
      "F#",
      "G",
      "G#",
      "A",
      "A#",
      "B",
    ];
    const octave = Math.floor(number / 12) - 1;
    const note = noteNames[number % 12];
    return `${note}${octave}`;
  };

  return (
    <div className="flex flex-col items-center border border-blue-400 p-8 rounded-lg shadow-md max-w-md mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">MIDI Uploader</h1>

      <div className="w-full mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="title"
        >
          Title:
        </label>
        <input
          id="title"
          type="text"
          value={songTitle}
          onChange={(e) => setSongTitle(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded bg-white text-black"
          placeholder="Enter song title"
        />
      </div>

      <div className="w-full mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="author"
        >
          Author:
        </label>
        <input
          id="author"
          type="text"
          value={songAuthor}
          onChange={(e) => setSongAuthor(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded bg-white text-black"
          placeholder="Enter author name"
        />
      </div>

      <div className="w-full mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="tone"
        >
          Tone:
        </label>
        <select
          id="tone"
          value={songTone}
          onChange={(e) => setSongTone(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded bg-white text-gray-700"
        >
          <optgroup label="Major">
            <option value="C Major">C Major</option>
            <option value="C# Major">C# Major</option>
            <option value="D Major">D Major</option>
            <option value="D# Major">D# Major</option>
            <option value="E Major">E Major</option>
            <option value="F Major">F Major</option>
            <option value="F# Major">F# Major</option>
            <option value="G Major">G Major</option>
            <option value="G# Major">G# Major</option>
            <option value="A Major">A Major</option>
            <option value="A# Major">A# Major</option>
            <option value="B Major">B Major</option>
          </optgroup>
          <optgroup label="Minor">
            <option value="C Minor">C Minor</option>
            <option value="C# Minor">C# Minor</option>
            <option value="D Minor">D Minor</option>
            <option value="D# Minor">D# Minor</option>
            <option value="E Minor">E Minor</option>
            <option value="F Minor">F Minor</option>
            <option value="F# Minor">F# Minor</option>
            <option value="G Minor">G Minor</option>
            <option value="G# Minor">G# Minor</option>
            <option value="A Minor">A Minor</option>
            <option value="A# Minor">A# Minor</option>
            <option value="B Minor">B Minor</option>
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
        onClick={handleUpload}
        className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        Upload MIDI
      </button>
    </div>
  );
};

export default MidiUploader;
