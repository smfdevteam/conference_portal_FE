import {
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { useContext, useEffect, useState } from "react";
import { newBooks, oldBooks, BOOK_TYPES } from "../bible_constants";
import Books_Types from "./Books_Types";
import "./book_selector.css";
import { BibleStateProvider } from "../../../Context/Bible_context";

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
          : "Choose Chapter"}
      </div>
      <Modal
        dir="ltr"
        className="h-[70vh]"
        backdrop={"blur"}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-3">
                <div className="flex justify-evenly items-center w-full">
                  <p className="font-bold text-3xl">Bible Books</p>
                  <div className="book_type  border-3 p-2 rounded-xl">
                    <span
                      className={`${bookType === BOOK_TYPES.OLD && "active"}`}
                      onClick={() => handleBookType(BOOK_TYPES.OLD)}
                    >
                      Old
                    </span>
                    <span
                      className={`${bookType === BOOK_TYPES.NEW && "active"}`}
                      onClick={() => handleBookType(BOOK_TYPES.NEW)}
                    >
                      New
                    </span>
                    <div
                      className="book_type_active"
                      style={{
                        left: bookType === BOOK_TYPES.OLD ? "-10%" : "50%",
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
                  <Books_Types books={oldBooks} />
                ) : (
                  <Books_Types books={newBooks} />
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
