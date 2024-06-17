import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
  useDisclosure,
} from "@nextui-org/react";
import editIcon from "../../assets/images/icons/edit_note.png";
import { useFormik } from "formik";
import * as Yup from "yup";
import { editNode } from "../../Api/notes.service";
import toast from "react-hot-toast";
const Edit_Note_Modal = ({ note , getAllNotes}) => {
  const edit_note = useFormik({
    initialValues: {
      note: "",
    },
    validationSchema: Yup.object().shape({
      note: Yup.string().required(""),
    }),
    onSubmit: async (formValues) => {
        toast.loading('ثواني')
        try {
            await editNode(note.noteId , formValues.note)
            await getAllNotes()
            toast.dismiss()
            toast.success('تمام')
        } catch(e) {
            toast.dismiss()
            toast.error('جرب تاني')
        }
    },
  });
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <li
        onClick={onOpen}
        className="border-1 py-3 px-2 rounded-lg items-center flex justify-between"
      >
        <p>تعديل</p>
        <img src={editIcon} className="w-[25px] h-[25px]" alt="" />
      </li>
      <Modal backdrop={"blur"} isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="mb-2"></ModalHeader>
              <ModalBody>
                <form onSubmit={edit_note.handleSubmit}>
                  <p className="text-2xl font-bold my-3">تعديل ملاحظة</p>
                  <Textarea
                    defaultValue={note.note}
                    onChange={edit_note.handleChange}
                    onBlur={edit_note.handleBlur}
                    name="note"
                    minRows={400}
                    label={"تعديل ملاحظة"}
                    labelPlacement="inside"
                    description={"هنا تقدر تعدل اللي انت كاتبه زي مانت حابب"}
                    variant="bordered"
                    errorMessage={edit_note.errors.note}
                    isInvalid={edit_note.touched.note && edit_note.errors.note}
                  />
                  <button
                    disabled={!edit_note.isValid}
                    className="text-2xl disabled:bg-slate-400 bg-purple-600 w-full py-2 px-1 rounded-xl text-white font-bold"
                  >
                    عدل
                  </button>
                </form>
              </ModalBody>
              <ModalFooter></ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default Edit_Note_Modal;
