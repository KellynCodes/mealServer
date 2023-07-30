export class HttpResponse<T = null> {
  message: string;
  statusCode: number;
  data?: T;
}
