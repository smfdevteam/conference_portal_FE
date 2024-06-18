import { Input } from "@nextui-org/react";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { getHymnLyrics, getHymnsTitles } from "../../Api/hymns.service";
import Lyrics from "./Lyrics";
const cacheMap = new Map();
const selectedLyricsMap = new Map();
const Hymns = () => {
  const [hymnsTitle, setHymnsTitles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLyrics, setSelectedLyrics] = useState(null);
  const getTitles = async () => {
    const hymns = localStorage.getItem("hymns_titles");
    if (hymns) {
      setHymnsTitles(JSON.parse(hymns));
    } else {
      try {
        const titles = await getHymnsTitles();
        setHymnsTitles(titles);
        localStorage.setItem("hymns_titles", JSON.stringify(titles));
      } catch (e) {
        toast.error("حصل حاجة غلط , اعمل ريفريش");
      }
    }
  };

  const filteredHymns = useMemo(() => {
    if (!searchTerm) return [];
    if (cacheMap.get(searchTerm)) {
      return cacheMap.get(searchTerm);
    } else {
      const filtered = hymnsTitle.filter((hymn) =>
        hymn.title.startsWith(searchTerm)
      );
      cacheMap.set(searchTerm, filtered);
      return filtered;
    }
  }, [searchTerm, hymnsTitle]);

  const getHymn = async (hymn) => {
    if (selectedLyricsMap.get(hymn.hymnId)) {
      setSelectedLyrics(selectedLyricsMap.get(hymn.hymnId));
    } else {
      const lyrics = await getHymnLyrics(hymn.hymnId);
      selectedLyricsMap.set(hymn.hymnId, lyrics);
      setSelectedLyrics(lyrics);
    }
    setSearchTerm("");
  };

  useEffect(() => {
    getTitles();

    return () => {
      cacheMap.clear();
    };
  }, []);

  return (
    <>
      <p className="text-center text-3xl font-bold">الترانيم</p>
      <p className="text-md text-center">
        هنا في اكتر من
        <span className="mx-2 text-purple-800 font-bold">9500</span>
        ترنيمة{" "}
      </p>
      <p className="text-center text-sm font-bold my-3">
        الرجاء مراعات الهمزات في كتابة الأسماء علي سبيل المثال
        <p className="text-sm text-red-500">
          " إلهنا عظيم " بدلا من "الهنا عظيم"
        </p>
      </p>

      <Input
        type="text"
        label="دور علي الترنيمة"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ul
        className="max-h-[200px] overflow-y-scroll my-2 text-right grid gap-1 text-lg font-bold"
        dir="rtl"
      >
        {filteredHymns.map((hymn) => (
          <li
            onClick={() => getHymn(hymn)}
            className="border-1 py-3 px-2 rounded-lg shadow-sm my-2 hover:bg-purple-700 hover:text-white transition"
            key={hymn.hymnId}
          >
            {hymn.title}
          </li>
        ))}
      </ul>
      {selectedLyrics && <Lyrics hymn_lyrics={selectedLyrics} />}
    </>
  );
};

export default Hymns;
