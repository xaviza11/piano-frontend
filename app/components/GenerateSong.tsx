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
    <div>
      <div className="p-8 bg-gradient-to-r from-blue-600 to-blue-500 rounded-lg h-[80vh] flex flex-col items-center justify-center font-montserrat font-bold">

        <form onSubmit={handleGenerate}>
          <div className="mb-4">
            <label
              className="block text-white text-[3vh] font-bold mb-2"
              htmlFor="title"
            >
              Title:
            </label>
            <input
              type="text"
              id="title"
              placeholder="Song title"
              value={localTitle}
              onChange={(e) => setLocalTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 text-black bg-white h-[1vh] md:h-[5vh]"
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-white text-[3vh] font-bold mb-2"
              htmlFor="author"
            >
              Author:
            </label>
            <input
              type="text"
              id="author"
              placeholder="Author name"
              value={localAuthor}
              onChange={(e) => setLocalAuthor(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 text-black bg-white h-[1vh] md:h-[5vh]"
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-white text-[3vh] font-bold mb-2"
              htmlFor="tone"
            >
              Tone:
            </label>
            <select
              id="tone"
              value={localTone}
              onChange={(e) => setLocalTone(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded bg-white text-gray-700 text-[2vh]"
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

          <div className="w-full flex justify-center">
          <button
            type="submit"
            className="px-4 py-2 bg-green-600 text-white rounded-md text-[2vh] hover:bg-green-500 font-pacifico"
          >
            Generate
          </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GenerateTone;
