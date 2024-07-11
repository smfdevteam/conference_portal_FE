import { useContext } from "react";
import cashBackIcon from "../../assets/images/icons/cashback.png";
import { stateProvider } from "../../Context/App_Context";
import Guest_Home from "./GuestHome/Guest_Home";
import Top_Achievers from "./Teams/Top_Achievers";

const Points_Overview = () => {
  const {
    app_state: {
      user: { points, pointId },
    },
  } = useContext(stateProvider);
  return (
    <div>
      <div className="flex justify-center items-center">
        <img src={cashBackIcon} width={70} alt=""/>
      </div>
      <p className="text-center my-2">
        هنا هتبقي عارف كل النقط اللي انت جمعتها لحد دلوقتي في المؤتمر
      </p>
      <div className="flex items-center gap-5 justify-center my-4">
        <div>
        <p className="text-center mt-2 mb-1">Points ID</p>
          <p className="text-center m-auto text-5xl border-2 rounded-full w-fit p-3 border-purple-800">
            {pointId}
          </p>
        </div>
        <div>
          <p className="text-center mt-2 mb-1">My Points</p>
          <p className="text-center m-auto text-5xl border-2 rounded-full w-fit p-3 border-purple-800">
            {points}
          </p>
        </div>
      </div>
      <Guest_Home/>
      <Top_Achievers/>
    </div>
  );
};

export default Points_Overview;
