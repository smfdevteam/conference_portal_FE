import { useContext } from "react";
import "./Bible_loader.css";
import { BibleStateProvider } from "../../../Context/Bible_context";
const Bible_Loader = () => {
  const { bible_state } = useContext(BibleStateProvider);
  return (
    <>
      {bible_state.isLoading && (
        <div className="bg-white  absolute z-[1000] rounded-xl shadow-xl h-full w-full top-0 left-0 right-0">
          <div className="spinner-container">
            <div className="spinner">
              <div className="spinner">
                <div className="spinner">
                  <div className="spinner">
                    <div className="spinner">
                      <div className="spinner"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <p className="text-center text-2xl font-bold ">بنحمل ليك الإصحاح المطلوب </p>
        </div>
      )}
    </>
  );
};

export default Bible_Loader;
