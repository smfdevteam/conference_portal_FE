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
import { sendRequestHelpMessage } from "../../Api/user.service";
import "./request_help.css";
const Request_Help = () => {
  const request_help_form = useFormik({
    initialValues: {
      message: "",
    },
    validationSchema: Yup.object().shape({
      message: Yup.string().required("محتاجين تكتب حاجة هنا !"),
    }),
    onSubmit: async ({ message }) => {
      await sendRequestHelpMessage({ message });
      onClose()
    },
  });
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <div className="flex justify-center items-center">
        <button
          onClick={onOpen}
          className="req_help my-4 py-3 w-full animate-fly font-bold text-2xl shadow-md border-2 border-danger-600 rounded-md"
        >
          محتاج مساعدة ؟
          <div className="req_help-layer font-bold text-2xl flex items-center text-white justify-center">
            اضغط و اطلب مساعدة
          </div>
        </button>
      </div>
      <Modal backdrop={"blur"} isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 font-bold text-3xl">
                نقدر نساعدك ازاي ؟
              </ModalHeader>
              <ModalBody>
                <form
                  onSubmit={request_help_form.handleSubmit}
                  className="my-5 flex flex-col gap-4"
                >
                  <Textarea
                    isRequired
                    variant="faded"
                    name="message"
                    onChange={request_help_form.handleChange}
                    onBlur={request_help_form.handleBlur}
                    label="محتاج ايه ؟"
                    placeholder="نقدر نساعدك ازاي ؟"
                    errorMessage={request_help_form.errors.message}
                    isInvalid={
                      request_help_form.touched.message &&
                      request_help_form.errors.message
                    }
                    description="تقدر تكتب اي حاجة انت محتاجها هنا و احنا هنتواصل معاك"
                  />
                  <button
                    disabled={!request_help_form.isValid}
                    type="submit"
                    className="w-full py-3 px-1 border-1 shadow-md rounded-lg bg-danger-500 font-bold text-xl text-white disabled:bg-slate-500"
                  >
                    ابعت
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

export default Request_Help;
