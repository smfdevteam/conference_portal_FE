import { useEffect, useState } from "react";
import { getConferenceHost } from "../../Api/conference_meta.service";
import toast from "react-hot-toast";
import Full_Screen_Skeleton_Loader from "../../Components/shared/Full_Screen_Skeleton_Loader";

const Host = () => {
  const [host, setHost] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const getHost = async () => {
    setIsLoading(true);
    try {
      const { about } = await getConferenceHost();
      setHost(about);
    } catch (e) {
      toast.error(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getHost();
  }, []);
  return (
    <>
      {!isLoading ? (
        <>
          {host ? (
            <div className="text-xl"
              dangerouslySetInnerHTML={{
                __html: host,
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

export default Host;
