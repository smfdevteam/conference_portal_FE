import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import axios from "axios";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { BIBLE_SEARCH, getArabicPassage } from "../bible_constants";
import Full_Screen_Skeleton_Loader from "../../shared/Full_Screen_Skeleton_Loader";
const Bible_search = () => {
  const [bibleState, setBibleState] = useState(null);
  const [wordState, setwordState] = useState("");
  const searchRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState([]);
  // const getArabicRefrence = (text) => {
  //   let textSplitted = text.split(" ");
  //   if (textSplitted.length === 3) {
  //     let mainPassage = `${textSplitted[0]} ${textSplitted[1]}`;
  //     let rtlLabel = textSplitted[2].split(":").reverse().join(":");
  //     let arabicPassage = getArabicPassage(mainPassage).arabic_passage;
  //     return `${arabicPassage} ${rtlLabel}`;
  //   } else {
  //     let mainPassage = textSplitted[0];
  //     let rtlLabel = textSplitted[1].split(":").reverse().join(":");
  //     let arabicPassage = getArabicPassage(mainPassage).arabic_passage;

  //     return `${arabicPassage} ${rtlLabel}`;
  //   }
  // };
  const getSearch = async () => {
    if (searchRef.current.value.trim()!="" && searchRef.current.value !== wordState) {
      try {
        setwordState(searchRef.current.value);
        setResults([]);
        setIsLoading(true);
        const url = `https://api.biblia.com/v1/bible/search/${bibleState.currentKey}.js?query=${searchRef.current.value}&mode=verse&start=0&&key=18e1aef45cf119afe94336aaba5dca53`;
        const result = await axios.get(url);
        setResults(result.data.results);
      } catch (e) {
        setwordState("");
        toast.error('جرب تاني او اتأكد  انك حاطط كل البيانات');
      } finally {
        setIsLoading(false);
      }
    } else {
      toast.error('كمل البيانات')
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
        <Input type="text" label="الكلمة " ref={searchRef} />
        <Button
          variant="solid"
          color={isLoading ? "default" : "primary"}
          onPress={getSearch}
        >
          <p>إبحث</p>
        </Button>
      </div>
      {isLoading && <Full_Screen_Skeleton_Loader />}
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
