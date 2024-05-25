import Book_Accordion from "./Book_Accordion";

const Books_Types = ({ books }) =>
  books.map((book) => (
    <Book_Accordion
      key={book.passage}
      chapters_length={book.chapters.length}
      passage={book.passage}
    />
  ));

export default Books_Types;
