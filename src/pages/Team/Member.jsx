import { Image, Tooltip } from "@nextui-org/react";
const Member = ({ member }) => {
  const { image , name , position , unit , description} = member;
  return (
    <div className="grid grid-cols-2 items-center border-3 border-warning-100 rounded-2xl">
      <div>
        <Image src={image} loading="lazy" isBlurred isZoomed />
      </div>
      <Tooltip
        content={
          <div className="px-1 py-2">
            <div className="text-lg font-bold">{name}</div>
            <div className="text-sm font-semibold">{unit} | {position}</div>
            <div className="w-[90%]">{description}</div>
          </div>
        }
      >
        <span className="border-2 rounded-full animate-bounce h-[25px] text-center pb-3 w-[25px]">i</span>
      </Tooltip>
    </div>
  );
};

export default Member;
