import {
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@heroui/react";
import { useState } from "react";
import toast from "react-hot-toast";
import { changeTeamOrder, controlTeamPoints } from "../../../Api/team.service";
const Team_Card = ({ team, getAllTeams, isOrderCustom }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [points, setPoints] = useState(0);
  const [order, setOrder] = useState(Number(team.order));
  const handleOrder = (op) => {
    if (op === "+") {
      setOrder(order + 1);
    } else {
      if (order > 1) {
        setOrder(order - 1);
      }
    }
  };
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
  const handleTeamOrder = async () => {
    toast.loading("ثواني");
    try {
      await changeTeamOrder(team.teamId, order);
      await getAllTeams();
      toast.dismiss();
      toast.success("تمام يا ليدر");
    } catch (e) {
      toast.error("حصل حاجة غلط");
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
        {isOrderCustom ? (
          <>
            <div className="grid grid-cols-2 mt-3 gap-3">
              <p
                className="capitalize text-center text-2xl p-3 border-purple-500 border-1 rounded-md"
                dir="ltr"
              >
                <p>النقط</p>
                <p>{team.points}</p>
              </p>
              <p
                className="capitalize text-center text-2xl p-3 border-purple-500 border-1 rounded-md"
                dir="ltr"
              >
                <p>الترتيب</p>
                <p>{team.order}</p>
              </p>
            </div>
          </>
        ) : (
          <>
            <div className="mt-3 gap-3">
              <p
                className="capitalize text-center text-2xl p-3 border-purple-500 border-1 rounded-md"
                dir="ltr"
              >
                <p>النقط</p>
                <p>{team.points}</p>
              </p>
            </div>
          </>
        )}
      </div>
      <Modal backdrop={"blur"} isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 font-bold text-3xl">
                {team.name}
              </ModalHeader>
              <ModalBody>
                <div className="h-[500px] overflow-y-scroll">
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
                        className="text-3xl border-[5px] border-purple-600 rounded-xl w-[70px] text-center h-[70px] m-[2rem]"
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
                    className="my-3 border-2 border-blue-700 text-3xl py-2 rounded-2xl w-full"
                  >
                    تغيير النقاط
                  </button>
                  {isOrderCustom && (
                    <>
                      <Divider className="my-4" />
                      <p className="text-3xl text-center">الترتيب</p>

                      <div className="grid grid-cols-2 my-4 gap-4 justify-center">
                        <div>
                          <input
                            type="number"
                            defaultValue={order}
                            value={order}
                            className="text-2xl border-[5px] w-[100%] my-2 border-purple-600 rounded-xl  text-center"
                          />
                          <div className="grid grid-cols-2 gap-3">
                            <p
                              onClick={() => handleOrder("+")}
                              className="text-5xl border-blue-700 border-4 px-4 rounded-xl"
                            >
                              +
                            </p>

                            <p
                              onClick={() => handleOrder("-")}
                              className="text-5xl border-blue-700 border-4 px-4 rounded-xl"
                            >
                              -
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={handleTeamOrder}
                          className="border-2 border-blue-700 text-3xl rounded-2xl"
                        >
                          تغيير
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default Team_Card;
