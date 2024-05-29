import React, { createContext, useState } from "react";
export const BibleStateProvider = createContext();

const Bible_context = ({ children }) => {
  const [bible_state, setBible_state] = useState({
    isLoading: false,
    selectedPassage: "",
    selectedLang:"" ,
    passageContent:"" , 
    closeModalAction :null ,
    isSearchViewerLoading:false 
  });
  return (
    <BibleStateProvider.Provider
      value={{
        bible_state,
        setBible_state,
      }}
    >
      {children}
    </BibleStateProvider.Provider>
  );
};

export default Bible_context;
