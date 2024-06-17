import { Card, CardBody, CardHeader, Image } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getNoteById } from "../../Api/notes.service";
import toast from "react-hot-toast";
import Full_Screen_Skeleton_Loader from "../../Components/shared/Full_Screen_Skeleton_Loader";
const Shared_Notes = () => {
  const { noteId } = useParams();
  const [note, setNote] = useState(null);
  const getNote = async () => {
    try {
      toast.loading('بنجبلك البوست');
      const note = await getNoteById(noteId);
      setNote(note);
      toast.dismiss()
      toast.success('استمتع')
    } catch (e) {
      toast.error("حصل مشكلة");
    }
  };
  useEffect(() => {
    getNote();
  }, []);
  return note ? (
    <Card className="py-4 w-full" dir="ltr">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start overflow-y-scroll">
        <p className="text-3xl uppercase font-bold">{note.name}</p>
        <small className="text-default-500 text-lg">{note.creationTime}</small>
        <h4 className="font-bold text-large text-center">{note.note}</h4>
      </CardHeader>
      <CardBody className="overflow-visible py-2">
        <div className="flex items-center w-full">
          <Image
            alt="Card background"
            className="object-cover rounded-3xl border-5 border-purple-600"
            src={note.picture}
          />
        </div>
      </CardBody>
    </Card>
  ) : (
    <Full_Screen_Skeleton_Loader />
  );
};

export default Shared_Notes;
