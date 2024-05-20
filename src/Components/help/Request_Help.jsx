import {
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
  Textarea,
} from "@nextui-org/react";
import "./request_help.css";
const Request_Help = () => {
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
                <form className="my-5 flex flex-col gap-4">
                  <Input
                    size="lg"
                    placeholder="الإسم ؟"
                    type="text"
                    variant="flat"
                    name="name"
                    label="الإسم"
                  />
                  <Input
                    dir="rtl"
                    size="lg"
                    placeholder=" الموبايل ؟ "
                    type="tel"
                    variant="flat"
                    name="phone"
                    label="الموبايل"
                  />
                  <Textarea
                    label="محتاج ايه ؟"
                    placeholder="نقدر نساعدك ازاي ؟"
                  />
                  <button className="w-full py-3 px-1 border-1 shadow-md rounded-lg bg-danger-500 font-bold text-xl text-white">ابعت</button>
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
