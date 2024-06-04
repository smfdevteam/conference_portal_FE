import { api } from "./api";

const getMessagesCount = async () => {
  try {
    const count = await api.get("/guest/messages/private_length");
    console.log(count , "COUNT")
    return count;
  } catch (e) {
    throw new Error(e.message);
  }
};




export {
    getMessagesCount
}