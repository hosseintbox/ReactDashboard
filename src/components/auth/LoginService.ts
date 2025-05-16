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
    { model: loginInfo }, 
    DefaultApiHeader,
    HttpMethod.POST
  );

  if (result.status === HttpStatus.OK) {
    console.log("result.data" ,result.data?.objectResult?.accessTokens)
    await SetUserToken(result.data?.objectResult?.accessTokens ?? "");
  }
  return result;
};

export const ValidationSchema = Yup.object({
  email: Yup.string()
    .email("ایمیل نامعتبر است") // Validate email format
    .required("ایمیل الزامی است"),

});
