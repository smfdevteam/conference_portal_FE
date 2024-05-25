import { useContext } from "react";
import "./Bible_loader.css";
import { BibleStateProvider } from "../../../Context/Bible_context";
const Bible_Loader = () => {
  const { bible_state } = useContext(BibleStateProvider); 
  // const bible_state = {
  //   isLoading : true
  // }
  return (
    <>
      {bible_state.isLoading && (
        <div className="absolute inset-0 rounded-2xl z-[1000] bg-white flex items-center">
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
        </div>
      )}
    </>
  );
};

export default Bible_Loader;
