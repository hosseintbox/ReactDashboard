import { GetUserToken } from "./ApiToken";

export const DefaultApiHeader = new Headers();
DefaultApiHeader.append("Content-Type", "application/json");

export const AuthApiHeader = new Headers();
AuthApiHeader.append("Content-Type", "application/json");

const token = GetUserToken();    
AuthApiHeader.append("Authorization", `Bearer ${token}`);
