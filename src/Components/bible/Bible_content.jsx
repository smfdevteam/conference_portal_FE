import { useNavigate, useParams } from "react-router-dom";
import Bible_Passage_viewer from "./Bible_Passage_viewer";
import Bible_Loader from "./Bible_loader/Bible_Loader";
import Book_selector from "./Bible_selector/Book_selector";
import { BIBLES } from "./bible_constants";
const Bible_content = () => {
  const { language } = useParams();
  const navigate = useNavigate();
  if (!BIBLES[language]) navigate("/not-found");
  return (
    <div dir="ltr">
      <Bible_Loader />
      <Book_selector />;
      <Bible_Passage_viewer/>
    </div>
  );
};

export default Bible_content;
