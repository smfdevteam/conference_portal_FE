import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Skeleton,
  useDisclosure,
} from "@nextui-org/react";
import { Accordion, AccordionItem } from "@nextui-org/react";
import { BIBLE_MAP, BOOK_TYPES } from "../bible_constants";
import "./book_selector.css";
import { useState } from "react";
const Book_selector = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [bookType, setBookType] = useState("old");
  const handleBookType = (type) => setBookType(type);
  return (
    <>
      <div
        onClick={onOpen}
        className="book_selector border-2 shadow-md w-[85%] m-auto text-center font-bold text-xl rounded-2xl py-2 translate-y-[-5px] active:translate-y-0 transition active:shadow-none"
      >
        John 1
      </div>
      <Modal
        dir="ltr"
        className="h-[700px]"
        backdrop={"blur"}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex justify-evenly items-center">
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
              </ModalHeader>
              <ModalBody className="overflow-y-scroll relative">
                {BIBLE_MAP.books.map((book, index) => {
                  if (book.type === bookType)
                    return (
                      <Accordion key={book.passage}>
                        <AccordionItem
                          key={index}
                          className="font-bold"
                          aria-label={book.passage}
                          subtitle={`${book.chapters.length} Chapters`}
                          title={book.passage}
                        >
                          <div className="grid grid-cols-5 gap-4">
                            {book.chapters.map((_, index) => {
                              return (
                                <div
                                  className="hover:bg-black hover:text-white transition border-1 bg-slate-50 w-[50px] flex items-center justify-center font-bold text-2xl h-[50px] rounded-md shadow-md text-center"
                                  key={_.passage}
                                >
                                  <p title={_.passage}>{index + 1}</p>
                                </div>
                              );
                            })}
                          </div>
                        </AccordionItem>
                      </Accordion>
                    );
                })}
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default Book_selector;
