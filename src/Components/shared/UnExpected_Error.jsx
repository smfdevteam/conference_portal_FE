import wrong from "../../assets/images/somethingwrong.jpg";
import SMF_Tech from "../SMF_Tech";
const UnExpected_Error = () => {
  return (
    <>
      <div className=" p-5 flex flex-col items-center justify-center">
        <p className="text-3xl font-bold">خطأ غير متوقع حصل</p>
        <img src={wrong} alt="" />
        <p className="text-3xl font-bold">تقدر تتواصل معانا من هنا</p>
      </div>
      <SMF_Tech />
    </>
  );
};

export default UnExpected_Error;
