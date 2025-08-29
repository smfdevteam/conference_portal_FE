import { Image } from "@heroui/react";
import mobile from "../assets/images/mobile.jpg";

const NotMobile = () => {
  return (
    <>
      <div className="flex flex-col items-center gap-10">
        <div className="w-[30%]">
          <Image
            src={mobile}
            loading="lazy"
            alt="mobile"
            className="w-[100%]"
          />
        </div>
        <p className="w-[60%] text-center font-bold text-3xl">
          إستخدم الموبايل لتجربة أحسن
        </p>
      </div>
      <p className="font-bold text-3xl text-center my-4">SMF Tech.</p>
    </>
  );
};

export default NotMobile;
