import React, { useEffect, useState, useContext } from "react";
import { getPublicProfile } from "../../../Api/auth.service";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { sendUserPrivateMessage } from "../../../Api/user.service";
import { stateProvider } from "../../../Context/App_Context";
import LeaderBagde from "../../../assets/images/icons/badge.png";
import {
  Avatar,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Textarea,
  useDisclosure,
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
  Image,
  Input,
} from "@nextui-org/react";
import GradientSvg from "../UserProfileAnimation/GradientSvg";
import { useFormik } from "formik";

const PublicUserProfile = () => {
  const { app_state, setAppState } = useContext(stateProvider);
  const { uid } = useParams();
  const navigate = useNavigate();
  const [userData, setUserData] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const formik = useFormik({
    initialValues: {
      message: "",
      uid,
    },
    onSubmit: async ({ message, uid, setIsLoading }) => {
      try {
        setIsLoading(true);
        await sendUserPrivateMessage(uid, message);
        
      } finally {
        setIsLoading(false);
        onClose()
      }
    },
  });
  formik.values.setIsLoading = setIsLoading;
  const senderName = app_state.user.displayName;
  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await getPublicProfile(uid);
        if (response === "blocked") {
          navigate("/not-found");
        } else {
          setUserData(response);
        }
      } finally {
      }
    };
    getUserData();
  }, [uid]);

  if (userData) {
    const { displayName, photoURL, sharedNotes,isLeader } = userData;

    return (
      <div className="font-[Cairo] w-full text-3xl md:text-6xl">
        <div className="absolute inset-0 bg-[#fbfdfb] rounded-md ">
          <GradientSvg />
        </div>

        <div className=" relative flex flex-col items-center justify-center mt-8 md:mt-24 gap-3 md:gap-4 text-center">
          <div className="relative rounded-full">
            <Avatar
              isBordered
              color="primary"
              imgProps={{
                style: {
                  objectFit: "cover",
                  width: "100%",
                  height: "100%",
                },
              }}
              src={photoURL}
              alt="NextUI Album Cover"
              className="  bg-primary  w-32 h-32  sm:w-64 sm:h-64  "
            />
            {isLeader && (
              <div className=" absolute inset-0 ">
                <img
                  src={LeaderBagde}
                  alt=""
                  className=" absolute bottom-0 w-5 h-5 sm:w-10 sm:h-10"
                />
              </div>
            )}
          </div>

          <h1 className="text-4xl font-bold">{displayName}</h1>
          <div className="flex justify-center items-center">
            <Button
              onClick={onOpen}
              className=" my-2 p-4 w-full   font-bold text-2xl shadow-md border-2  border-x-violet-600 border-y-indigo-600 rounded-md bg-transparent"
            >
              ابعت رساله
            </Button>
          </div>
          <Modal backdrop={"blur"} isOpen={isOpen} onClose={onClose} placement="top">
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1 font-bold text-3xl">
                    ابعت رساله
                  </ModalHeader>
                  <ModalBody>
                    <form
                      onSubmit={formik.handleSubmit}
                      className="my-5 flex flex-col gap-4"
                    >
                      <Input
                        variant="faded"
                        isDisabled
                        type="text"
                        label="مرسل"
                        size="lg"
                        defaultValue={senderName}
                        className=" font-semibold  "
                      />
                      <Textarea
                        isRequired
                        variant="faded"
                        name="message"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        label="اكتب رسالتك"
                      />
                      <Button
                        isLoading={isLoading}
                        
                        type="submit"
                        className="w-full py-3 px-1  border-1 shadow-md rounded-lg bg-indigo-500 font-bold text-xl text-white"
                      >
                        ابعت
                      </Button>
                    </form>
                  </ModalBody>
                </>
              )}
            </ModalContent>
          </Modal>
          {sharedNotes.map((note, index) => {
            return (
              <Card
                className={`w-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white border-red-500 ${
                  note.isFav ? " border-2" : ""
                }`}
              >
                <CardHeader className="flex gap-3">
                  <Avatar
                    alt="user profile photo"
                    imgProps={{
                      style: {
                        objectFit: "cover",
                        width: "100%",
                        height: "100%",
                      },
                    }}
                    className="bg-warning  w-16 h-16  md:w-32 md:h-32 "
                    src={photoURL}
                    
                  />
                  <div className="flex flex-col">
                    <p className="text-md">{displayName}</p>
                    <p className="text-sm  text-white" dir="ltr">
                      {note.creationTime}
                    </p>
                  </div>
                </CardHeader>
                <Divider />
                <CardBody className="max-h-48 leading-relaxed">
                  <p className=" text-right text-[1rem] sm:text-2xl  sm:leading-relaxed">
                    {note.note}
                  </p>
                </CardBody>
                <Divider />
              </Card>
            );
          })}
        </div>
      </div>
    );
  }
};

export default PublicUserProfile;
