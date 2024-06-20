import { useEffect, useState } from "react";
import { getConferenceLocation } from "../Api/conference_meta.service";
import toast from "react-hot-toast";
const gradientStyle = {
  background: "radial-gradient(circle at 50% 50%, #8255f1, #0d2486)",
};
const Location = () => {
  const [location, setLocation] = useState(null);
  const getLocation = async () => {
    try{
      const locationRes = await getConferenceLocation();
      setLocation(locationRes.url);
    } catch(e) {
      toast.error('حصلت حاجة غلط جرب اعمل ريفريش')
    }
  };
  useEffect(() => {
    getLocation();
  }, []);

  return (
    <div
      className="h-[80vh] w-[100%] text-white py-4 px-2 rounded-2xl"
      style={gradientStyle}
    >
      <p className="text-center text-4xl font-semibold my-4">مكاننا</p>
      <div className="overflow-hidden rounded-3xl h-fit" dangerouslySetInnerHTML={{
        __html : location
      }}></div>
    </div>
  );
};

export default Location;
