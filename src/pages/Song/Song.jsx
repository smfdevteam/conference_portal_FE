import { useEffect, useState } from "react";
import { getConferenceSong } from "../../Api/conference_meta.service";
import toast from "react-hot-toast";
const Song = () => {
  const [song, setSong] = useState(null);
  const getSong = async () => {
    try {
      const songRes = await getConferenceSong();
      setSong(songRes.song);
    } catch (e) {
      toast.error("حصلت حاجة غلط جرب اعمل ريفريش");
    }
  };
  useEffect(() => {
    getSong();
  }, []);
  return (
    <>
      <p className="text-center text-4xl font-semibold my-4">الشعار</p>
      <div
        className="text-center border-1 border-purple-700 py-3 rounded-2xl"
        dangerouslySetInnerHTML={{
          __html: song,
        }}
      ></div>
      ;
    </>
  );
};

export default Song;
