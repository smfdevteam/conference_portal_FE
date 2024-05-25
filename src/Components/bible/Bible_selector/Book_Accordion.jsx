import { Accordion, AccordionItem } from "@nextui-org/react";
import axios from "axios";
import { useContext } from "react";
import { BibleStateProvider } from "../../../Context/Bible_context";
import toast from "react-hot-toast";
import { BIBLES, getEnglishPassage } from "../bible_constants";
const Book_Accordion = ({ passage, chapters_length }) => {
  const { bible_state, setBible_state } = useContext(BibleStateProvider);
  const geChapter = async (chapter, index) => {
    if (bible_state.isLoading) {
      toast.error("احنا لسة بنحمل الاصحاح المطلوب", {
        style: {
          background: "yellow",
          width: "300px",
        },
      });
    } else {
      try {
        const bible = bible_state.selectedLang === 'en' ? BIBLES.asv : BIBLES["ar-vandyke"]
        let style = 'orationOneVersePerLine'
        if(bible_state.selectedLang === 'ar') {
          chapter = getEnglishPassage(chapter).passage
        }
        setBible_state((prev) => ({ ...prev, isLoading: true }));
        const url = `https://api.biblia.com/v1/bible/content/${bible}.html?passage=${
          chapter + (index + 1)
        }&fullText=true&style=${style}&key=18e1aef45cf119afe94336aaba5dca53`;
        const content = await axios.get(url);
        setBible_state((prev) => ({
          ...prev,
          passageContent: content.data,
          selectedPassage: `${passage} ${index + 1}`,
        }));
        bible_state.closeModalAction();
      } catch (e) {
        toast.error(e.message);
      } finally {
        setBible_state((prev) => ({ ...prev, isLoading: false }));
        toast.dismiss();
      }
    }
  };
  return (
    <Accordion>
      <AccordionItem
        className="font-bold"
        aria-label={passage}
        subtitle={`${chapters_length} ${bible_state.selectedLang === 'en' ? 'Chapters' : 'إصحاح'}`}
        title={passage}
      >
        <div className="grid grid-cols-5 gap-4">
          {Array.from({ length: chapters_length }, (_, idx) => {
            return (
              <div
                onClick={() => geChapter(passage, idx)}
                className="hover:bg-black hover:text-white transition border-1 bg-slate-50 w-[50px] flex items-center justify-center font-bold text-2xl h-[50px] rounded-md shadow-md text-center"
                key={idx}
              >
                <p>{idx + 1}</p>
              </div>
            );
          })}
        </div>
      </AccordionItem>
    </Accordion>
  );
};

export default Book_Accordion;
