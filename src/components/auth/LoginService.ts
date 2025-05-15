import { log } from "node:console";
import { HttpMethod } from "../../models/enums/HttpMethod";
import { HttpStatus } from "../../models/enums/HttpStatus";
import {
  ILoginRequest,
  ILoginResponse,
} from "../../models/viewModels/api/user/LoginViewModels";
import { DefaultApiHeader } from "../../services/api/ApiHeader";
import { SetUserToken } from "../../services/api/ApiToken";
import { SignIn } from "../../setting/ApiUrl";
import Api from "../../services/api/CallApi";
import * as Yup from "yup";

export const LoginService = async (loginInfo: ILoginRequest) => {
  const result = await Api<ILoginResponse>(
    SignIn,
    { inputData: loginInfo }, 
    DefaultApiHeader,
    HttpMethod.POST
  );

  if (result.status === HttpStatus.OK) {
    await SetUserToken(result.data?.token ?? "");
  }
  return result;
};

export const ValidationSchema = Yup.object({
  email: Yup.string()
    .email("ایمیل نامعتبر است") // Validate email format
    .required("ایمیل الزامی است"),

});
