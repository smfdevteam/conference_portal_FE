import { useEffect, useState } from "react";
import { getConferenceLeaders } from "../../Api/conference_meta.service";
import toast from "react-hot-toast";
import Full_Screen_Skeleton_Loader from "../../Components/shared/Full_Screen_Skeleton_Loader";
import { Avatar } from "@nextui-org/react";
import callIcon from "../../assets/images/icons/call.png";
const Leaders = () => {
  const [leaders, setLeaders] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const getLeaders = async () => {
    setIsLoading(true);
    try {
      const leaders = await getConferenceLeaders();
      setLeaders(leaders);
    } catch (e) {
      toast.error("حصل مشكلة , جرب تاني");
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getLeaders();
  }, []);
  if (isLoading) return <Full_Screen_Skeleton_Loader />;
  return leaders && leaders.count > 0 ? (
    <>
      <p className="text-center text-5xl text-purple-700 capitalize">الخدام</p>
      <p>
        هنا هتلاقي
        <span className="mx-2 text-purple-800 text-4xl">{leaders.count}</span>
        خدام يقدروا يساعدوك في أي حاجة انت محتاجها
      </p>
      <div className="flex flex-col gap-4">
        {leaders.leaders.map((leader) => {
          return (
            <div
              className="flex items-center gap-4 p-4 border-2 rounded-lg border-purple-600"
              key={leader.photoURL}
              dir="ltr"
            >
              <Avatar src={leader.photoURL} className="w-20 h-20 text-large" />
              <div>
                <p className="truncate w-[170px] ">{leader.displayName}</p>
                <p className="text-sm">{leader.responsibility}</p>
                {leader.phoneNumber && (
                  <a className="my-3 block" href={`tel:${leader.phoneNumber}`}>
                    <img width={25} src={callIcon} alt="" />
                  </a>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </>
  ) : (
    <p className="text-3xl font-bold my-5 text-center">مفيش بيانات حاليا</p>
  );
};

export default Leaders;
