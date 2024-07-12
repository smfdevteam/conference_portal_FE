import React from "react";
import Guest_Points from "../../Components/Points/Guest/Guest_Points";
import { useParams } from "react-router-dom";
const Guest_Points_Page = () => {
  const { pointId } = useParams();
  return (
    <>
      <Guest_Points pointId={pointId} />
    </>
  );
};

export default Guest_Points_Page;
