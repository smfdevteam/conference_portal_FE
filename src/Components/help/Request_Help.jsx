import "./request_help.css";
const Request_Help = () => {
  return (
    <div className="flex justify-center items-center">
      <button className="req_help my-4 py-3 w-full animate-fly font-bold text-2xl shadow-md border-2 border-danger-600 rounded-md">
        محتاج مساعدة ؟
      <div className="req_help-layer font-bold text-2xl flex items-center text-white justify-center"> اضغط و اطلب مساعدة</div>
      </button>
    </div>
  );
};

export default Request_Help;
