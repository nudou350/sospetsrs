export interface ApiResponse<T> {
  status: string;
  data: T;
  message?: string;
}
