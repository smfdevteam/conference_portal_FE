import {
    Modal,
    ModalBody,
    ModalContent,
    ModalHeader,
    useDisclosure
} from "@nextui-org/react";
import { useState } from "react";
import toast from "react-hot-toast";
import { controlTeamPoints } from "../../../Api/team.service";
const Team_Card = ({ team, getAllTeams }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [points, setPoints] = useState(0);
  const submit = async () => {
    try {
      if (points != 0) {
        toast.loading("بنعدل الدرجات");
        await controlTeamPoints(team.teamId, points);
        await getAllTeams();
        toast.dismiss();
        toast.success("تمام");
      } else toast.error("مينفعش تساوي صفر");
    } catch (e) {
      toast.error("جرب تاني , حصل حاجة غلط");
    }
  };
  return (
    <>
      <div
        onClick={onOpen}
        className="rounded-lg w-fit px-3 py-5 m-2"
        style={{
          border: `3px solid ${team.color}`,
          minWidth: "200px",
        }}
      >
        <p className="capitalize text-center text-3xl">{team.name}</p>
        <p className="capitalize text-center text-3xl" dir="ltr">
          {team.points} : النقط
        </p>
      </div>
      <Modal backdrop={"blur"} isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 font-bold text-3xl">
                {team.name}
              </ModalHeader>
              <ModalBody>
                <div className="text-center">
                  <p>الفريق دلوقتي مجمع</p>
                  <p
                    dir="ltr"
                    className="border-4 w-fit h-fit px-4 py-2 rounded-full border-purple-600 m-auto"
                  >
                    {team.points}
                  </p>
                  <p>نقطة</p>

                  <div className="flex items-center justify-center">
                    <p
                      onClick={() => setPoints(points + 1)}
                      className="text-5xl border-blue-700 border-4 px-4 rounded-xl"
                    >
                      +
                    </p>
                    <input
                      type="number"
                      defaultValue={points}
                      value={points}
                      className="text-5xl border-[5px] border-purple-600 rounded-xl w-[120px] text-center h-[110px] m-[2rem]"
                    />
                    <p
                      onClick={() => setPoints(points - 1)}
                      className="text-5xl border-red-700 border-4 px-4 rounded-xl"
                    >
                      -
                    </p>
                  </div>
                  {points > 0 && (
                    <p>
                      انت كده هتضيف
                      <span className="mx-2 text-blue-700">{points} </span>
                      نقط
                    </p>
                  )}
                  {points < 0 && (
                    <p>
                      انت كده هتنقص
                      <span className="mx-2 text-red-700">{points} </span>
                      نقط
                    </p>
                  )}
                  {points != 0 && (
                    <p>
                      كده المجموع الجديد الكلي هيبقي
                      <span className="mx-2 text-blue-700">
                        {points + team.points}
                      </span>
                    </p>
                  )}
                </div>
                <button
                  onClick={submit}
                  className="my-3 border-2 border-blue-700 text-3xl py-2 rounded-2xl"
                >
                  يلا بينا
                </button>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default Team_Card;
