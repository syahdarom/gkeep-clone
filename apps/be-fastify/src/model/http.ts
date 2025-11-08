abstract class HttpBaseResponse {
  constructor(
    public success: boolean,
    public code: number,
  ) {}
}

export class SuccessHttpResponseWithData<T> extends HttpBaseResponse {
  constructor(
    code: number,
    public data: T,
  ) {
    super(true, code);
  }
}

export class ErrorHttpResponse<T> extends HttpBaseResponse {
  constructor(
    code: number,
    public error: T,
  ) {
    super(false, code);
  }
}
