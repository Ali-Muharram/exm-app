declare type ErrorResponse = {
  message: string;
  code: number;
};

declare type SucsessRespone<T> = {
  message: string;
} & T;

declare type ApiResponse<T> = ErrorResponse | SucsessRespone<T>;
