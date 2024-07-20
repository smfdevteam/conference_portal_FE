import {
  Card,
  CardBody,
  CardFooter,
  Image,
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
import img1 from "../assets/images/archieve/1.jpg";
import img2 from "../assets/images/archieve/2.jpg";
import img3 from "../assets/images/archieve/3.jpg";
import img4 from "../assets/images/archieve/4.jpg";
import img5 from "../assets/images/archieve/5.jpg";
import img6 from "../assets/images/archieve/6.jpg";
import img7 from "../assets/images/archieve/7.jpg";
import img8 from "../assets/images/archieve/8.jpg";
import img9 from "../assets/images/archieve/9.jpg";
import facebookIcon from "../assets/images/icons/facebook.svg";

const images = [img1, img2, img6, img4, img5, img3, img7, img8, img9];
const gradient = {
  background: "radial-gradient(circle at 50% 50%, #8255f1, #0d2486)",
};
const SMF_Tech = ({ show = true }) => {
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

                <div
                  className={`grid ${
                    show ? " grid-cols-2 " : " grid-cols-1 "
                  } gap-5`}
                >
                  {show && (
                    <div
                      onClick={() => navigate("/team")}
                      className="hover:bg-white hover:text-black my-5 transition-all duration-500 text-white h-[100px] border-1 flex justify-center items-center rounded-lg"
                    >
                      <p className="text-3xl">الفريق </p>
                    </div>
                  )}
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
                  <div onClick={()=>window.open("https://www.facebook.com/people/SMF-Tech/61561332751601/" , '_blank')} className="flex items-center p-2 rounded-lg animate-fly my-3 border-blue-600 justify-between m-auto border-3">
                    <div className="w-[20%]">
                      <img
                        src={facebookIcon}
                        className="w-full m-auto inline-block"
                        alt=""
                      />
                    </div>
                    <div className="text-center w-[80%]">
                    <p className="text-blue-600 capitalize font-bold">join us on Social Media</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-lg shadow-md transform transition-transform duration-300 hover:scale-105 hover:shadow-lg">
                      <h2 className="text-2xl font-semibold text-blue-600">
                        Engineers | Developers Team
                      </h2>
                      <p className="text-gray-700 mt-4 text-md break-words whitespace-normal">
                        Frontend, Backend, Mobile, and Cyber Security Engineers
                        who create software to digitize church activities.
                      </p>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-md transform transition-transform duration-300 hover:scale-105 hover:shadow-lg">
                      <h2 className="text-2xl font-semibold text-blue-600">
                        Management | Product Team
                      </h2>
                      <p className="text-gray-700 mt-4 text-md break-words whitespace-normal">
                        Oversee projects, manage resources, and ensure the
                        successful delivery of our digital products.
                      </p>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-md transform transition-transform duration-300 hover:scale-105 hover:shadow-lg">
                      <h2 className="text-2xl font-semibold text-blue-600">
                        Media Team
                      </h2>
                      <p className="text-gray-700 mt-4 text-md break-words whitespace-normal">
                        Handle all media-related activities, including social
                        media management, video production, and content
                        creation.
                      </p>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-md transform transition-transform duration-300 hover:scale-105 hover:shadow-lg">
                      <h2 className="text-2xl font-semibold text-blue-600">
                        Creative Design Team
                      </h2>
                      <p className="text-gray-700 mt-4 text-md break-words whitespace-normal">
                        Design visual content, including graphics, UI/UX, and
                        promotional materials.
                      </p>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-md transform transition-transform duration-300 hover:scale-105 hover:shadow-lg">
                      <h2 className="text-2xl font-semibold text-blue-600">
                        Event Planning Team
                      </h2>
                      <p className="text-gray-700 mt-4 text-md break-words whitespace-normal">
                        Plan and execute events, ensuring they run smoothly and
                        meet their objectives.
                      </p>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-md transform transition-transform duration-300 hover:scale-105 hover:shadow-lg">
                      <h2 className="text-2xl font-semibold text-blue-600">
                        Continuous Learning Team
                      </h2>
                      <p className="text-gray-700 mt-4 text-md break-words whitespace-normal">
                        Promote ongoing education and training for team members
                        to keep skills up-to-date and foster personal growth.
                      </p>
                    </div>
                  </div>
                </div>

                {/* ---------------- */}
                {show && (
                  <div className="gap-2 grid grid-cols-2 sm:grid-cols-4">
                    <p className="text-5xl mt-5 font-bold text-white">
                      Our App Story
                    </p>
                    {images.map((item, index) => (
                      <Card
                        shadow="sm"
                        key={index}
                        isPressable
                        onPress={() => console.log("item pressed")}
                      >
                        <CardBody className="overflow-visible p-0">
                          <Image
                            shadow="sm"
                            radius="lg"
                            width="100%"
                            alt={item}
                            className="w-full object-cover h-[140px]"
                            src={item}
                          />
                        </CardBody>
                      </Card>
                    ))}
                  </div>
                )}
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default SMF_Tech;
