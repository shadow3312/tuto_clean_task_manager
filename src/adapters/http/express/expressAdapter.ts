import { IController, IHttpRequest } from "./IExpress";
import { Request, Response } from "express";

export default function expressAdapter(controller: IController) {
  return async (req: Request, res: Response) => {
    const httpRequest: IHttpRequest = {
      body: req.body,
      query: req.query,
      params: req.params,
      method: req.method,
      ip: req.ip,
      path: req.path,
      headers: {
        "Content-Type": req.headers["content-type"],
        Referer: req.headers["referer"],
        "User-Agent": req.headers["user-agent"],
      },
    };

    try {
      const httpResponse = await controller(httpRequest);
      if (httpResponse.headers) {
        res.set(httpResponse.headers);
      }

      res.type("json");
      res.status(httpResponse.statusCode).send(httpResponse.body);
    } catch (e) {
      res.status(500).json({ error: (e as Error).message });
    }
  };
}
