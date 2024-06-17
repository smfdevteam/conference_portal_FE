import { Tooltip } from "@nextui-org/tooltip";
import React, { Suspense, lazy, useEffect, useState } from "react";
import Add_Note from "../../Components/notes/Add_Note";
import { getAllGuestNotes } from "../../Api/notes.service";
import toast from "react-hot-toast";
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
      <header className="flex justify-center items-center gap-4">
        <h1 className="text-center text-3xl font-bold ">ملاحظاتي</h1>

        <Tooltip
          placement={"bottom-start"}
          content={
            <ol className="text-2xl flex flex-col gap-4 py-2">
              <li className="border-3 rounded-lg p-2">
                تقدر تسجل كل ملاحظاتك هنا علشان تفتكرها كل مؤتمر
              </li>
              <li className="border-3 rounded-lg p-2">
                تقدر تشغل الشير جنب كل ملاحظة لو عايزها تظهر لأصحابك علي
                البروفايل اللي عامله شير معاهم{" "}
              </li>
              <li className="border-3 rounded-lg p-2">
                صحابك يقدروا يعملوا لايك عليها
              </li>
            </ol>
          }
          color="secondary"
        >
          <p className="text-center w-[40px] pt-3 font-bold border-purple-700 shadow-lg flex justify-center items-center  h-[40px] rounded-full border-2">
            ؟
          </p>
        </Tooltip>
      </header>
      {!isLoading ? (
        <>
          <Add_Note getAllNotes={getNotes} />
          <Suspense fallback={<Full_Screen_Skeleton_Loader/>}>
            <Notes_container notes={notes} />
          </Suspense>
        </>
      ) : (
        <Full_Screen_Skeleton_Loader />
      )}
    </section>
  );
};

export default Notes;
