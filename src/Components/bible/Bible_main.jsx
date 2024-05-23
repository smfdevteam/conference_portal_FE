import { Image } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { BIBLES } from "./bible_constants";
// BIBLE_API_KEY = "18e1aef45cf119afe94336aaba5dca53"
// Arabic
// BIBLE_TITLE = "ar-vandyke"
// IMAGE_URL = https://covers.logoscdn.com/lls_1.0.290/cover.jpg
// English
// BIBLE_TITLE = "asv"
// IMAGE_URL = https://covers.logoscdn.com/lls_1.0.60/cover.jpg
const Bible_main = () => {
  
  const navigate = useNavigate();
  const navigateTo = (link) => navigate(link);
  return (
    <>
      <h2 className="text-5xl font-bold text-center">الكتاب المقدس</h2>
      <div className="flex font-bold gap-10 my-5 justify-center items-center">
        <div>
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
        <div>
          <Image
            onClick={() => navigateTo(BIBLES.asv)}
            isBlurred
            width={150}
            src="https://covers.logoscdn.com/lls_1.0.60/cover.jpg"
            alt=""
          />
          <div className="bible_meta text-center my-3">
            <p className="text-lg">Bible </p>
            <p className="text-md">American Standard Version </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Bible_main;
