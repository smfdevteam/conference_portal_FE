import { useEffect, useState } from "react";
import { getConferenceProgram } from "../../Api/conference_meta.service";
import toast from "react-hot-toast";
import Full_Screen_Skeleton_Loader from "../../Components/shared/Full_Screen_Skeleton_Loader";
import smfTechLogo from '../../assets/images/brand/smftech.png'
import Material_Card from "../../Components/materials/Material_Card";
const Conference_Program = () => {
  const [programs, setPrograms] = useState(null);
  const [isLoading, setisLoading] = useState(false);
  const getConferenceProgramData = async () => {
    try {
      setisLoading(true);
      const program = await getConferenceProgram();
      setPrograms(program);
    } catch (e) {
      toast.error("حصل مشكلة في تحميل البرنامج جرب تاني");
    } finally {
      setisLoading(false);
    }
  };

  useEffect(() => {
    getConferenceProgramData();
  }, []);
  if (isLoading) return <Full_Screen_Skeleton_Loader />;
  return (
    <>
      <h2 className="text-center text-2xl font-bold my-3">برنامج المؤتمر</h2>
      <p className="text-lg font-bold my-3">

      </p>
      {programs?.length > 0 ? (
        <div className="grid grid-cols-2 gap-4" dir="ltr">
          {programs.map(({ downloadableURL, name }) => (
            <Material_Card
              name={name}
              url={downloadableURL}
              key={downloadableURL}
            />
          ))}
        </div>
      ) : (
        <>
          <img src={smfTechLogo} alt="" />
          <p className="text-2xl text-center font-bold ">
            مفيش برنامج حاليا و هنجبهولك في اقرب وقت
          </p>
          <p className="text-xl text-center font-bold" dir="ltr">
            SMF Tech.
          </p>
        </>
      )}
    </>
  );
};

export default Conference_Program;
