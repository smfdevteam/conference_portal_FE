import { Input } from "@nextui-org/react";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { getHymnsTitles } from "../../Api/hymns.service";
const cacheMap = new Map();
const Hymns = () => {
  const [hymnsTitle, setHymnsTitles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
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

  const getHymn = (hymn) => {
    alert(hymn.hymnId);
  };

  useEffect(() => {
    getTitles();
  }, []);
  return (
    <>
      <p className="text-center text-3xl font-bold">الترانيم</p>
      <p className="text-md text-center">هنا في اكتر من 9500 ترنيمة </p>
      <p className="text-sm text-danger-400 text-center mb-3 w-[60%] m-auto">ممكن الترنيمة تتأخر شوية علشان تحمل علي حسب نوع الموبايل </p>
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
    </>
  );
};

export default Hymns;
