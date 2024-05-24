import { useContext } from "react";
import { stateProvider } from "../Context/App_Context";
const gradientStyle = {
  background: "radial-gradient(circle at 50% 50%, #8255f1, #0d2486)",
};
const Location = () => {
  const { app_state } = useContext(stateProvider);
  const { conference } = app_state;
  const handleIframeLoading = async () => {
    const iframe = document.querySelector("iframe");
    await iframe.contentWindow.onload;
    console.log("loaded");
  };
  return (
    <div
      className="h-[80vh] w-[100%] text-white py-4 px-2 rounded-2xl"
      style={gradientStyle}
    >
      <p className="text-center text-4xl font-semibold my-4">مكاننا</p>
      <iframe
        title="map"
        src={conference.url}
        onLoad={handleIframeLoading}
        style={{
          borderRadius: "21px",
          height: "85%",
          width: "100%",
        }}
        allowFullScreen
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture full"
        loading="lazy"
      ></iframe>
    </div>
  );
};

export default Location;
