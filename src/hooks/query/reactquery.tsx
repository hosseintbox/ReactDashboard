import {
  useQuery,
  UseQueryResult,
  useMutation,
  UseMutationResult,
} from "@tanstack/react-query";
import Api from "../../services/api/CallApi";
import { HttpMethod } from "../../models/enums/HttpMethod";
import { ApiResponse } from "../../models/viewModels/api/ApiResponse";

interface ApiDetails<TBody = any> {
  url: string;
  method: HttpMethod;
  headers?: Record<string, string>;
  body?: TBody;
}

export const useFetchData = <TResponse, TBody extends Record<string, any> = {}>(
  apiDetails: ApiDetails<TBody>
) => {
  const fetchData = async (): Promise<ApiResponse<TResponse>> => {
    return await Api<TResponse>(
      apiDetails.url,
      apiDetails.body || {},
      apiDetails.headers || {},
      apiDetails.method
    );
  };

  const queryResult = useQuery<ApiResponse<TResponse>, Error>({
    queryKey: ["fetchData", apiDetails.url],
    queryFn: fetchData,
    enabled: apiDetails.method === HttpMethod.GET,
  });

  const mutationResult = useMutation<
    ApiResponse<TResponse>,
    Error,
    TBody
  >({
    mutationFn: async (body: TBody) => {
      return await Api<TResponse>(
        apiDetails.url,
        body,
        apiDetails.headers || {},
        HttpMethod.POST
      );
    },
  });

  return {
    queryData: queryResult.data,
    queryError: queryResult.error,
    isQueryLoading: queryResult.isLoading,

    postData: mutationResult.mutateAsync,
    isMutating: mutationResult.isPending,
    mutationError: mutationResult.error,
  };
};

