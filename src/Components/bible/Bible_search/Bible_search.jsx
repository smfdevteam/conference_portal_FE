import { Select, SelectItem, Input, Button } from "@nextui-org/react";
import { useState } from "react";
import { BIBLE_SEARCH, getArabicPassage } from "../bible_constants";
import axios from "axios";
const Bible_search = () => {
  const [bibleState, setBibleState] = useState(null);
  const [wordState, setwordState] = useState(null);
  const [results, setResults] = useState([]);
  const getSearch = async () => {
    const url = `https://api.biblia.com/v1/bible/search/${"ar-vandyke"}.js?query=${wordState}&mode=verse&start=0&&key=18e1aef45cf119afe94336aaba5dca53`;
    const result = await axios.get(url);
    setResults(result.data.results);
  };
  return (
    <>
      <div className="flex flex-col gap-4">
        <Select
          size="sm"
          label="الترجمة"
          onSelectionChange={setBibleState}
          errorMessage="dsadasdasdasdas"
        >
          {BIBLE_SEARCH.map((value) => (
            <SelectItem
              key={value.bible}
              value={value.bible}
              className="capitalize"
            >
              {value.lang}
            </SelectItem>
          ))}
        </Select>
        <Input
          type="text"
          label="الكلمة "
          onChange={(e) => setwordState(e.target.value)}
        />
        <Button variant="solid" color="primary" onPress={getSearch}>
          إبحث
        </Button>
      </div>
      {results.length > 0 && (
        <p className="text-2xl my-5">
          لقد تم ايجاد
          <span className="text-3xl font-bold mx-2 border-3 border-yellow-300  p-2 rounded-full ">
            {results.length}
          </span>
          أية
        </p>
      )}
      <div className="flex flex-col gap-4 my-4 h-[70vh] overflow-y-scroll">
        {results &&
          results.map(({ title, preview }) => {
            if (title && preview) {
              return (
                <div key={title} className="border-2 rounded-lg p-3 animate-fly">
                  <p className="text-xl">{preview}</p>
                  <p className="font-bold" dir="ltr">{title}</p>
                </div>
              );
            }
          })}
      </div>
    </>
  );
};

export default Bible_search;
