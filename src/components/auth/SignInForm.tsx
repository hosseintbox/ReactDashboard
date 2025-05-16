import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronLeftIcon, EyeCloseIcon, EyeIcon } from "../../icons";
import { LoginService } from "./LoginService";
import { CreateToast } from "../../components/tools/toast/CreateToast";
import { ToastType } from "../../models/enums/ToastType";
import { SignIn } from "../../setting/ApiUrl";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Checkbox from "../form/input/Checkbox";
import Button from "../ui/button/Button";
import { Formik, Form } from "formik";
import axios from "axios";

export default function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);


const submitHandler = async (values: any) => {
  if (isLoading) return;
  setIsLoading(true);

  try {
    const loginRequest = {
      userName: values.userName,
      password: values.password,
      phonePrefix: "+98",
      validationMethod: 1,
      securityCode: 0,
    };

    const response: any = await LoginService(loginRequest);

if (response?.data?.requestStatus?.name === "Successful") {
  navigate("/Home");
} else {
  CreateToast(
    ToastType.ERROR,
    response?.message ?? "عملیات با موفقیت انجام نشد"
  );
}

  } catch (error) {
    CreateToast(ToastType.ERROR, "خطا در ارسال درخواست");
  } finally {
    setIsLoading(false);
  }
};
return (
  <div className="flex flex-col flex-1">
    <div className="w-full max-w-md pt-10 mx-auto">
      <Link
        to="/"
        className="inline-flex items-center text-sm text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
      >
        <ChevronLeftIcon className="size-5" />
        بازگشت به داشبورد
      </Link>
    </div>

    <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto text-right">
      <div>
        <div className="mb-5 sm:mb-8">
          <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
            ورود به حساب کاربری
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            شماره تلفن و رمز عبور خود را وارد کنید.
          </p>
        </div>

        <div className="relative py-3 sm:py-5">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200 dark:border-gray-800"></div>
          </div>
        </div>

        <Formik
          initialValues={{ userName: "", password: "" }}
          onSubmit={submitHandler}
        >
          {({ values, handleChange, handleBlur, errors, touched }) => (
            <Form className="space-y-6">
              <div>
                <Label>
                  شماره تلفن <span className="text-error-500">*</span>
                </Label>
                <Input
                  name="userName"
                  placeholder="مثلاً 09193559930"
                  value={values.userName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.userName && errors.userName}
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
                    type={showPassword ? "text" : "password"}
                    placeholder="رمز عبور را وارد کنید"
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

              <div className="flex items-center justify-between flex-row-reverse">
                <div className="flex items-center gap-3">
                  <Checkbox checked={isChecked} onChange={setIsChecked} />
                  <span className="block font-normal text-gray-700 text-theme-sm dark:text-white">
                    من را وارد نگه دار
                  </span>
                </div>
                <Link
                  to="/reset-password"
                  className="text-sm text-black hover:text-black dark:text-white"
                >
                  رمز عبور را فراموش کرده‌اید؟
                </Link>
              </div>

              <div>
                <Button
                  type="submit"
                  className="w-full"
                  size="sm"
                  disabled={isLoading}
                >
                  {isLoading ? "در حال ورود..." : "ورود"}
                </Button>
              </div>
            </Form>
          )}
        </Formik>

        <div className="mt-5">
          <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
            حساب کاربری ندارید؟{" "}
            <Link
              to="/signup"
              className="text-black hover:text-black dark:text-white"
            >
              ثبت‌نام کنید
            </Link>
          </p>
        </div>
      </div>
    </div>
  </div>
);

}
