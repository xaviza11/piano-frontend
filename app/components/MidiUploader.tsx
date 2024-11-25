import React, { useState } from "react";
import { parseMidi } from "midi-file";
import { useSongStore } from "~/store";
import { createSong } from "~/handlers/createSong";
import { useAlert } from "~/context/AlertContext";
import { useTranslation } from "react-i18next";

const MidiUploader = () => {
  const [songTitle, setSongTitle] = useState("");
  const [songAuthor, setSongAuthor] = useState("");
  const [songTone, setSongTone] = useState("C");
  const [midiFile, setMidiFile] = useState<File | null>(null);

  const { setSong, setName, setTone, setAuthor } = useSongStore();
  const { showAlert } = useAlert();

  const { t } = useTranslation();

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

          await createSong({
            name: songTitle,
            tone: songTone,
            author: songAuthor,
            notes: formattedMidi.tracks[0],
          });

          setSong(formattedMidi.tracks[0]);
          setName(songTitle);
          setTone(songTone);
          setAuthor(songAuthor);

          showAlert("Song uploaded successfully", "success", true);
        } catch (error: any) {
          showAlert(error.message, "warning", true);
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
      tracks: formattedTracks.filter((track: any) => track.length > 0),
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
    <div id="midi-uploader" className="flex flex-col items-center justify-center p-5 rounded-lg shadow-md max-w-md mx-auto h-[80vh] w-[40vw] bg-gradient-to-r from-blue-600 to-blue-500 font-montserrat font-bold">
      <div className="w-full mb-4">
        <label
          className="block text-[3vh] text-white font-bold mb-2"
          htmlFor="title"
        >
          {t("uploader.title")}
        </label>
        <input
          id="title"
          type="text"
          value={songTitle}
          onChange={(e) => setSongTitle(e.target.value)}
          className="w-full p-2 rounded bg-white text-black h-[1vh] md:h-[5vh]"
          placeholder={t("uploader.titleInput")}
        />
      </div>

      <div className="w-full mb-4">
        <label
          className="block text-[3vh] text-white font-bold mb-2"
          htmlFor="author"
        >
          {t("uploader.author")}
        </label>
        <input
          id="author"
          type="text"
          value={songAuthor}
          onChange={(e) => setSongAuthor(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded bg-white text-black h-[1vh] md:h-[5vh]"
          placeholder={t("uploader.authorInput")}
        />
      </div>

      <div className="w-full mb-4">
        <label
          className="block text-[3vh] text-white font-bold mb-2"
          htmlFor="tone"
        >
          Tone:
        </label>
        <select
          id="tone"
          value={songTone}
          onChange={(e) => setSongTone(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded bg-white text-gray-700 h-[1vh] md:h-[6vh]"
        >
          <option value="" disabled>
            {t("tones.choose")}
          </option>

          <optgroup label={t("tones.major")}>
            <option value="C Major">
              {t("tones.C")} {t("tones.major")}
            </option>
            <option value="C# Major">
              {t("tones.C#")} {t("tones.major")}
            </option>
            <option value="D Major">
              {t("tones.D")} {t("tones.major")}
            </option>
            <option value="D# Major">
              {t("tones.D#")} {t("tones.major")}
            </option>
            <option value="E Major">
              {t("tones.E")} {t("tones.major")}
            </option>
            <option value="F Major">
              {t("tones.F")} {t("tones.major")}
            </option>
            <option value="F# Major">
              {t("tones.F#")} {t("tones.major")}
            </option>
            <option value="G Major">
              {t("tones.G")} {t("tones.major")}
            </option>
            <option value="G# Major">
              {t("tones.G#")} {t("tones.major")}
            </option>
            <option value="A Major">
              {t("tones.A")} {t("tones.major")}
            </option>
            <option value="A# Major">
              {t("tones.A#")} {t("tones.major")}
            </option>
            <option value="B Major">
              {t("tones.B")} {t("tones.major")}
            </option>
          </optgroup>
          <optgroup label={t("tones.minor")}>
            <option value="C Minor">
              {t("tones.C")} {t("tones.minor")}
            </option>
            <option value="C# Minor">
              {t("tones.C#")} {t("tones.minor")}
            </option>
            <option value="D Minor">
              {t("tones.D")} {t("tones.minor")}
            </option>
            <option value="D# Minor">
              {t("tones.D#")} {t("tones.minor")}
            </option>
            <option value="E Minor">
              {t("tones.E")} {t("tones.minor")}
            </option>
            <option value="F Minor">
              {t("tones.F")} {t("tones.minor")}
            </option>
            <option value="F# Minor">
              {t("tones.F#")} {t("tones.minor")}
            </option>
            <option value="G Minor">
              {t("tones.G")} {t("tones.minor")}
            </option>
            <option value="G# Minor">
              {t("tones.G#")} {t("tones.minor")}
            </option>
            <option value="A Minor">
              {t("tones.A")} {t("tones.minor")}
            </option>
            <option value="A# Minor">
              {t("tones.A#")} {t("tones.minor")}
            </option>
            <option value="B Minor">
              {t("tones.B")} {t("tones.minor")}
            </option>
          </optgroup>
        </select>
      </div>

      <div className="relative mb-2 w-[30vw] h-[5vh]">
        <input
          type="file"
          accept=".mid,.midi"
          onChange={handleFileUpload}
          className="opacity-0 absolute z-50 w-full h-full cursor-pointer"
        />
        <div className="flex items-center justify-center p-1 border border-blue-500 rounded text-blue-500 bg-white cursor-pointer w-full h-full text-[2vh]">
          {" "}
          {midiFile ? midiFile.name :  `${t('uploader.choose')}`}
        </div>
      </div>

      <button
        onClick={handleUpload}
        className="px-4 py-2 bg-green-600 text-white rounded-md text-[2vh] hover:bg-blue-700 font-pacifico"
      >
        {t('uploader.upload')}
      </button>
    </div>
  );
};

export default MidiUploader;
