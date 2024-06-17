import {
  Card,
  CardBody,
  CardHeader,
  Divider,
  Image,
  Spinner,
} from "@nextui-org/react";
import { Suspense, lazy, useState } from "react";
const Note_Card_Modal = lazy(() => import("./Note_Card_Modal"));
const Note_Card = ({ note , getAllNotes }) => {
  const [isFav, setIsFav] = useState(note.isFav);
  const handleIsFavUI = (isFav) => {
    setIsFav(isFav);
  };
  return (
    <Card
      key={note.noteId}
      dir="ltr"
      className={isFav ? `border-2 border-danger-500` : ''}
    >
      <CardHeader className="flex gap-3 justify-between">
        <div className="flex gap-3">
          <Image
            alt="nextui logo"
            height={40}
            radius="sm"
            src={note.picture}
            width={40}
          />
          <div className="flex flex-col">
            <p className="text-md capitalize">{note.name}</p>
            <p className="text-small text-default-500">{note.creationTime}</p>
          </div>
        </div>
        <Suspense fallback={<Spinner color="secondary" />}>
          <Note_Card_Modal getAllNotes={getAllNotes} note={note} handleFav={handleIsFavUI} />
        </Suspense>
      </CardHeader>
      <Divider />
      <CardBody className="max-h-[200px] overflow-y-scroll">
        {/* <p className="text-center">{note.note}</p> */}
        <p className="text-center">{note.note}</p>
      </CardBody>
      <Divider />
    </Card>
  );
};

export default Note_Card;
