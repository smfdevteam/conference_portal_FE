import { Avatar, Input } from "@nextui-org/react";
import React, { useRef, useState } from "react";
import {
  controlGuestPoints,
  getGuestByPointId,
} from "../../../Api/team.service";
import toast from "react-hot-toast";

const Guest_Points = () => {
  const searchRef = useRef(null);
  const [user, setUser] = useState(null);
  const [userPoints, setUserPoints] = useState(0);
  const getGuest = async () => {
    toast.loading("بندور عليه ثواني");
    try {
      const guestData = await getGuestByPointId(searchRef.current.value);
      setUser(guestData);
      toast.dismiss();
      toast.success("لقيناه");
    } catch (e) {
      if (e.message == "User Not Found") {
        toast.dismiss();
        toast.error("ال ID مش موجود");
      } else {
        toast.dismiss();

        toast.error(e.message);
      }
    }
  };
  const handlePoints = async () => {
    toast.loading("بنعدل الدرجات");
    try {
      await controlGuestPoints(userPoints, user.uid);
      toast.dismiss();
      toast.success("تمام يا ليدر");
    } catch (e) {
      toast.error("حصل حاجة غلط");
    }
  };
  return (
    <div className="mt-4 mb-2">
      <p>إضافة نقط فردية</p>
      <div className="flex gap-3 items-center my-3">
        <button
          onClick={getGuest}
          className="font-bold border-2 border-purple-500 w-[40%] h-[50px] rounded-lg"
        >
          بحث
        </button>
        <Input
          ref={searchRef}
          type="text"
          placeholder="Point ID"
          dir="ltr"
          labelPlacement="inside"
          label="إكتب الرقم الخاص بالنقط للمخدوم"
        />
      </div>
      {user && (
        <div className="border-1 px-3 py-5 rounded-lg shadow-lg">
          <div className="flex gap-5" dir="ltr">
            <Avatar
              src={user.photoURL}
              imgProps={{
                style: {
                  objectFit: "cover",
                },
              }}
              isBordered
              color="primary"
            />
            <div>
              <p className="truncate w-[170px] ">{user.displayName}</p>
              <p>
                have
                <span className="font-bold text-purple-900 mx-2">
                  {user.points}
                </span>
                points
              </p>
              {user.teamName ? (
                <p>
                  Joined
                  <span className="font-bold text-purple-900 mx-2">
                    {user.teamName}
                  </span>
                </p>
              ) : (
                <p>لسة مدخلش فريق</p>
              )}
            </div>
          </div>
          <div>
            <div className="flex items-center justify-center">
              <p
                onClick={() => setUserPoints(userPoints + 1)}
                className="text-5xl border-blue-700 border-4 px-4 rounded-xl"
              >
                +
              </p>
              <input
                type="number"
                defaultValue={userPoints}
                value={userPoints}
                className="text-5xl border-[5px] border-purple-600 rounded-xl w-[120px] text-center h-[110px] m-[2rem]"
              />
              <p
                onClick={() => setUserPoints(userPoints - 1)}
                className="text-5xl border-red-700 border-4 px-4 rounded-xl"
              >
                -
              </p>
            </div>
            {userPoints > 0 && (
              <p>
                انت كده هتضيف
                <span className="mx-2 text-blue-700">{userPoints} </span>
                نقط
              </p>
            )}
            {userPoints < 0 && (
              <p>
                انت كده هتنقص
                <span className="mx-2 text-red-700">{userPoints} </span>
                نقط
              </p>
            )}
            {userPoints != 0 && (
              <p>
                كده المجموع الجديد الكلي
                <span className="mx-2 text-blue-700">
                  {userPoints + user.points}
                </span>
              </p>
            )}
          </div>
          <button
            onClick={handlePoints}
            className="my-3 w-full border-2 border-blue-700 text-3xl py-2 rounded-2xl"
          >
            يلا بينا
          </button>
          {(userPoints > 0 || userPoints < 0) && (
            <button
              onClick={() => setUserPoints(0)}
              className="my-3 w-full border-2 border-red-600 text-3xl py-2 rounded-2xl"
            >
              رجعني للصفر
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Guest_Points;
