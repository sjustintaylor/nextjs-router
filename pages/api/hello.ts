// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { requestRouter } from "../../helpers/requestRouter";

const postController = async (req: NextApiRequest, res: NextApiResponse) => {
  res.json({ name: "POST: Hello" });
};
const getController = async (req: NextApiRequest, res: NextApiResponse) => {
  res.json({ name: "GET: Hello" });
};
const patchController = async (req: NextApiRequest, res: NextApiResponse) => {
  res.json({ name: "PATCH: Hello" });
};
const deleteController = async (req: NextApiRequest, res: NextApiResponse) => {
  res.json({ name: "DELETE: Hello" });
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const router: {
    [key: string]: (req: NextApiRequest, res: NextApiResponse) => Promise<any>;
  } = {
    POST: postController,
    GET: getController,
    PATCH: patchController,
    DELETE: deleteController,
  };
  await requestRouter(req, res, router);
}
