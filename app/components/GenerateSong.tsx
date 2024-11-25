import React, { useState } from "react";
import { generateSong } from "~/handlers/generateSong";
import { useAlert } from "~/context/AlertContext";
import { useSongStore } from "~/store";
import { useNavigate } from "@remix-run/react";
import { useTranslation } from "react-i18next";

const GenerateTone = () => {
  const [localTone, setLocalTone] = useState<string>("");
  const [localTitle, setLocalTitle] = useState<string>("");
  const [localAuthor, setLocalAuthor] = useState<string>("");
  const { showAlert } = useAlert();

  const { t } = useTranslation("translation");

  const { setSong, setName, setTone, setAuthor } = useSongStore();
  const navigate = useNavigate();

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
        navigate("/player/none");
      }, 5000);
    } catch (error: any) {
      showAlert(error.message, "warning", true);
    }
  };

  return (
    <div id="generate-song">
      <div className="p-8 bg-gradient-to-r from-blue-600 to-blue-500 rounded-lg h-[80vh] flex flex-col items-center justify-center font-montserrat font-bold">
        <form onSubmit={handleGenerate}>
          <div className="mb-4">
            <label
              className="block text-white text-[3vh] font-bold mb-2"
              htmlFor="title"
            >
              {t("generate.title")}
            </label>
            <input
              type="text"
              id="title"
              placeholder={t("generate.titleInput")}
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
              {t("generate.author")}
            </label>
            <input
              type="text"
              id="author"
              placeholder={t("generate.authorInput")}
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
              {t("generate.tone")}
            </label>
            <select
              id="tone"
              value={localTone}
              onChange={(e) => setLocalTone(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded bg-white text-gray-700 text-[2vh]"
              defaultValue=""
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

          <div className="w-full flex justify-center">
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded-md text-[2vh] hover:bg-green-500 font-pacifico"
            >
              {t("generate.generate")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GenerateTone;
