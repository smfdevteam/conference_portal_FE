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
                <div className="grid grid-cols-2 my-2 justify-between items-center">
                  <img
                    src={smfTechTypo}
                    className="w-max-[50px] m-auto inline-block"
                    alt=""
                  />
                  <img
                    src={mark}
                    className="w-max-[10px] m-auto inline-block"
                    alt=""
                  />
                </div>

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
                <div className="hover:bg-white py-5 w-full hover:text-black my-5 transition-all duration-500 text-white h-[100px] border-1 flex justify-center items-center rounded-lg">
                  <a className="text-3xl" href="tel:201201891349">
                    الدعم الفني
                  </a>
                  <LinkIcon />
                </div>
                {/* ---------------- */}

                <div className=" bg-gray-100 p-6 rounded-lg">
                  <header className="text-center my-10">
                    <h1 className="text-4xl font-bold text-blue-600">
                      SMF Tech
                    </h1>
                    <p className="text-xl text-gray-700 mt-2">
                      Digitizing all Coptic Orthodox Church activities and
                      developing people from a technological perspective
                    </p>
                  </header>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-lg shadow-md transform transition-transform duration-300 hover:scale-105 hover:shadow-lg">
                      <h2 className="text-2xl font-semibold text-blue-600">
                        Engineers | Developers Team
                      </h2>
                      <p className="text-gray-700 mt-4 text-md break-words whitespace-normal" >
                        Frontend, Backend, Mobile, and Cyber Security Engineers
                        who create software to digitize church activities.
                      </p>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-md transform transition-transform duration-300 hover:scale-105 hover:shadow-lg">
                      <h2 className="text-2xl font-semibold text-blue-600">
                        Management | Product Team
                      </h2>
                      <p className="text-gray-700 mt-4 text-md break-words whitespace-normal" >
                        Oversee projects, manage resources, and ensure the
                        successful delivery of our digital products.
                      </p>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-md transform transition-transform duration-300 hover:scale-105 hover:shadow-lg">
                      <h2 className="text-2xl font-semibold text-blue-600">
                        Media Team
                      </h2>
                      <p className="text-gray-700 mt-4 text-md break-words whitespace-normal" >
                        Handle all media-related activities, including social
                        media management, video production, and content
                        creation.
                      </p>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-md transform transition-transform duration-300 hover:scale-105 hover:shadow-lg">
                      <h2 className="text-2xl font-semibold text-blue-600">
                        Creative Design Team
                      </h2>
                      <p className="text-gray-700 mt-4 text-md break-words whitespace-normal" >
                        Design visual content, including graphics, UI/UX, and
                        promotional materials.
                      </p>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-md transform transition-transform duration-300 hover:scale-105 hover:shadow-lg">
                      <h2 className="text-2xl font-semibold text-blue-600">
                        Event Planning Team
                      </h2>
                      <p className="text-gray-700 mt-4 text-md break-words whitespace-normal" >
                        Plan and execute events, ensuring they run smoothly and
                        meet their objectives.
                      </p>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-md transform transition-transform duration-300 hover:scale-105 hover:shadow-lg">
                      <h2 className="text-2xl font-semibold text-blue-600">
                        Continuous Learning Team
                      </h2>
                      <p className="text-gray-700 mt-4 text-md break-words whitespace-normal" >
                        Promote ongoing education and training for team members
                        to keep skills up-to-date and foster personal growth.
                      </p>
                    </div>
                  </div>
                </div>

                {/* ---------------- */}
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default SMF_Tech;
