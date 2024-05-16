import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Image,
} from "@nextui-org/react";
const Smf_Modal = ({
  btnTitle,
  isAction,
  isClose,
  actionBtnTitle,
  action,
  children,
  modalTitle,
  isBtnImage,
  btnImgSrc,
  btnImgClassNames,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleOpen = () => onOpen();
  return (
    <>
      {isBtnImage ? (
        <Image
          src={btnImgSrc}
          onClick={handleOpen}
          className={btnImgClassNames}
        />
      ) : (
        <Button
          variant="flat"
          color="warning"
          onPress={handleOpen}
          className="capitalize"
        >
          {btnTitle}
        </Button>
      )}
      <Modal backdrop={"blur"} isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {modalTitle}
              </ModalHeader>
              <ModalBody>{children}</ModalBody>
              <ModalFooter>
                {isClose && (
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                )}
                {isAction && (
                  <Button color="primary" onPress={action}>
                    {actionBtnTitle}
                  </Button>
                )}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default Smf_Modal;
