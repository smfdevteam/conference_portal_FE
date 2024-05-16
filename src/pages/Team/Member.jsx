import { Image } from "@nextui-org/react";
import { Suspense, lazy, useState } from "react";
import Skeleton_Loader from "../../Components/shared/Skeleton_Loader";
const Smf_Modal = lazy(() => import("../../Components/shared/Smf_Modal"));
const Member = ({ member }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const handleImageLoading = (isLoaded) => setIsImageLoaded(isLoaded);
  const { image, name, position, unit, description } = member;
  return (
    <div className="grid grid-cols-2 items-center justify-between border-3 border-warning-100 rounded-2xl">
      <div>
        <Image
          onLoad={() => handleImageLoading(true)}
          src={image}
          loading="lazy"
          isBlurred
          isZoomed
        />
      </div>
      {isImageLoaded && (
        <Suspense fallback={Skeleton_Loader}>
          <Smf_Modal btnTitle={name.split(" ")[0]} isClose modalTitle={name}>
            <Image src={image} width={300} loading="lazy" isBlurred />
            <div className="px-1 py-2">
              <div className="text-3xl font-bold">{name}</div>
              <div className="text-2xl font-semibold">
                {unit} | {position}
              </div>
              <div className="w-[90%] text-xl">{description}</div>
            </div>
          </Smf_Modal>
        </Suspense>
      )}
    </div>
  );
};

export default Member;
