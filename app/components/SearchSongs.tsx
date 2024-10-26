import React, { useState } from 'react';

const TONES = [
  'C Major', 'C Minor', 'C# Major', 'C# Minor', 
  'D Major', 'D Minor', 'D# Major', 'D# Minor', 
  'E Major', 'E Minor', 'F Major', 'F Minor', 
  'F# Major', 'F# Minor', 'G Major', 'G Minor', 
  'G# Major', 'G# Minor', 'A Major', 'A Minor', 
  'A# Major', 'A# Minor', 'B Major', 'B Minor',
];

interface Song {
  id: string;
  name: string;
  author: string;
  tone: string;
  notes: string;
  user: string;
  createdAt: string;
  updatedAt: string;
}

const SearchSongs: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [author, setAuthor] = useState<string>('');
  const [tone, setTone] = useState<string>('');
  const [songs, setSongs] = useState<Song[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
 
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white border border-blue-400 rounded-lg">
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

      {error && <p className="text-red-500 mt-4">{error}</p>}

      <div className="mt-6">
        {songs.length > 0 && (
          <ul>
            {songs.map((song) => (
              <li key={song.id} className="border-b border-gray-200 py-2">
                <p className="text-lg font-semibold">{song.name}</p>
                <p className="text-gray-600">Author: {song.author}</p>
                <p className="text-gray-600">Tone: {song.tone}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SearchSongs;
