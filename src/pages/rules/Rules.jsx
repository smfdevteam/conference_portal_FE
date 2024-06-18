import { useEffect, useState } from "react";
import { getConferenceRules } from "../../Api/conference_meta.service";
import toast from "react-hot-toast";
import Full_Screen_Skeleton_Loader from "../../Components/shared/Full_Screen_Skeleton_Loader";

const Rules = () => {
  const [rules, setRules] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const getRules = async () => {
    setIsLoading(true)
    try {
      const { rules } = await getConferenceRules();
      setRules(rules);
    } catch (e) {
      toast.error(e.message);
    } finally {
        setIsLoading(false)
    }
  };

  useEffect(() => {
    getRules();
  }, []);
  return (
    <>
      {!isLoading ? (
        <>
          {rules ? (
            <div
              dangerouslySetInnerHTML={{
                __html: rules,
              }}
            ></div>
          ) : (
            <h1 className="text-center text-3xl my-5">لا توجد بيانات حاليا</h1>
          )}
        </>
      ) : (
        <Full_Screen_Skeleton_Loader />
      )}
    </>
  );
};

export default Rules;
