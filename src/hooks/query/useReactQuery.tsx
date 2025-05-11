import { useQuery, useMutation } from "@tanstack/react-query";
import Api from "../../services/api/CallApi";
import { GetUserToken } from "../../services/api/ApiToken";

// Header برای درخواست‌ها
export const AuthApiHeader = new Headers();
AuthApiHeader.append("Content-Type", "application/json");

const token = GetUserToken();
if (token) {
  AuthApiHeader.append("Authorization", `Bearer ${token}`);
}

// کوئری جنرال
export const useReactQuery = (apiDetails: any) => {
  const queryKey = [apiDetails.url, apiDetails.body || {}]; // برای کش بهتر

  const queryFn = () =>
    Api<any>(
      apiDetails.url,
      apiDetails.body || {},
      AuthApiHeader,
      apiDetails.method
    );

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey,
    queryFn,
    staleTime: 60 * 1000,
    // cacheTime: 60 * 1000,
    refetchOnMount: false,
  });

  return { data, isLoading, isError, error, refetch };
};

// میوتیشن جنرال
export const useReactMutation = (
  apiDetails: any,
  onSuccess?: Function,
  onError?: Function
) => {
  return useMutation({
    mutationFn: (data: any) =>
      Api(apiDetails.url, data, AuthApiHeader, apiDetails.method),
    onSuccess: (response: any) => {
      if (onSuccess) onSuccess(response);
    },
    onError: (error: any) => {
      if (onError) onError(error);
    },
  });
};
