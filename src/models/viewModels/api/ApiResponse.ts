// export interface ResultModel<T> {
//     isSuccess: boolean;
//     message: string;
//     token: string;
//     result: boolean;
//     errors: null | string;
//     data: T | null;  // Added data field to store the actual response body
// }

export interface ApiResponse<T> {
  data: T| null;
  status: number;
  error?: string;
}