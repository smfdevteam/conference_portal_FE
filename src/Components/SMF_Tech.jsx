import smfTechLogo from "../assets/images/brand/smftech.png";
import smfTechTypo from "../assets/images/brand/smftecttypo.png";
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
const gradient = {
  background: "radial-gradient(circle at 50% 50%, #8255f1, #0d2486)",
};
const SMF_Tech = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <div
        style={gradient}
        onClick={onOpen}
        className="flex justify-around items-center my-3 hover:translate-y-[-5px] hover:shadow-xl active:shadow-none active:translate-y-0 transition-all duration-500 mx-auto border-2 shadow-md bg-slate-400 rounded-xl"
      >
        <img src={smfTechLogo} alt="" style={{ height: "100px" }} />
        <img src={smfTechTypo} alt="" style={{ height: "50px" }} />
      </div>
      <Modal backdrop={"blur"} dir="ltr" isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-center items-center   font-bold text-3xl">
                SMF Technology
              </ModalHeader>
              <ModalBody style={gradient} className="rounded-3xl   ">
                <img src={smfTechLogo} className="w-[70%] m-auto" alt="" />
                <div className="grid grid-cols-2 gap-5">
                  <div className="hover:bg-white hover:text-black my-5 transition-all duration-500 text-white h-[100px] border-1 flex justify-center items-center rounded-lg">
                    <h1 className="text-3xl">About us </h1>
                  </div>
                  <div className="hover:bg-white hover:text-black my-5 transition-all duration-500 text-white h-[100px] border-1 flex justify-center items-center rounded-lg">
                    <h1 className="text-3xl">Contact </h1>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" variant="shadow" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default SMF_Tech;
