import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@heroui/react";
import SMF_QR from "../../QR/SMF_QR";
import qrIcon from "../../../assets/images/icons/qr_code_icon.png";
const Team_QR = ({ teamId, teamName }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const generateRandomString = (length) => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };
  return (
    <>
      <div onClick={onOpen} className="flex justify-center">
        <img src={qrIcon} width={50} alt="" />
      </div>
      <Modal backdrop={"blur"} isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
            <ModalHeader>
                {teamName}
            </ModalHeader>
              <ModalBody className="flex justify-center items-center">
                <p className="text-center">
                    خلي المخدوم يعمل سكان علشان ينضم للفريق الخاص بيك
                </p>
                <SMF_QR
                  link={`${
                    window.location.origin
                  }/jointoteam/${Date.now()}/${generateRandomString(
                    5
                  )}/${teamId}`}
                />
                <p className="text-red-600 text-center">
                  غير مسموح بإن اي خادم او مخدوم ياخد ال QR Code ك Screenshot
                  نهائي
                </p>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default Team_QR;
