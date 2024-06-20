import React, { useState } from "react";
import { Tooltip } from "@nextui-org/react";
const CustomToolTip = ({
  toolTipHeader,
  toolTipContent,
  customStyle,
  highLightedMessge,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div  onClick={()=> setIsOpen(!isOpen)}>
      <Tooltip
      
      isOpen={isOpen}
      className={customStyle}
      content={
        <div className="w-44 mx-6 " >
          <div className="text-small font-bold  text-right">
            {toolTipHeader}
          </div>
          <div className="text-tiny text-right">
            {toolTipContent}{" "}
            <span className="text-red-600 text-small ">
              {highLightedMessge}
            </span>
          </div>
        </div>
      }
    >
      <div className="text-2xl text-blue-400">?</div>
    </Tooltip>
    </div>

    
  );
};

export default CustomToolTip;
