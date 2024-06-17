import settingsIcon from "../../assets/images/icons/options.png";
import filledHeart from "../../assets/images/icons/filled_heart.png";
import emptyHeart from "../../assets/images/icons/empty_heart.png";
import deleteIcon from "../../assets/images/icons/delete.png";
import shareIcon from "../../assets/images/icons/share.png";
import editIcon from "../../assets/images/icons/edit_note.png";
import openEye from "../../assets/images/icons/open_eye.png";
import closeEye from "../../assets/images/icons/closed_eye.png";
import viewNote from "../../assets/images/icons/view_note.png";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import toast from "react-hot-toast";
import { handleNoteFav, handleNoteShare } from "../../Api/notes.service";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const Note_Card_Modal = ({ note }) => {
  const navigate = useNavigate();
  const [canShare, setCanShare] = useState(note.canShare);
  const [isFav, setIsFav] = useState(note.isFav);

  const handleShare = async () => {
    try {
      toast.loading();
      await handleNoteShare(!canShare, note.noteId);
      setCanShare(!canShare);
      toast.dismiss();
      toast.success();
    } catch (e) {
      toast.error("جرب تاني");
    }
  };
  const handleIsFav = async () => {
    try {
      toast.loading();
      await handleNoteFav(!isFav, note.noteId);
      setIsFav(!isFav);
      toast.dismiss();
      toast.success();
    } catch (e) {
      toast.error("جرب تاني");
    }
  };
  const shareNote = async () => {
    try {
      await navigator.share({
        title: "صاحبك في المؤتمر بعتلك حاجات كتبها",
        text: "ازيك ؟ صاحبك كتب حاجة و اختارك يعملها شير معاك ",
        url: `${window.location.origin}/shared-notes/${note.noteId}`,
      });
    } catch (error) {
      toast.error("المتصفح مش بيدعم الشير ");
    }
  };
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <div>
        <img src={settingsIcon} alt="" width={20} onClick={onOpen} />
      </div>
      <Modal backdrop={"blur"} isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="mb-2"></ModalHeader>
              <ModalBody>
                <ul className="grid gap-4 max-h-[350px] overflow-y-scroll">
                  {isFav ? (
                    <li
                      onClick={handleIsFav}
                      className="border-1 py-3 px-2 rounded-lg items-center flex justify-between"
                    >
                      <p>حذف من المفضلة</p>
                      <img
                        src={filledHeart}
                        className="w-[25px] h-[25px]"
                        alt=""
                      />
                    </li>
                  ) : (
                    <li
                      onClick={handleIsFav}
                      className="border-1 py-3 px-2 rounded-lg items-center flex justify-between"
                    >
                      <p>اضافة للملاحظات المفضلة</p>
                      <img
                        src={emptyHeart}
                        className="w-[25px] h-[25px]"
                        alt=""
                      />
                    </li>
                  )}
                  {canShare && (
                    <li
                      onClick={shareNote}
                      className="border-1 py-3 px-2 rounded-lg items-center flex justify-between"
                    >
                      <p>ابعتها لصاحبك</p>
                      <img
                        src={shareIcon}
                        className="w-[25px] h-[25px]"
                        alt=""
                      />
                    </li>
                  )}
                  <li className="border-1 py-3 px-2 rounded-lg items-center flex justify-between">
                    <p>تعديل</p>
                    <img src={editIcon} className="w-[25px] h-[25px]" alt="" />
                  </li>
                  <li className="border-1 py-3 px-2 rounded-lg items-center flex justify-between">
                    <p>مسح</p>
                    <img
                      src={deleteIcon}
                      className="w-[25px] h-[25px]"
                      alt=""
                    />
                  </li>
                  {canShare ? (
                    <>
                      <li
                        onClick={handleShare}
                        className="border-1 py-3 px-2 rounded-lg items-center flex justify-between"
                      >
                        <p>اقفل الشير</p>
                        <img
                          src={closeEye}
                          className="w-[25px] h-[25px]"
                          alt=""
                        />
                      </li>
                      <li
                        onClick={() => navigate(`/shared-notes/${note.noteId}`)}
                        className="border-1 py-3 px-2 rounded-lg items-center flex justify-between"
                      >
                        <p>وريني الملاحظة</p>
                        <img
                          src={viewNote}
                          className="w-[25px] h-[25px]"
                          alt=""
                        />
                      </li>
                    </>
                  ) : (
                    <li
                      onClick={handleShare}
                      className="border-1 py-3 px-2 rounded-lg items-center flex justify-between"
                    >
                      <p>اعملها شير</p>
                      <img src={openEye} className="w-[25px] h-[25px]" alt="" />
                    </li>
                  )}
                </ul>
              </ModalBody>
              <ModalFooter></ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default Note_Card_Modal;
