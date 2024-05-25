import { Image } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { BIBLES } from "./bible_constants";
import { useContext } from "react";
import { BibleStateProvider } from "../../Context/Bible_context";

const Bible_main = () => {
  const { _, setBible_state } = useContext(BibleStateProvider);
  const navigate = useNavigate();
  const navigateTo = (link) => {
    setBible_state((prev) => ({
      ...prev,
      selectedPassage: "",
      selectedLang: "",
      passageContent: "",
    }));
    navigate(link);
  };
  return (
    <>
      <h2 className="text-5xl font-bold text-center">الكتاب المقدس</h2>
      <div className="flex font-bold gap-10 my-5 justify-center items-center">
        <div className="w-[45%]">
          <Image
            onClick={() => navigateTo(BIBLES["ar-vandyke"])}
            isBlurred
            width={150}
            src="https://covers.logoscdn.com/lls_1.0.290/cover.jpg"
            alt=""
          />
          <div className="bible_meta text-center text-lg my-3">
            <p>الكتاب المقدس </p>
            <p>النسخة العربية </p>
          </div>
        </div>
        <div className="w-[45%]">
          <Image
            onClick={() => navigateTo(BIBLES.asv)}
            isBlurred
            width={150}
            src="https://covers.logoscdn.com/lls_1.0.60/cover.jpg"
            alt=""
          />
          <div className="bible_meta text-center my-3">
            <p className="text-lg">Bible </p>
            <p className="text-sm">American Standard Version </p>
          </div>
        </div>
      </div>
      <div
        onClick={() => navigateTo('search')}
        className="border-4 transition hover:bg-zinc-800 hover:text-white animate-fly h-[20vh] flex items-center justify-center text-3xl font-bold shadow-lg rounded-3xl "
      >
        <p>ابحث في الكتاب المقدس</p>
      </div>
    </>
  );
};

export default Bible_main;
