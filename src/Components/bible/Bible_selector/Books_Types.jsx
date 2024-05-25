import Book_Accordion from "./Book_Accordion";

const Books_Types = ({ books , lang }) =>
  books.map((book) => (
    <Book_Accordion
      key={book.passage}
      chapters_length={book.chapters.length}
      passage={lang ==='en' ? book.passage : book.arabic_passage}
    />
  ));

export default Books_Types;
