import React, { useState } from "react";
import { searchSongs } from "~/handlers/searchSongs";
import { useAlert } from "~/context/AlertContext";
import { useSongsListStore } from "~/store";
import { useTranslation } from "react-i18next";

const SearchSongs: React.FC = () => {
  const [name, setName] = useState<string | undefined>(undefined);
  const [author, setAuthor] = useState<string | undefined>(undefined);
  const [tone, setTone] = useState<string | undefined>(undefined);

  const { t } = useTranslation('translation');
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
          {t('searcher.author')}
        </label>
        <input
          type="text"
          id="author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder={t('searcher.authorInput')}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 text-black bg-white h-[1vh] md:h-[5vh]"
        />
      </div>

      <div className="mb-4">
        <label
          className="block text-white text-[3vh] font-bold mb-2"
          htmlFor="name"
        >
          {t('searcher.name')}
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={t('searcher.nameInput')}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 text-black bg-white h-[1vh] md:h-[5vh]"
        />
      </div>

      <div className="mb-4">
        <label
          className="block text-white text-[3vh] font-bold mb-2"
          htmlFor="tone"
        >
          {t('searcher.tone')}
        </label>
        <select
          id="tone"
          value={tone}
          onChange={(e) => setTone(e.target.value)}
          className="w-full px-3 py-1 md:py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 bg-white text-xs md:text-sm"
        >
          <option value="">{t('tones.choose')}</option>
          <optgroup label={t("tones.major")}>
            <option value="C Major">{t("tones.C")} {t("tones.major")}</option>
            <option value="C# Major">{t("tones.C#")} {t("tones.major")}</option>
            <option value="D Major">{t("tones.D")} {t("tones.major")}</option>
            <option value="D# Major">{t("tones.D#")} {t("tones.major")}</option>
            <option value="E Major">{t("tones.E")} {t("tones.major")}</option>
            <option value="F Major">{t("tones.F")} {t("tones.major")}</option>
            <option value="F# Major">{t("tones.F#")} {t("tones.major")}</option>
            <option value="G Major">{t("tones.G")} {t("tones.major")}</option>
            <option value="G# Major">{t("tones.G#")} {t("tones.major")}</option>
            <option value="A Major">{t("tones.A")} {t("tones.major")}</option>
            <option value="A# Major">{t("tones.A#")} {t("tones.major")}</option>
            <option value="B Major">{t("tones.B")} {t("tones.major")}</option>
          </optgroup>
          <optgroup label={t("tones.minor")}>
            <option value="C Minor">{t("tones.C")} {t("tones.minor")}</option>
            <option value="C# Minor">{t("tones.C#")} {t("tones.minor")}</option>
            <option value="D Minor">{t("tones.D")} {t("tones.minor")}</option>
            <option value="D# Minor">{t("tones.D#")} {t("tones.minor")}</option>
            <option value="E Minor">{t("tones.E")} {t("tones.minor")}</option>
            <option value="F Minor">{t("tones.F")} {t("tones.minor")}</option>
            <option value="F# Minor">{t("tones.F#")} {t("tones.minor")}</option>
            <option value="G Minor">{t("tones.G")} {t("tones.minor")}</option>
            <option value="G# Minor">{t("tones.G#")} {t("tones.minor")}</option>
            <option value="A Minor">{t("tones.A")} {t("tones.minor")}</option>
            <option value="A# Minor">{t("tones.A#")} {t("tones.minor")}</option>
            <option value="B Minor">{t("tones.B")} {t("tones.minor")}</option>
          </optgroup>
        </select>
      </div>

      <div className="flex justify-center w-full">
        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-green-600 text-white rounded-md text-[2vh] hover:bg-green-500 font-pacifico"
        >
          {t('searcher.search')}
        </button>
      </div>
    </div>
  );
};

export default SearchSongs;
