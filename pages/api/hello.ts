// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { requestRouter } from "../../helpers/requestRouter";

const postController = async (req: NextApiRequest, res: NextApiResponse) => {
  res.json({ name: "Hello" });
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const router: {
    [key: string]: (req: NextApiRequest, res: NextApiResponse) => Promise<any>;
  } = {
    POST: postController,
    GET: postController,
    PATCH: postController,
    DELETE: postController,
  };
  await requestRouter(req, res, router);
}
