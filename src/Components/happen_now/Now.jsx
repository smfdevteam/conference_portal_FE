import {
  Badge,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure
} from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import alarmIcon from "../../assets/images/icons/alarm.png";
import timetable from "../../assets/images/icons/timetable.png";
const Now = ({ now }) => {
  const navigate = useNavigate()
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Badge
        content="New"
        placement="top-right"
        color="danger"
        size="lg"
        isInvisible={now ? false : true}
      >
        <Image onClick={onOpen} width={50} src={alarmIcon} loading="lazy" />
      </Badge>
      <Modal backdrop={"blur"} isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 font-bold text-3xl">
                ايه اللي شغال دلوقتي ؟   
              </ModalHeader>
              <ModalBody>
                <div className="max-h-[200px] text-center text-2xl overflow-y-scroll">
                  {now ? now : 'اول ما تشتغل حاجة هنكتب ليك هنا علطول'}
                </div>
                <div onClick={()=>navigate('/program')} className="rounded-md my-5 flex items-center gap-2 p-10 justify-center hover:bg-gradient-to-br hover:from-purple-700 hover:to-indigo-900 hover:text-white text-xl font-semibold transition-all duration-500 shadow-lg ">
                    <Image src={timetable} width={40}/>
                    <p>وريني البرنامج</p>
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default Now;
