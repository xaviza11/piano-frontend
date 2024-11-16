import React, { useState } from 'react';
import { useSongsListStore, useSongSelected } from '~/store/index';
import { useNavigate } from '@remix-run/react';
import { useTranslation } from 'react-i18next';

type Song = {
  id: string;
  name: string;
  author: string;
  tone: string;
};

const SongsDisplayer = () => {
  const { songs } = useSongsListStore();
  const { setSongSelected } = useSongSelected();
  const navigate = useNavigate();

  const songsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(0);

  const {t} = useTranslation('translation')

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

  const handleSelectSong = (song: Song) => {
    setSongSelected(song);
    navigate(`/player/${song.id}`);
  };

  return (
    <div className="flex flex-col items-center p-2 rounded-lg max-w-lg mx-auto h-[74vh] md:h-[65vh] text-black w-[60vw] md:w-[60vw] lg:w-[40vw] bg-gradient-to-r from-blue-600 to-blue-500 font-montserrat font-bold">
      <h2 className="text-[1em] md:text-2xl font-bold text-white mb-1 font-pacifico md:mt-4 ">{t('list.title')}</h2>

      <table className="w-[50vw] md:w-[50vw] lg:w-[35vw] text-left bg-white border border-gray-300 rounded-md h-[35vh] ">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b text-[0.6em] md:text-base">{t('list.name')}</th>
            <th className="px-4 py-2 border-b text-[0.6em] md:text-base">{t('list.author')}</th>
            <th className="px-4 py-2 border-b text-[0.6em] md:text-base">{t('list.tone')}</th>
          </tr>
        </thead>
        <tbody>
          {currentSongs.map((song) => (
            <tr
              key={song.id}
              className="cursor-pointer hover:bg-blue-100"
              onClick={() => handleSelectSong(song)}
            >
              <td className="px-4 py-2 border-b text-[0.4em] md:text-base">{song.name}</td>
              <td className="px-4 py-2 border-b text-[0.4em] md:text-base">{song.author}</td>
              <td className="px-4 py-2 border-b text-[0.4em] md:text-base">{song.tone}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-between w-[50vw] md:w-[50vw] lg:w-[35vw] mt-4">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 0}
          className="w-24 py-1 bg-green-600 text-white rounded-md hover:bg-green-500 text-[3vh] md:text-[2vh]"
        >
         {t('list.previous')}
        </button>
        <h2 className="text-white mt-2">{currentPage}</h2>
        <button
          onClick={handleNextPage}
          disabled={indexOfLastSong >= songs.length}
          className="w-24 py-1 bg-green-600 text-white rounded-md hover:bg-green-500 text-[3vh] md:text-[2vh]"
        >
          {t('list.next')}
        </button>
      </div>
    </div>
  );
};

export default SongsDisplayer;
