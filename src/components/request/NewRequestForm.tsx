import { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import Input from "../form/input/InputField";
import Checkbox from "../form/input/Checkbox";
import Label from "../form/Label";
import Button from "../ui/button/Button";
import { EyeIcon, EyeCloseIcon } from "../../icons";

const SimpleSignUpForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const validationSchema = Yup.object({
    email: Yup.string().email("ایمیل نامعتبر است").required("ایمیل الزامی است"),
    password: Yup.string().min(6, "حداقل ۶ کاراکتر").required("رمز عبور الزامی است"),
    terms: Yup.boolean().oneOf([true], "پذیرش قوانین الزامی است"),
  });

  const handleSubmitButtonClick = (values: any) => {
    console.log("اطلاعات فرم:", values);
    // درخواست به API...
  };

  return (
   <div className="w-full max-w-md h-auto bg-white rounded-lg shadow-inherit">
        <Formik
          initialValues={{
            displayName: "",
            phoneNumber: "",
            phonePrefix:"",
            email: "",
            password: "",
            inviteCode:"",
            terms: false,
          }}
          // validationSchema={validationSchema}
          onSubmit={handleSubmitButtonClick}
        >
          {({ values, handleChange, handleBlur, handleSubmit, touched, errors, setFieldValue }) => (
          <form onSubmit={handleSubmit} className="space-y-5 text-right">

  {/* نام نمایشی */}
  <div>
    <Label>
      نام نمایشی <span className="text-error-500">*</span>
    </Label>
    <Input
      type="text"
      name="displayName"
      placeholder="نام نمایشی را وارد کنید"
      value={values.displayName}
      onChange={handleChange}
      onBlur={handleBlur}
      error={touched.displayName && errors.displayName}
      className="text-right"
    />
  </div>

  {/* زون تحت پوشش و شماره تلفن کنار هم */}
  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
   
    <div>
      <Label>
        شماره تلفن <span className="text-error-500">*</span>
      </Label>
      <Input
        type="text"
        name="phoneNumber"
        placeholder=" شماره تلفن را وارد کنید"
        value={values.phoneNumber}
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.phoneNumber && errors.phoneNumber}
        className="text-right"
      />
    </div>
     <div>
    <Label>
      نام نمایشی <span className="text-error-500">*</span>
    </Label>
    <Input
      type="text"
      name="displayName"
      placeholder="نام نمایشی را وارد کنید"
      value={values.displayName}
      onChange={handleChange}
      onBlur={handleBlur}
      error={touched.displayName && errors.displayName}
      className="text-right"
    />
  </div>
  </div>

  {/* ایمیل */}
  <div>
    <Label>
      ایمیل <span className="text-error-500">*</span>
    </Label>
    <Input
      type="email"
      name="email"
      placeholder="ایمیل خود را وارد کنید"
      value={values.email}
      onChange={handleChange}
      onBlur={handleBlur}
      error={touched.email && errors.email}
      className="text-right"
    />
  </div>

  {/* کد دعوت */}
  <div>
    <Label>
      کد دعوت <span className="text-error-500">*</span>
    </Label>
    <Input
      type="text"
      name="inviteCode"
      placeholder="در صورتی که کد دعوت دارید آن را وارد کنید"
      value={values.inviteCode}
      onChange={handleChange}
      onBlur={handleBlur}
      error={touched.inviteCode && errors.inviteCode}
      className="text-right"
    />
  </div>

  {/* رمز عبور */}
  <div>
    <Label>
      رمز عبور <span className="text-error-500">*</span>
    </Label>
    <div className="relative">
      <Input
        name="password"
        placeholder="رمز عبور را وارد کنید"
        type={showPassword ? "text" : "password"}
        value={values.password}
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.password && errors.password}
        className="text-right"
      />
      <span
        onClick={() => setShowPassword(!showPassword)}
        className="absolute z-30 -translate-y-1/2 cursor-pointer left-4 top-1/2"
      >
        {showPassword ? (
          <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
        ) : (
          <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
        )}
      </span>
    </div>
  </div>

  {/* قوانین و مقررات */}
<div className="flex items-center gap-3 justify-end text-right">
  
  <p className="inline-block font-normal text-gray-500 dark:text-gray-400 text-xs text-right">
    با ساخت حساب کاربری، شما با{" "}
    <span className="text-gray-800 dark:text-white/90">قوانین</span> و{" "}
    <span className="text-gray-800 dark:text-white/90">حریم خصوصی</span> موافقت می‌کنید
  </p>
  <Checkbox
    className="w-5 h-5"
    checked={values.terms}
    onChange={(val) => setFieldValue("terms", val)}
  />
</div>

  {touched.terms && errors.terms && (
    <p className="text-xs text-error-500 -mt-2">{errors.terms}</p>
  )}

  <div>
    <Button
      type="submit"
      className="w-full"
      size="sm"
    >
      ثبت‌نام
    </Button>
  </div>
</form>

          )}
        </Formik>

    </div>
    
  );
};

export default SimpleSignUpForm;
