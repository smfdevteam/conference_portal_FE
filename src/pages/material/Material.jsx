import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getConferenceMaterial } from "../../Api/conference_meta.service";
import Material_Card from "../../Components/materials/Material_Card";
import Full_Screen_Skeleton_Loader from "../../Components/shared/Full_Screen_Skeleton_Loader";
import smfTechLogo from "../../assets/images/brand/smftech.png";

const Material = () => {
  const [materials, setMaterials] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const getMaterials = async () => {
    try {
      setIsLoading(true);
      const materialsRes = await getConferenceMaterial();
      setMaterials(materialsRes);
    } catch (e) {
      toast.error(e.message);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getMaterials();
  }, []);
  if (isLoading) return <Full_Screen_Skeleton_Loader />;
  return (
    <>
      <h2 className="text-center text-2xl font-bold my-3">ملفات المؤتمر</h2>
      <p className="text-lg font-bold my-3"> عدد الملفات : {materials.length}</p>
      {materials.length > 0 ? (
        <div className="grid grid-cols-2 gap-4" dir="ltr">
          {materials.map(({ fileSize, name, url }) => (
            <Material_Card
              fileSize={fileSize}
              name={name}
              url={url}
              key={url}
            />
          ))}
        </div>
      ) : (
        <>
          <img src={smfTechLogo} alt="" />
          <p className="text-2xl text-center font-bold ">
            مفيش ملفات مرفوعة حاليا بس أول ما يترفع هنبلغك
          </p>
          <p className="text-xl text-center font-bold" dir="ltr">
            SMF Tech.
          </p>
        </>
      )}
    </>
  );
};

export default Material;
