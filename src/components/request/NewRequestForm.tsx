import { useState, useEffect } from "react";
import { Link } from "react-router";
import { Formik } from "formik";
import * as Yup from "yup";
import { ChevronLeftIcon, EyeCloseIcon, EyeIcon } from "../../icons";
import { HttpMethod } from "../../models/enums/HttpMethod";
import AutoComplete from "../tools/autoComplete/AutoComplete";
import Api from "../../services/api/CallApi";
import { GetAllPhonePrefix ,SignUp} from "../../setting/ApiUrl";
import Button from "../ui/button/Button";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Checkbox from "../form/input/Checkbox";


const NewRequestForm = () => {
  interface Prefix {
  id: number;
  name: string;
  value: string;
}
  interface ApiResponse {
  data: {
    objectResult: Prefix[];
  };
}
  const [showPassword, setShowPassword] = useState(false);
  const [prefixes, setPrefixes] = useState([]);
  const [loading, setLoading] = useState(false);

console.log('prefixes',prefixes)
useEffect(() => {
  const fetchPrefixes = async () => {
    setLoading(true);
    try {
      const response: any = await Api(
        GetAllPhonePrefix,
        {},
        { "Content-Type": "application/json" },
        HttpMethod.GET
      );
      const rawPrefixes = response.data?.objectResult || [];
      console.log('rawPrefixes',rawPrefixes)
      const formattedPrefixes = rawPrefixes.map((item: any) => ({
        value: item.flag
,
         label: item.
phonePrefix, 
      }));

      console.log("پیش‌شماره‌ها:", formattedPrefixes);
      setPrefixes(formattedPrefixes);
    } catch (err) {
      console.error("خطا در دریافت پیش شماره‌ها", err);
    } finally {
      setLoading(false);
    }
  };

  fetchPrefixes();
}, []);

const handleSubmitButtonClick = async (values: any) => {
  const data = {model:values }
  console.log("اطلاعات فرم:", data);
  setLoading(true); // اگر از state مربوط به لودینگ استفاده می‌کنی

  try {
    const response: any = await Api(
      SignUp, // مسیر API
      data, // داده‌هایی که از فرم گرفته شده
      { "Content-Type": "application/json" },
      HttpMethod.POST
    );

    console.log("ثبت‌نام موفق:", response.data);
    // TODO: در صورت موفقیت مثلاً نمایش پیام موفقیت یا رفتن به صفحه دیگر

  } catch (err) {
    console.error("خطا در ثبت‌نام:", err);
    // TODO: نمایش پیام خطا به کاربر
  } finally {
    setLoading(false);
  }
};

  const validationSchema = Yup.object({
    fname: Yup.string().required("نام الزامی است"),
    lname: Yup.string().required("نام خانوادگی الزامی است"),
    email: Yup.string().email("ایمیل نامعتبر است").required("ایمیل الزامی است"),
    password: Yup.string().min(6, "رمز عبور باید حداقل ۶ کاراکتر باشد").required("رمز عبور الزامی است"),
    terms: Yup.boolean().oneOf([true], "پذیرش قوانین الزامی است"),
  });

return (
  <div className="flex flex-col flex-1 w-full overflow-y-auto lg:w-1/2 no-scrollbar rtl">
    <div className="w-full max-w-md mx-auto mb-5 sm:pt-10">
      <Link
        to="/"
        className="inline-flex items-center text-sm text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
      >
        <ChevronLeftIcon className="size-5  ml-1" />
        بازگشت به داشبورد
      </Link>
    </div>

    <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
      <div>
        <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md text-right">
          ثبت‌نام
        </h1>
        <p className="mb-5 text-sm text-gray-500 dark:text-gray-400 text-right">
          برای ثبت‌نام، اطلاعات زیر را وارد کنید
        </p>

        {/* Divider */}
        <div className="relative py-3 sm:py-5">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200 dark:border-gray-800" />
          </div>
        </div>

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
     <AutoComplete
      inputClassName="rounded-lg border border-gray-300 text-right"
      className="rounded-lg"
      name="phonePrefix"
      value={values.phonePrefix}
      options={prefixes}
      placeholder="پیش شماره"
      label="پیش شماره "
    />
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

        <div className="mt-5">
          <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-center">
            قبلاً حساب دارید؟{" "}
            <Link to="/signin" className="text-brand-500 hover:text-brand-600 dark:text-brand-400">
              وارد شوید
            </Link>
          </p>
        </div>
      </div>
    </div>
  </div>
);

};

export default NewRequestForm;
