import React, { useState } from 'react';
import {searchSongs} from '~/handlers/searchSongs'
import { useAlert } from '~/context/AlertContext';
import { useSongsListStore } from '~/store';

const TONES = [
  'C Major', 'C Minor', 'C# Major', 'C# Minor', 
  'D Major', 'D Minor', 'D# Major', 'D# Minor', 
  'E Major', 'E Minor', 'F Major', 'F Minor', 
  'F# Major', 'F# Minor', 'G Major', 'G Minor', 
  'G# Major', 'G# Minor', 'A Major', 'A Minor', 
  'A# Major', 'A# Minor', 'B Major', 'B Minor',
];

const SearchSongs: React.FC = () => {
  const [name, setName] = useState<string | undefined>(undefined);
  const [author, setAuthor] = useState<string | undefined>(undefined);
  const [tone, setTone] = useState<string | undefined>(undefined);

  const {setSongsList} =useSongsListStore()

  const {showAlert} = useAlert()
  
  const handleSearch = async () => {
    const query = {name, tone, author}

    try {
      const response = await searchSongs(query)
      showAlert(response.message, "success", true)
      setSongsList(response.songs)
    }catch(error:any){
      showAlert(error.message, "warning", true) 
    }

  };

  return (
    <div className="p-11 max-w-lg mx-auto bg-white border border-blue-400 rounded-lg mt-1 h-[28rem] text-black">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Search Songs</h2>
      
      <div className="mb-4">
        <label className="block text--700 text-sm font-bold mb-2" htmlFor="author">
          Author
        </label>
        <input
          type="text"
          id="author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Author name"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 bg-white"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
          Song Name
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Song name"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 bg-white"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="tone">
          Tone
        </label>
        <select
          id="tone"
          value={tone}
          onChange={(e) => setTone(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 bg-white text-black"
        >
          <option value="">Select Tone</option>
          {TONES.map((toneOption) => (
            <option key={toneOption} value={toneOption}>{toneOption}</option>
          ))}
        </select>
      </div>

      <button
        onClick={handleSearch}
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
      >
        Search
      </button>
    </div>
  );
};

export default SearchSongs;
