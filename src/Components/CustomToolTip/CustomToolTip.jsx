import React from "react";
import { Tooltip } from "@nextui-org/react";
const CustomToolTip = ({toolTipHeader,toolTipContent,customStyle,highLightedMessge}) => {
  return (
    <Tooltip
      className={customStyle}
      content={
        <div className="w-44 mx-6">
          <div className="text-small font-bold  text-right">{toolTipHeader}</div>
          <div className="text-tiny text-right">{toolTipContent} <span className="text-red-600 text-small ">{highLightedMessge}</span></div>
        </div>
      }
    >
      <div className="text-2xl text-orange-400">?</div>
    </Tooltip>
  );
};

export default CustomToolTip;
