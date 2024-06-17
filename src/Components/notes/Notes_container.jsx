import { Suspense, lazy } from "react";
import Skeleton_Loader from "../shared/Skeleton_Loader";
const Note_Card = lazy(() => import("./Note_Card"));

const Notes_container = ({ notes }) => {
  return (
    <section className="mt-4 grid gap-3">
      {notes.map((note) => (
        <Suspense key={note.noteId} fallback={Skeleton_Loader}>
          <Note_Card note={note} />
        </Suspense>
      ))}
    </section>
  );
};

export default Notes_container;
