import { Image } from "@nextui-org/react";
import notFound from "../assets/images/notfound.jpg";
const NotFound = () => {
  return (
    <>
      <Image src={notFound} loading="lazy" alt="mobile" className="w-[100%]" />
      <p className="text-center font-bold text-3xl mt-5">من الواضح ان الصفحة دي مش موجودة </p>
    </>
  );
};

export default NotFound;
