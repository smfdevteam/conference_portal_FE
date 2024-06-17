import { useEffect, useMemo, useState } from "react";
import { getHymnsTitles } from "../../Api/hymns.service";
import { Input } from "@nextui-org/react";
import { FixedSizeList as List } from "react-window";
import toast from "react-hot-toast";
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
    return hymnsTitle.filter((hymn) =>
      hymn.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, hymnsTitle]);

  const getHymn = (title) => {
    const { hymnId } = hymnsTitle.find((hymn) => hymn.title === title);
    alert(hymnId);
  };

  useEffect(() => {
    getTitles();
  }, []);
  return (
    <>
      <Input
        type="text"
        label="دور علي الترنيمة"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ul
        className="max-h-[200px] overflow-y-scroll my-4 text-right grid gap-3 text-lg font-bold"
        dir="rtl"
      >
        <List
          height={200}
          itemCount={filteredHymns.length}
          itemSize={35} // Adjust based on your list item height
          width="100%"
        >
          {({ index }) => (
            <li
              onClick={() => getHymn(filteredHymns[index].title)}
              className="border-1 py-3 px-2 rounded-lg shadow-sm my-2 hover:bg-purple-700 hover:text-white transition"
              key={filteredHymns[index].hymnId}
            >
              {filteredHymns[index].title}
            </li>
          )}
        </List>
      </ul>
    </>
  );
};

export default Hymns;
