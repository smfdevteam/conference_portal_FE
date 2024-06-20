import { useEffect, useState } from "react";
import { getConferenceSong } from "../../Api/conference_meta.service";
import toast from "react-hot-toast";
import Full_Screen_Skeleton_Loader from '../../Components/shared/Full_Screen_Skeleton_Loader'
const Song = () => {
  const [song, setSong] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const getSong = async () => {
    setIsLoading(true);
    try {
      const songRes = await getConferenceSong();
      setSong(songRes);
    } catch (e) {
      toast.error("حصلت حاجة غلط جرب اعمل ريفريش");
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getSong();
  }, []);
  return (
    !isLoading ? 
    <>
      <p className="text-center text-4xl font-semibold my-4">الشعار</p>
      {song ? (
        <>
          <div
            className="text-center border-1 border-purple-700 py-3 rounded-2xl"
            dangerouslySetInnerHTML={{
              __html: song.song,
            }}
          ></div>
          <div className="my-5 ">
            <iframe
              width="100%"
              height="350px"
              scrolling="no"
              allow="autoplay"
              src={song.url}
              className="rounded-lg border-3 border-purple-800"
            ></iframe>
          </div>
        </>
      ) : (
        <h1>لا يوجد شعار حاليا</h1>
      )}
    </> : <Full_Screen_Skeleton_Loader/>
  );
};

export default Song;
