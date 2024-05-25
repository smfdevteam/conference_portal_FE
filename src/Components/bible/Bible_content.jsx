import { useNavigate, useParams } from "react-router-dom";
import Bible_Passage_viewer from "./Bible_Passage_viewer";
import Book_selector from "./Bible_selector/Book_selector";
import { BIBLES } from "./bible_constants";
import { useContext, useEffect } from "react";
import { BibleStateProvider } from "../../Context/Bible_context";
import Bible_Loader from "./Bible_loader/Bible_Loader";
const Bible_content = () => {
  const { setBible_state } = useContext(BibleStateProvider);
  const { language } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    if (!BIBLES[language]) navigate("/not-found");
    setBible_state((prev) => ({
      ...prev,
      selectedLang: language === "asv" ? "en" : "ar",
    }));
  } , []);
  return (
    <>
      <Bible_Loader />
      <div dir={language === "asv" ? "ltr" : "rtl"}>
        <Book_selector />;
        <Bible_Passage_viewer />
      </div>
    </>
  );
};

export default Bible_content;
