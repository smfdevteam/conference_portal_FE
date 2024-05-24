import {
  LinkIcon,
  Modal,
  ModalBody,
  ModalContent,
  useDisclosure,
} from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import smfTechLogo from "../assets/images/brand/smftech.png";
import smfTechTypo from "../assets/images/brand/smftecttypo.png";
import mark from "../assets/images/mark.png";
const gradient = {
  background: "radial-gradient(circle at 50% 50%, #8255f1, #0d2486)",
};
const SMF_Tech = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  return (
    <>
      <div
        style={gradient}
        onClick={onOpen}
        className="flex animate-fly relative justify-around items-center my-3 hover:translate-y-[-5px] hover:shadow-xl active:shadow-none active:translate-y-0 transition-all duration-500 mx-auto border-2 shadow-md bg-slate-400 rounded-xl"
      >
        <img src={smfTechLogo} alt="" style={{ height: "100px" }} />
        <img src={smfTechTypo} alt="" style={{ height: "50px" }} />
      </div>
      <Modal
        shadow="lg"
        size="full"
        backdrop={"blur"}
        dir="ltr"
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalContent>
          {() => (
            <>
              <ModalBody
                style={gradient}
                className="rounded-4xl overflow-y-scroll"
              >
                <div className="grid grid-cols-2 items-center">
                  <img src={smfTechTypo} className="w-[70%] m-auto" alt="" />
                  <img src={mark} className="w-[70%] m-auto" alt="" />
                </div>
                <p className="text-3xl font-bold text-center text-white">
                  احنا شباب مارمرقس
                </p>
                <p className="text-center text-xl text-white ">
                  احنا اول خدمة متخصصة في التكنولوجيا و البرمجيات في الكنيسة
                  القبطية
                </p>
                <p className="text-center text-xl text-white">
                  {" "}
                  هدفنا اننا نصنع بنفسنا التطوير الرقمي اللي هيعمل تجربة مختلفة
                  و جديدة لكنيستنا القبطية و الخدمات الخاصة بيها{" "}
                </p>
                <div className="grid grid-cols-2 gap-5">
                  <div
                    onClick={() => navigate("/team")}
                    className="hover:bg-white hover:text-black my-5 transition-all duration-500 text-white h-[100px] border-1 flex justify-center items-center rounded-lg"
                  >
                    <p className="text-3xl">الفريق </p>
                  </div>
                  <div
                    onClick={() =>
                      window.open("https://wa.me/201201891349", "_blank")
                    }
                    className="hover:bg-white hover:text-black my-5 transition-all duration-500 text-white h-[100px] border-1 flex justify-center items-center rounded-lg"
                  >
                    <p className="text-3xl">شات </p>
                  </div>
                </div>
                <div className="hover:bg-white w-full hover:text-black my-5 transition-all duration-500 text-white h-[100px] border-1 flex justify-center items-center rounded-lg">
                  <a className="text-3xl" href="tel:201201891349">
                    الدعم الفني
                  </a>
                  <LinkIcon />
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default SMF_Tech;
