import { Card, CardHeader, Image, CardBody } from "@heroui/react";
import "./member.css";
const Member = ({ member }) => {
  const { image, name, position, unit, description } = member;
  return (
    <Card className="pt-4">
      <CardHeader className="pt-2 px-4 flex-col items-start">
        <p className="text-tiny uppercase font-bold">{position}</p>
        <small className="text-default-500">{unit}</small>
        <h4 className="font-bold text-large">{name}</h4>
      </CardHeader>
      <CardBody className="overflow-hidden h-[300px]">
        <img src={image} className="object-cover rounded-lg h-[100%]" style={{
          objectPosition:'top'
        }} alt="" />
      </CardBody>
    </Card>
  );
};

export default Member;
