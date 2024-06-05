import React from "react";
import callIcon from "../../assets/images/icons/call.png";
import logo from "../../assets/images/brand/smftech.png";
import {
  Avatar,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Link,
} from "@nextui-org/react";
const Message_Card = ({ userMessage }) => {
  const { message, sender_mobile, sender_name, sender_pic, time, from } =
    userMessage;
  return (
    <Card className="text-center">
      <CardHeader className="flex justify-between">
        <div className="flex gap-3">
          <Avatar
            alt={sender_name}
            height={40}
            radius="full"
            imgProps={{
              style: {
                objectFit: "contain",
                background: "white",
              },
            }}
            src={sender_pic}
            width={40}
            isBordered
          />
          <div className="flex flex-col text-left">
            <p className="text-md capitalize font-bold ">{sender_name}</p>
            <p className="text-small text-default-500">{time.split("T")[0]}</p>
          </div>
        </div>
        <Avatar
          alt={sender_name}
          height={40}
          radius="full"
          imgProps={{
            style: {
              background: "white",
              width: "100%",
              height: "250%",
            },
          }}
          src={logo}
          width={40}
          isBordered
        />
      </CardHeader>
      <Divider />
      <CardBody dir="rtl" className="text-center">
        <p className="font-semibold">{message}</p>
      </CardBody>
      <Divider />
      {from != "admin" && (
        <CardFooter className="flex justify-between">
          <a href={`tel:${sender_mobile}`}>
            <img src={callIcon} width={20} alt="" />
          </a>
          <Link isExternal showAnchorIcon href="" color="primary">
            {sender_name}
          </Link>
        </CardFooter>
      )}
    </Card>
  );
};

export default Message_Card;
