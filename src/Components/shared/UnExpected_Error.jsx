import { Button } from "@nextui-org/react";
import wrong from "../../assets/images/somethingwrong.jpg";
import SMF_Tech from "../SMF_Tech";
import { useNavigate } from "react-router-dom";
const UnExpected_Error = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className=" p-5 flex flex-col items-center justify-center">
        <p className="text-3xl font-bold">خطأ غير متوقع حصل</p>
        <img src={wrong} alt="" />
        <p className="text-3xl font-bold">تقدر تتواصل معانا من هنا</p>
      </div>
      <SMF_Tech />
      <Button variant="shadow" color="warning" className="w-full my-3" onClick={() => navigate("/")}>الرجوع إلي الرئيسية</Button>
    </>
  );
};

export default UnExpected_Error;
