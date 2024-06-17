import { Suspense, lazy, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getAllGuestNotes } from "../../Api/notes.service";
import Add_Note from "../../Components/notes/Add_Note";
import Full_Screen_Skeleton_Loader from "../../Components/shared/Full_Screen_Skeleton_Loader";
const Notes_container = lazy(() =>
  import("../../Components/notes/Notes_container")
);
const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const getNotes = async () => {
    try {
      setIsLoading(true);
      const notesRes = await getAllGuestNotes();
      setNotes(notesRes);
    } catch (e) {
      toast.error("حاول تعيد تحميل الصفحة");
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getNotes();
  }, []);
  return (
    <section>
      <header className="flex justify-center flex-col  items-center gap-4">
        <h1 className="text-center text-3xl font-bold ">ملاحظاتي</h1>
        <p className="text-center">هنا النوتة بتاعتك , تقدر تسجل كل حاجة في المؤتمر هنا و كمان تشيرها مع أصحابك</p>
      </header>
      {!isLoading ? (
        <>
          <Add_Note getAllNotes={getNotes} />
          <Suspense fallback={<Full_Screen_Skeleton_Loader/>}>
            <Notes_container notes={notes}/>
          </Suspense>
        </>
      ) : (
        <Full_Screen_Skeleton_Loader />
      )}
    </section>
  );
};

export default Notes;
