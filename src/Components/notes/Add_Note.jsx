import {
    Modal,
    ModalBody,
    ModalContent,
    ModalHeader,
    Textarea,
    useDisclosure
} from "@heroui/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { createNote } from "../../Api/notes.service";
import toast from "react-hot-toast";

  const Add_Note = ({getAllNotes}) => {
    const note_form = useFormik({
      initialValues: {
        note: "",
      },
      validationSchema: Yup.object().shape({
        note: Yup.string().required("محتاجين تكتب حاجة هنا !"),
      }),
      onSubmit: async ({ note }) => {
        toast.loading('بنسجلها')
        try {
            await createNote(note) ; 
            toast.dismiss()
            toast.success('اتسجلت')
            await getAllNotes()
            onClose()
        } catch(e) {
            toast.error('حاجة غلط حصلت')
        } 
      },
    });
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
      <>
        <div>
        <button className="border-purple-600 border-3 text-3xl font-bold w-[40px] rounded-xl h-[40px]" onClick={onOpen}>+</button>
        </div>
        <Modal backdrop={"blur"} isOpen={isOpen} onClose={onClose}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1 font-bold text-3xl">
                  تقدر تسجل ملاحظتك هنا
                </ModalHeader>
                <ModalBody>
                  <form
                    onSubmit={note_form.handleSubmit}
                    className="my-5 flex flex-col gap-4"
                  >
                    <Textarea
                      isRequired
                      variant="faded"
                      name="note"
                      description="سجلها لكل مؤتمر"
                      onChange={note_form.handleChange}
                      onBlur={note_form.handleBlur}
                      label="يلا بينا"
                      errorMessage={note_form.errors.note}
                      isInvalid={
                        note_form.touched.note &&
                        note_form.errors.note
                      }
                    />
                    <button
                    disabled={!note_form.isValid}
                      type="submit"
                      className="w-full py-3 px-1 border-1 shadow-md rounded-lg bg-purple-600 font-bold text-xl text-white disabled:bg-slate-500"
                    >
                      سجل 
                    </button>
                  </form>
                </ModalBody>
              </>
            )}
          </ModalContent>
        </Modal>
      </>
    );
  };
  
  export default Add_Note;
  