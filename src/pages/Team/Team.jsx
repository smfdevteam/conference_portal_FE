import { Image } from "@heroui/react";
import { SmfTechTeam } from "../../assets/data/team";
import smf_tech_logo from "../../assets/images/brand/smftech.png";
import smf_tech_logo_type from "../../assets/images/brand/smftecttypo.png";
import { Suspense, lazy } from "react";
import Full_Screen_Skeleton_Loader from "../../Components/shared/Full_Screen_Skeleton_Loader";
const Member = lazy(() => import("./Member"));
const gradientStyle = {
  background: "radial-gradient(circle at 50% 50%, #8255f1, #0d2486)",
};
const Team = () => {
  return (
    <div
      dir="ltr"
      className="rounded-md pb-10 text-white "
      style={gradientStyle}
    >
      <div className="grid grid-cols-2 items-center justify-center">
        <Image src={smf_tech_logo_type} />
        <Image src={smf_tech_logo} />
      </div>
      <div className="my-3 m-auto">
        <p className="text-3xl font-bold text-center">Meet SMF Tech. Leaders</p>
        <p className="text-xl w-[85%] mx-auto mb-3 text-center">
          Home of Brilliant Minds Crafting Creativity
        </p>
        <div className="flex justify-center my-3" onClick={()=>window.open('https://forms.gle/7HS6Sx5is7y7R4YXA' , '_blank')}>
          <button className="text-center px-4 py-2 w-[85%] bg-black rounded-lg">
            Join Us Now
          </button>
        </div>
        <div className="w-[85%] grid grid-cols-1 justify-center items-center sm:grid-cols-3 gap-3 m-auto ">
          {SmfTechTeam.map((member) => (
            <Suspense
              key={member.name}
              fallback={<Full_Screen_Skeleton_Loader />}
            >
              <Member member={member} />
            </Suspense>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Team;
