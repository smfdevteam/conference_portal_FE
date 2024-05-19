import personPlaceHolder from '../../assets/images/team/samaan.png'
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
  Image,
} from "@nextui-org/react";
const User_Card = () => {
  return (
    <Card dir="ltr">
      <CardHeader className="flex gap-3">
        <Image
          alt="nextui logo"
          height={40}
          radius="sm"
          src={personPlaceHolder}
          width={40}
        />
        <div className="flex flex-col">
          <p className="text-md">Abanoub Samaan</p>
          <p className="text-small text-default-500">Senior Software Engineer</p>
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        <p>Founder of SMF Tech. and love creating new apps everyday</p>
      </CardBody>
      <Divider />
      <CardFooter>
        <Link
          isExternal
          showAnchorIcon
          href="https://github.com/nextui-org/nextui"
        >
          View my profile
        </Link>
      </CardFooter>
    </Card>
  );
};

export default User_Card;
