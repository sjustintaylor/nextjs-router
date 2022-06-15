import { NextApiRequest, NextApiResponse } from "next";
import createError, { HttpError } from "http-errors";
import isDevelopmentEnvironment from "./isDevelopmentEnvironment";
interface ErrorResponseBody {
  status: number;
  message: string;
  stack?: string;
}
export const requestRouter = async (
  req: NextApiRequest,
  res: NextApiResponse,
  router: {
    [key: string]: (req: NextApiRequest, res: NextApiResponse) => Promise<any>;
  }
) => {
  try {
    if (!req.method) {
      throw createError(400);
    }
    if (Object.keys(router).some((el) => el === req.method)) {
      await router[req.method](req, res);
    } else {
      throw createError(405);
    }
  } catch (e) {
    const error: HttpError = e as HttpError;

    res.status(error.status || 500);

    const body: ErrorResponseBody = {
      status: error.status,
      message: error.message,
    };

    if (isDevelopmentEnvironment()) {
      body.stack = error.stack;
    }
    res.json(body);
  }
};
