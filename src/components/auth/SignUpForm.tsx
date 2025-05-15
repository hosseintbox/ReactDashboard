import { useState } from "react";
import { Link } from "react-router";
import { Formik } from "formik";
import * as Yup from "yup";
import { ChevronLeftIcon, EyeCloseIcon, EyeIcon } from "../../icons";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Checkbox from "../form/input/Checkbox";

const SignUpForm = () => {
  const [showPassword, setShowPassword] = useState(false);

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
          برای ثبت‌نام، اطلاعات زیر را وارد کنید.
        </p>

        {/* Divider */}
        <div className="relative py-3 sm:py-5">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200 dark:border-gray-800" />
          </div>
        </div>

        <Formik
          initialValues={{
            fname: "",
            lname: "",
            email: "",
            password: "",
            terms: false,
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            console.log("Form Values", values);
            // عملیات ارسال به سرور
          }}
        >
          {({ values, handleChange, handleBlur, handleSubmit, touched, errors, setFieldValue }) => (
            <form onSubmit={handleSubmit} className="space-y-5 text-right">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <Label>
                    نام <span className="text-error-500">*</span>
                  </Label>
                  <Input
                    type="text"
                    name="fname"
                    placeholder="نام خود را وارد کنید"
                    value={values.fname}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.fname && errors.fname}
                    className="text-right"
                  />
                </div>
                <div>
                  <Label>
                    نام خانوادگی <span className="text-error-500">*</span>
                  </Label>
                  <Input
                    type="text"
                    name="lname"
                    placeholder="نام خانوادگی را وارد کنید"
                    value={values.lname}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.lname && errors.lname}
                    className="text-right"
                  />
                </div>
              </div>

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

              <div className="flex items-center gap-3 text-right">
                <Checkbox
                  className="w-5 h-5"
                  checked={values.terms}
                  onChange={(val) => setFieldValue("terms", val)}
                />
                <p className="inline-block font-normal text-gray-500 dark:text-gray-400 text-xs">
                  با ساخت حساب کاربری، شما با{" "}
                  <span className="text-gray-800 dark:text-white/90">قوانین</span> و{" "}
                  <span className="text-gray-800 dark:text-white/90">حریم خصوصی</span> موافقت می‌کنید.
                </p>
              </div>
              {touched.terms && errors.terms && (
                <p className="text-xs text-error-500 -mt-2">{errors.terms}</p>
              )}

              <div>
                <button
                  type="submit"
                  className="flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-white transition rounded-lg bg-brand-500 shadow-theme-xs hover:bg-brand-600"
                >
                  ثبت‌نام
                </button>
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

export default SignUpForm;
