import toast from "react-hot-toast";
import { api } from "./api";

const getMessagesCount = async () => {
  try {
    const {
      data: { count },
    } = await api.get("/guest/messages/private_length");
    return count;
  } catch (e) {
    throw new Error(e.message);
  }
};
const getUserMessages = async () => {
  try {
    const {
      data: { count, messages },
    } = await api.get("/guest/messages/private");
    return { count, messages };
  } catch (e) {
    throw new Error(e);
  }
};

const sendRequestHelpMessage = async (message) => {
  toast.loading("بنبعت الرسالة");
  try {
    await api.post("/guest/messages/help", message);
    toast.dismiss();
  } catch (error) {
    toast.error("جرب ابعتها تاني");
  }
};

export { getMessagesCount, getUserMessages , sendRequestHelpMessage };
