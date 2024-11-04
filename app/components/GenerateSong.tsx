import React, { useState } from "react";
import { generateSong } from "~/handlers/generateSong";
import { useAlert } from "~/context/AlertContext";
import { useSongStore } from "~/store";
import { useNavigate } from "@remix-run/react";

const GenerateTone = () => {
  const [localTone, setLocalTone] = useState<string>("");
  const [localTitle, setLocalTitle] = useState<string>("");
  const [localAuthor, setLocalAuthor] = useState<string>("");
  const { showAlert } = useAlert();

  const { setSong, setName, setTone, setAuthor } = useSongStore();
  const navigate = useNavigate()

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!localTone || !localTitle || !localAuthor) {
      showAlert("All fields are required", "warning", true);
      return;
    }

    try {
      const response = await generateSong(localTone);
      showAlert(response.message, "success", true);
      setSong(response.notes);
      setName(localTitle);   
      setTone(localTone);
      setAuthor(localAuthor); 
      setTimeout(() => {
        navigate('/player/none')
      },5000)
    } catch (error: any) {
      showAlert(error.message, "warning", true);
    }
  };

  return (
    <div className="max-w-lg mx-auto">
      <div className="bg-blue-500 text-white text-center py-2 rounded-lg mb-4">
        <h1 className="text-2xl font-bold">Melody Generator</h1>
      </div>

      <div className="p-8 bg-white border border-blue-400 rounded-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Generate Song</h2>

        <form onSubmit={handleGenerate}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="title"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              placeholder="Song title"
              value={localTitle}
              onChange={(e) => setLocalTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 text-black bg-white"
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="author"
            >
              Author
            </label>
            <input
              type="text"
              id="author"
              placeholder="Author name"
              value={localAuthor}
              onChange={(e) => setLocalAuthor(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 text-black bg-white"
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="tone"
            >
              Tone
            </label>
            <select
              id="tone"
              value={localTone}
              onChange={(e) => setLocalTone(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded bg-white text-gray-700"
              defaultValue=""
            >
              <option value="" disabled>
                Choose a tone
              </option>

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

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            Generate
          </button>
        </form>
      </div>
    </div>
  );
};

export default GenerateTone;
