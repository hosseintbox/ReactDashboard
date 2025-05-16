import { useQuery, useMutation } from "@tanstack/react-query";
import Api from "../../services/api/CallApi";
import { GetUserToken } from "../../services/api/ApiToken";

// تولید header در لحظه
const getAuthHeaders = () => {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  const token = GetUserToken();
  if (token) {
    headers.append("Authorization", `Bearer ${token}`);
  }

  return headers;
};

export const useReactQuery = (apiDetails: any) => {
  const queryKey = [apiDetails.url, apiDetails.body || {}]; 

  const queryFn = () =>
    Api<any>(
      apiDetails.url,
      apiDetails.body || {},
      getAuthHeaders(),
      apiDetails.method
    );

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey,
    queryFn,
    staleTime: 60 * 1000,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  return { data, isLoading, isError, error, refetch };
};

// میوتیشن جنرال
export const useReactMutation = (
  apiDetails: any,
  onSuccess?: (response: any) => void,
  onError?: (error: any) => void
) => {
  return useMutation({
    mutationFn: (data: any) =>
      Api(apiDetails.url, data, getAuthHeaders(), apiDetails.method),
    onSuccess,
    onError,
  });
};
