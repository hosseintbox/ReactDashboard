export interface ILoginRequest {
  userName?: string;
  password: string;
  validationMethod:number;
  phonePrefix?:number | string;
  securityCode: number;

}

export interface ILoginResponse {
  validationResult: any | null;
  requestStatus: {
    name: string;
    value: number;
  };
  message: string;
  objectResult: {
    userFullName: string;
    samAccountName: string | null;
    accessTokens: string;
    tokenId: string;
    refreshToken: string;
  };
  notificationType: {
    name: string;
    value: number;
  };
}
