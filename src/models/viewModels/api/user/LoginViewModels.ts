export interface ILoginRequest {
  email?: string;
  password: string;
}

export interface ILoginResponse {
  isSuccess: boolean;
  message: string;
  token: string;
  result: boolean;
  errors: null | string;
  data: boolean;
}
