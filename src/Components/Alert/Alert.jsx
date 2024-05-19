import {
    Badge,
    Button,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    useDisclosure,
} from "@nextui-org/react";
const Alert = ({ alert }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Badge
        content="New"
        placement="top-right"
        color="danger"
        size="lg"
        isInvisible={alert ? false : true}
      >
        <span
          onClick={onOpen}
          className=" transition-all block text-center border-2 p-1 font-bold border-danger text-danger w-[30px] h-[30px] rounded-full hover:text-white hover:bg-danger "
        >
          i
        </span>
      </Badge>
      <Modal backdrop={"blur"}  isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 font-bold text-3xl">تنبيه</ModalHeader>
              <ModalBody>
                <div className="max-h-[200px] text-2xl overflow-y-scroll">
                  {alert}
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="warning" variant="light" onPress={onClose}>
                  تمام
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default Alert;
