import { HttpMethod } from "../../models/enums/HttpMethod";
import { HttpStatus } from "../../models/enums/HttpStatus";
import { ApiResponse } from "../../models/viewModels/api/ApiResponse";

const Api = async <T>(
  BaseUrl: string,
  Body: T | {},
  Header: HeadersInit,
  Method: HttpMethod
): Promise<ApiResponse<T>> => {
  const requestOptions: RequestInit = {
    method: Method,
    headers: Header,
    ...(Method !== HttpMethod.GET && { body: JSON.stringify(Body) }),
  };

  try {
    const response = await fetch(BaseUrl, requestOptions);
    if (!response.ok) {
      if (
        response.status === HttpStatus.FORBIDDEN
        // response.status === HttpStatus.UNAUTHORIZED
      ) {
        // window.location.replace("/login");
      }
    }
    const data = (await response.json()) as T;
    return {
      data,
      status: response.status,
    };
  } catch (err) {
    return {
      data: null,
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      error: "Network error or request failed",
    };
  }
};

export default Api;
