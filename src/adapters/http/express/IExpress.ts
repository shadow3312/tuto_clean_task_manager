import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";

interface IHttpRequest {
  body: unknown;
  query: ParsedQs;
  params: ParamsDictionary;
  method: string;
  ip?: string;
  path: string;
  headers: {
    "Content-Type"?: string;
    Referer?: string;
    "User-Agent"?: string;
  };
}

export interface IHttpResponse<T = unknown> {
  statusCode: number;
  headers?: Record<string, string>;
  body: T;
}

interface IHttpError {
  statusCode: number;
  body: {
    error: string;
  };
}

type IController<T = unknown> = (
  httpRequest: IHttpRequest
) => Promise<IHttpResponse<T>>;

interface IControllerRequest<T = unknown> extends IHttpRequest {}
interface IControllerResponse<T = unknown> extends IHttpResponse<T> {}

export {
  IHttpRequest,
  IController,
  IHttpError,
  IControllerRequest,
  IControllerResponse,
};
