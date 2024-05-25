import { Outlet } from "react-router-dom";
import Bible_context from "../../Context/Bible_context";

const Bible = () => {
  return (
    <Bible_context>
      <Outlet />
    </Bible_context>
  );
};

export default Bible;
