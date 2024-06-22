import { useEffect, useState } from "react";
import { getConferenceFeedBack } from "../../Api/conference_meta.service";
const gradient = {
  background: "radial-gradient(circle at 50% 50%, #8255f1, #0d2486)",
};
const Feedback = () => {
  const [formurl, setFormUrl] = useState(null);
  const getFeedback = async () => {
    const feedback = await getConferenceFeedBack();
    setFormUrl(feedback);
  };
  useEffect(() => {
    getFeedback();
  }, []);
  return (
    formurl?.isEnabled && (
      <a
        style={gradient}
        className=" w-full rounded-lg text-white block border-1 text-center text-3xl  py-2 px-3"
        href={formurl.url}
        target="_blank"
        rel="noreferrer"
      >
        تقييم
      </a>
    )
  );
};

export default Feedback;
