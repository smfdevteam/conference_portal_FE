import { useEffect, useState, useId, lazy, Suspense } from "react";
import toast from "react-hot-toast";
import { getUserMessages } from "../../Api/user.service";
import SMF_QR from "../../Components/QR/SMF_QR";
import ShareProfile from "../../Components/ShareProfile/ShareProfile";
import Full_Screen_Skeleton_Loader from "../../Components/shared/Full_Screen_Skeleton_Loader";
const Message_Card = lazy(() =>
  import("../../Components/messages/Message_Card")
);
const Messages = () => {
  const [messages, setMessages] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const id = useId();
  const getMessages = async () => {
    try {
      setIsLoading(true);
      const userMessages = await getUserMessages();
      setMessages(userMessages);
    } catch (e) {
      toast.error("جرب تاني");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getMessages();
  }, []);

  if (isLoading) return <Full_Screen_Skeleton_Loader />;
  return (
    <div dir="ltr" className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {messages ? (
        messages.messages.map((message) => (
          <Suspense key={id} fallback={<Full_Screen_Skeleton_Loader />}>
            <Message_Card userMessage={message} />
          </Suspense>
        ))
      ) : (
        <div className="h-full flex justify-center items-center flex-col">
          <p className="text-xl my-3 text-center font-bold">
            اعمل شير لبروفايلك علشان نقدر نبعتلك رسايل
          </p>
          <div>
            <SMF_QR />
            <ShareProfile />
          </div>
        </div>
      )}
    </div>
  );
};

export default Messages;
