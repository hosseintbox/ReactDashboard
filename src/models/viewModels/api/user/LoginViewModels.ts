export interface ILoginRequest {
  userName?: string;
  password: string;
  validationMethod:number;
  phonePrefix?:number | string;
  securityCode: number;

}

export interface ILoginResponse {
  isSuccess: boolean;
  message: string;
  token: string;
  result: boolean;
  errors: null | string;
  data: boolean;
}
