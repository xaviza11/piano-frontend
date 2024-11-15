import React, { useState } from "react";
import { searchSongs } from "~/handlers/searchSongs";
import { useAlert } from "~/context/AlertContext";
import { useSongsListStore } from "~/store";

const TONES = [
  "C Major", "C Minor", "C# Major", "C# Minor",
  "D Major", "D Minor", "D# Major", "D# Minor",
  "E Major", "E Minor", "F Major", "F Minor",
  "F# Major", "F# Minor", "G Major", "G Minor",
  "G# Major", "G# Minor", "A Major", "A Minor",
  "A# Major", "A# Minor", "B Major", "B Minor"
];

const SearchSongs: React.FC = () => {
  const [name, setName] = useState<string | undefined>(undefined);
  const [author, setAuthor] = useState<string | undefined>(undefined);
  const [tone, setTone] = useState<string | undefined>(undefined);

  const { setSongsList } = useSongsListStore();
  const { showAlert } = useAlert();

  const handleSearch = async () => {
    const query = { name, tone, author };
    try {
      const response = await searchSongs(query);
      showAlert(response.message, "success", true);
      setSongsList(response.songs);
    } catch (error: any) {
      showAlert(error.message, "warning", true);
    }
  };

  return (
    <div className="p-4 max-w-lg mx-auto bg-gradient-to-r from-blue-600 to-blue-500 rounded-lg mt-1 h-auto md:h-[65vh] w-[20vw] md:w-[50vw] lg:w-[30vw] text-black flex flex-col justify-center font-montserrat font-bold">
      <div className="mb-6">
        <label
          className="block text-white text-[3vh] font-bold mb-2"
          htmlFor="author"
        >
          Author:
        </label>
        <input
          type="text"
          id="author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Author name"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 text-black bg-white h-[1vh] md:h-[5vh]"
        />
      </div>

      <div className="mb-4">
        <label
          className="block text-white text-[3vh] font-bold mb-2"
          htmlFor="name"
        >
          Song Name:
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Song name"
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
          value={tone}
          onChange={(e) => setTone(e.target.value)}
          className="w-full px-3 py-1 md:py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 bg-white text-xs md:text-sm"
        >
          <option value="">Select Tone</option>
          {TONES.map((toneOption) => (
            <option key={toneOption} value={toneOption}>
              {toneOption}
            </option>
          ))}
        </select>
      </div>

        <div className="flex justify-center w-full">
      <button
        onClick={handleSearch}
        className="px-4 py-2 bg-green-600 text-white rounded-md text-[2vh] hover:bg-green-500 font-pacifico"
      >
        Search
      </button>
      </div>
    </div>
  );
};

export default SearchSongs;
