import { Card, CardBody, CardHeader, Image } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getNoteById } from "../../Api/notes.service";
import toast from "react-hot-toast";
import Full_Screen_Skeleton_Loader from "../../Components/shared/Full_Screen_Skeleton_Loader";
const Shared_Notes = () => {
  const { noteId } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState(null);
  const getNote = async () => {
    try {
      toast.loading();
      const note = await getNoteById(noteId);
      setNote(note);
    } catch (e) {
      navigate("/not-found");
    } finally {
      toast.dismiss();
    }
  };
  useEffect(() => {
    getNote();
  }, []);
  return (
    note ? (
      <Card className="py-4 w-full" dir="ltr">
        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start overflow-y-scroll">
          <p className="text-tiny uppercase font-bold">{note.name}</p>
          <small className="text-default-500">{note.creationTime}</small>
          <h4 className="font-bold text-large text-center">{note.note}</h4>
        </CardHeader>
        <CardBody className="overflow-visible py-2">
          <Image
            alt="Card background"
            className="object-cover rounded-xl"
            src={note.picture}
          />
        </CardBody>
      </Card>
    ) : <Full_Screen_Skeleton_Loader/>
  );
};

export default Shared_Notes;
