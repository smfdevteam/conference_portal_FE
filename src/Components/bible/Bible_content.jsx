import { useNavigate, useParams } from "react-router-dom";
import { BIBLES } from "./bible_constants";
import Book_selector from "./Bible_selector/Book_selector";

const Bible_content = () => {
  const { language } = useParams();
  const navigate = useNavigate()
  if (!BIBLES[language]) navigate('/not-found')
  return <Book_selector/>;
};

export default Bible_content;
