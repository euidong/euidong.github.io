// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getAllTags } from "../../lib/api";

type Data = {
  name: string;
  post_cnt: number;
}[];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const tags = getAllTags();

  res.status(200).json(
    Object.keys(tags).map((tag) => {
      return {
        name: tag,
        post_cnt: tags[tag].length,
      };
    })
  );
}
