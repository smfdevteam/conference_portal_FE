import { useContext, useId } from "react";
import cashBackIcon from "../../assets/images/icons/cashback.png";
import { stateProvider } from "../../Context/App_Context";
import Guest_Home from "./GuestHome/Guest_Home";
import Top_Achievers from "./Top_Achievers";
import SMF_QR from "../QR/SMF_QR";
import ShareSvg from "../../assets/images/icons/qr_code_icon.png";
import Smf_Modal from "../shared/Smf_Modal";

const Points_Overview = () => {
  function formatPoints(points) {
    if (points >= 1000000) {
      return (points / 1000000).toFixed(1) + 'm';
    } else if (points >= 1000) {
      // Check if points are exactly a round thousand
      if (points % 1000 === 0) {
        return (points / 1000) + 'k'; // Display without decimal if exactly thousand
      } else {
        return (points / 1000).toFixed(1) + 'k'; // Display with one decimal if not exactly thousand
      }
    } else {
      return points.toString();
    }
  }
  const randomId = useId();
  const {
    app_state: {
      user: { points, pointId },
    },
  } = useContext(stateProvider);
  return (
    <div>
      <div className="flex justify-center items-center">
        <img src={cashBackIcon} width={70} alt="" />
      </div>
      <p className="text-center my-2">
        هنا هتبقي عارف كل النقط اللي انت جمعتها لحد دلوقتي في المؤتمر
      </p>
      <div className="flex flex-col items-center gap-5 justify-center my-4">

        <div className="flex gap-4">
          <div>
            <p className="text-center mt-2 mb-1">Points ID</p>
            <p className="text-center m-auto text-5xl border-2 rounded-full w-fit p-3 border-purple-800">
              {pointId}
            </p>
          </div>
          <div>
            <p className="text-center mt-2 mb-1">My Points</p>
            <p className="truncate text-center m-auto text-5xl border-2 rounded-full w-fit p-3 border-purple-800">
              {formatPoints(points)}
            </p>
          </div>
        </div>
        <p className="text-2xl text-yellow-600">مجموع النقط {points}</p>

        <div className="flex flex-col items-center">
          <p>شير ال qr مع الليدر لو عايز تضيف نقط</p>
          <Smf_Modal
            isBtnImage
            btnImgClassNames={"w-[60px]"}
            btnImgSrc={ShareSvg}
          >
            <div className="flex justify-center flex-col items-center">
              <p className="text-xl text-center">
                Share the QR With your Leader
              </p>
              <SMF_QR
                link={`${
                  window.location.origin
                }/client_app_points/${randomId}/${pointId}/${Date.now()}/_conference/`}
              />
            </div>
          </Smf_Modal>
        </div>
      </div>

      <Guest_Home />
      <Top_Achievers />
    </div>
  );
};

export default Points_Overview;
