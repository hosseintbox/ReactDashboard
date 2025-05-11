import {
  useQuery,
  UseQueryResult,
  useMutation,
  UseMutationResult,
} from "react-query";
import Api from "../../../services/api/CallApi";
import { HttpMethod } from "../../../models/enums/HttpMethod"; // وارد کردن HttpMethod
import { ApiResponse } from "../../../models/viewModels/api/ApiResponse"; // وارد کردن ApiResponse

interface ApiDetails {
  url: string;
  method: HttpMethod;
  headers: any;
  body?: any;
}

export const useFetchData = <T,>(apiDetails: ApiDetails) => {
  const fetchData = async (): Promise<ApiResponse<T>> => {
    const response = await Api<T>(
      apiDetails.url,
      apiDetails.body || {},
      apiDetails.headers,
      apiDetails.method
    );
    return response;
  };

  const queryResult: UseQueryResult<ApiResponse<T>, Error> = useQuery(
    ["fetchData", apiDetails.url],
    fetchData,
    {
      enabled: apiDetails.method === HttpMethod.GET, 
    }
  );

  const mutationResult: UseMutationResult<
    ApiResponse<T>,
    Error,
    any
  > = useMutation(async (body: any) => {
    const response = await Api<T>(
      apiDetails.url,
      body,
      apiDetails.headers,
      HttpMethod.POST
    );
    return response;
  });

  
  return {

    queryData: queryResult.data,
    queryError: queryResult.error,
    isQueryLoading: queryResult.isLoading,

    // داده‌های مربوط به POST
    postData: mutationResult.mutateAsync, // استفاده از mutateAsync برای دسترسی آسان به داده‌های POST
    isMutating: mutationResult.isLoading,
    mutationError: mutationResult.error,
  };
};
