import React from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import './CustomPhoneInput.css'
import ar from 'react-phone-number-input/locale/ar'
const CustomPhoneInput = ({phoneNumber,setPhoneNumer,formik}) => {
  return (
    <>
      <PhoneInput
        className={
          "border-2  rounded-xl h-14   p-5 text-right hover:border-[#A1A1AA] " +
          (formik.errors.phone && formik.touched.phone
            ? "border-[#F31763] hover:border-[#F31763] "
            : null)
        }
        labels={ar}
        name="phone"
        placeholder="الموبايل"
        defaultCountry="EG"
        value={phoneNumber}
        onChange={setPhoneNumer}
        onBlur={formik.handleBlur}
        international
        countryCallingCodeEditable={false}
      />
      {formik.errors.phone && formik.touched.phone ? (
        <div className="text-[#F31763] text-sm">{formik.errors.phone}</div>
      ) : null}
    </>
  );
};

export default CustomPhoneInput;
