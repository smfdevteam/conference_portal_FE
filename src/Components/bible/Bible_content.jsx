import { Progress } from "@heroui/react";
import { Suspense, lazy, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BibleStateProvider } from "../../Context/Bible_context";
import Bible_Passage_viewer from "./Bible_Passage_viewer";
import Bible_Loader from "./Bible_loader/Bible_Loader";
import { BIBLES } from "./bible_constants";
const Book_selector = lazy(() => import("./Bible_selector/Book_selector"));
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
  }, []);
  return (
    <>
      <Bible_Loader />
      <div dir={language === "asv" ? "ltr" : "rtl"}>
        <Suspense
          fallback={
            <Progress
              size="lg"
              isIndeterminate
              color="warning"
              aria-label="Loading..."
              className="w-full"
            />
          }
        >
          <Book_selector />
        </Suspense>
        <Bible_Passage_viewer />
      </div>
    </>
  );
};

export default Bible_content;
