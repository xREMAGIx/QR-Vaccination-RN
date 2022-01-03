type ErrorResponse = {
  status: number;
  error: string;
};

type ResponseData<T> = {
  status: number;
  data: T;
};
