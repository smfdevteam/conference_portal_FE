import React, { Suspense, lazy, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getConferenceSpeakers } from "../../Api/conference_meta.service";
import Full_Screen_Skeleton_Loader from "../../Components/shared/Full_Screen_Skeleton_Loader";
const Speaker_Card = lazy(() =>
  import("../../Components/speakers/Speaker_Card")
);
const Speakers = () => {
  const [speakers, setSpeakers] = useState([]);
  const [isLoading, setIsLoading] = useState([]);
  const getSpeakers = async () => {
    try {
      setIsLoading(true);
      const speakersRes = await getConferenceSpeakers();
      setSpeakers(speakersRes);
    } catch (e) {
      toast.error("جرب تاني كده ");
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getSpeakers();
  }, []);
  if (isLoading) return <Full_Screen_Skeleton_Loader />;
  return (
    <>
      {speakers.length > 0 ? (
        <>
          <p className="text-xl my-3 text-center">
            عندنا في المؤتمر
            <span className="font-bold text-warning mx-2">
              {speakers.length}
            </span>
            متكلمين
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {speakers.map((speaker) => {
              return (
                <Suspense
                  key={speaker.id}
                  fallback={<Full_Screen_Skeleton_Loader />}
                >
                  <Speaker_Card speaker={speaker} />
                </Suspense>
              );
            })}
          </div>
        </>
      ) : (
        <div className="h-full flex justify-center items-center">
          <p className="text-xl my-3 text-center">
            مفيش متكلمين حاليا
          </p>
        </div>
      )}
    </>
  );
};

export default Speakers;
