import { Image } from "@nextui-org/react";
import { lazy, useState } from "react";
import Skeleton_Loader from "../../Components/shared/Skeleton_Loader";
import arrowIcon from "../../assets/images/icons/arrowright.png";
import "./member.css";
const Smf_Modal = lazy(() => import("../../Components/shared/Smf_Modal"));
const Member = ({ member }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const handleImageLoading = (isLoaded) => setIsImageLoaded(isLoaded);
  const { image, name, position, unit, description } = member;
  return (
    <div  className="member grid relative overflow-hidden grid-cols-2 items-center justify-between border-3 border-warning-100 rounded-2xl">
      <div className="cursor-pointer">
        <Image
          onLoad={() => handleImageLoading(true)}
          src={image}
          loading="lazy"
          isBlurred
        />
        <div  className="layer w-[100%] top-0  h-[100%]  absolute">
          <div>
            {isImageLoaded ? (
                <div className="translate-x-[60%] translate-y-10">
                  <Smf_Modal
                    isBtnImage
                    btnImgSrc={arrowIcon}
                    btnImgClassNames={"w-[20px] mx-3"}
                    isClose
                    modalTitle={name}
                  >
                    <div dir="ltr">
                      <Image src={image} width={150} loading="lazy" isBlurred />
                      <div className="px-1 py-2 h-[400px] overflow-y-scroll">
                        <div className="text-3xl font-bold">{name}</div>
                        <div className="text-2xl font-semibold">
                          {unit} | {position}
                        </div>
                        <div className="w-[90%] text-xl">{description}</div>
                      </div>
                    </div>
                  </Smf_Modal>
                </div>
            ) : <Skeleton_Loader/>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Member;
