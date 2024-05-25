import { useContext } from "react";
import Safe_HTML from "../Safe_HTML";
import { BibleStateProvider } from "../../Context/Bible_context";

const Bible_Passage_viewer = () => {
  const { bible_state } = useContext(BibleStateProvider);
  return (
    <div className="text-xl">
      <Safe_HTML html={bible_state.passageContent} />
    </div>
  );
};

export default Bible_Passage_viewer;
