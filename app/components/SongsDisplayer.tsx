import React, { useState } from 'react';
import {useSongsListStore, useSongSelected} from '~/store/index';
import { useNavigate } from '@remix-run/react';

type Song = {
  id: string;
  name: string;
  author: string;
  tone: string;
};

const SongsDisplayer = () => {

  const {songs} = useSongsListStore()
  const {setSongSelected} = useSongSelected()
  const navigate = useNavigate()

  const songsPerPage = 5; 
  const [currentPage, setCurrentPage] = useState(0);

  const indexOfLastSong = (currentPage + 1) * songsPerPage;
  const indexOfFirstSong = currentPage * songsPerPage;
  const currentSongs = songs.slice(indexOfFirstSong, indexOfLastSong);

  const handleNextPage = () => {
    if (indexOfLastSong < songs.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleSelectSong = (song:Song) => {
    setSongSelected(song)
    navigate(`/player/${song.id}`)
  }

  return (
    <div className="flex flex-col items-center p-8 rounded-lg border border-blue-400 max-w-lg mx-auto shadow-lg pl-24 pr-24 h-[28rem] text-black">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Song List</h2>
      
      <table className="w-[26rem] text-left bg-white border border-gray-300 rounded-md h-[16rem]">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b">Title</th>
            <th className="px-4 py-2 border-b">Author</th>
            <th className="px-4 py-2 border-b">Tone</th>
          </tr>
        </thead>
        <tbody>
          {currentSongs.map((song) => (
            <tr 
              key={song.id} 
              className="cursor-pointer hover:bg-blue-100"
              onClick={() => handleSelectSong(song)}
            >
              <td className="px-4 py-2 border-b">{song.name}</td>
              <td className="px-4 py-2 border-b">{song.author}</td>
              <td className="px-4 py-2 border-b">{song.tone}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-between w-[26rem] mt-4">
        <button 
          onClick={handlePreviousPage} 
          disabled={currentPage === 0} 
          className="w-24 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        <h2 className='text-black mt-2'>{currentPage}</h2>
        <button 
          onClick={handleNextPage} 
          disabled={indexOfLastSong >= songs.length} 
          className="w-24 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default SongsDisplayer;
