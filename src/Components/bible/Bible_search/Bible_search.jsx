import { Select, SelectItem, Input, Button, Spinner } from "@nextui-org/react";
import { useState } from "react";
import { BIBLE_SEARCH, getArabicPassage } from "../bible_constants";
import axios from "axios";
import toast from "react-hot-toast";
const Bible_search = () => {
  const [bibleState, setBibleState] = useState(null);
  const [wordState, setwordState] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState([]);
  const getArabicRefrence = (text) => {
    let textSplitted = text.split(" ");
    if (textSplitted.length === 3) {
      let mainPassage = `${textSplitted[0]} ${textSplitted[1]}`;
      let rtlLabel = textSplitted[2].split(":").reverse().join(":");
      let arabicPassage = getArabicPassage(mainPassage).arabic_passage;
      return `${arabicPassage} ${rtlLabel}`;
    } else {
      let mainPassage = textSplitted[0];
      let rtlLabel = textSplitted[1].split(":").reverse().join(":");
      let arabicPassage = getArabicPassage(mainPassage).arabic_passage;

      return `${arabicPassage} ${rtlLabel}`;
    }
  };
  const getSearch = async () => {
    try {
      setIsLoading(true);
      const url = `https://api.biblia.com/v1/bible/search/${bibleState.currentKey}.js?query=${wordState}&mode=verse&start=0&&key=18e1aef45cf119afe94336aaba5dca53`;
      const result = await axios.get(url);
      setResults(result.data.results);
    } catch (e) {
      toast.error(e.message);
    } finally {
      setIsLoading(false);
    }
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
        <Button
          variant="solid"
          color={isLoading ? "default" : "primary"}
          onPress={getSearch}
        >
          <p>إبحث</p>
          {isLoading && <Spinner size="sm" color={"warning"} />}
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
                <div
                  dir={bibleState.currentKey === "asv" ? "ltr" : "rtl"}
                  key={title}
                  className="border-2 rounded-lg p-3 animate-fly"
                >
                  <p className="text-xl">{preview}</p>
                  <p className="font-bold" dir="ltr">
                    {title}
                  </p>
                </div>
              );
            }
          })}
      </div>
    </>
  );
};

export default Bible_search;
