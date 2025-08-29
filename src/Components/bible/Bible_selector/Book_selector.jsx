import {
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@heroui/react";
import { useContext, useEffect, useState } from "react";
import { newBooks, oldBooks, BOOK_TYPES } from "../bible_constants";
import Books_Types from "./Books_Types";
import "./book_selector.css";
import { BibleStateProvider } from "../../../Context/Bible_context";
import { BIBLE_STRINGS } from "../en_ar";

const Book_selector = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [bookType, setBookType] = useState(BOOK_TYPES.OLD);
  const { bible_state, setBible_state } = useContext(BibleStateProvider);
  // const [search, setSearch] = useState("");
  const handleBookType = (type) => setBookType(type);
  useEffect(() => {
    setBible_state((prev) => ({ ...prev, closeModalAction: onClose }));
  }, []);
  return (
    <>
      <div
        onClick={onOpen}
        className="book_selector border-2 shadow-md w-[85%] m-auto text-center font-bold text-xl rounded-2xl py-2 translate-y-[-5px] active:translate-y-0 transition active:shadow-none"
      >
        {bible_state.selectedPassage
          ? bible_state.selectedPassage
          : BIBLE_STRINGS.ChooseChapter[bible_state.selectedLang]}
      </div>
      <Modal
        dir={bible_state.selectedLang === "en" ? "ltr" : "rtl"}
        className="h-[60vh]"
        backdrop={"blur"}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-3">
                <div className="flex justify-evenly items-center w-full">
                  <p className="font-bold text-3xl">
                    {BIBLE_STRINGS.BibleBooks[bible_state.selectedLang]}
                  </p>
                  <div className="book_type  border-3 p-2 rounded-xl">
                    <span
                      className={`${bookType === BOOK_TYPES.OLD && "active"}`}
                      onClick={() => handleBookType(BOOK_TYPES.OLD)}
                    >
                      {bible_state.selectedLang === "en" ? "Old" : "قديم"}
                    </span>
                    <span
                      className={`${bookType === BOOK_TYPES.NEW && "active"}`}
                      onClick={() => handleBookType(BOOK_TYPES.NEW)}
                    >
                      {bible_state.selectedLang === "en" ? "New" : "جديد"}
                    </span>
                    <div
                      className="book_type_active"
                      style={{
                        [bible_state.selectedLang === "en" ? "left" : "right"]:
                          bookType === BOOK_TYPES.OLD ? "-10%" : "50%",
                      }}
                    ></div>
                  </div>
                </div>
                {/* <Input
                  type="text"
                  label="Email"
                  placeholder="Enter Book Name"
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                /> */}
              </ModalHeader>
              <ModalBody className="overflow-y-scroll relative">
                {bookType === BOOK_TYPES.OLD ? (
                  <Books_Types lang={bible_state.selectedLang} books={oldBooks} />
                ) : (
                  <Books_Types lang={bible_state.selectedLang} books={newBooks} />
                )}
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default Book_selector;
