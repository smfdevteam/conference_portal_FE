import logo from '../../assets/images/brand/familyLogo-removebg-preview (1).png'
import { QRCode } from "react-qrcode-logo";

const SMF_QR = () => {
  return (
    <div className="border-2 rounded-lg w-fit my-4 p-5 ">
      <QRCode value="https://www.google.com" logoImage={logo} qrStyle="dots" quietZone={10} removeQrCodeBehindLogo eyeRadius={200} eyeColor={'#B89811'}/>
      
    </div>
  );
};

export default SMF_QR;
