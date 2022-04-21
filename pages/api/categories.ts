// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getAllCategories } from "../../lib/api";

type Data = {
  name: string;
  post_cnt: number;
}[];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const categories = getAllCategories();

  res.status(200).json(
    Object.keys(categories).map((category) => {
      return {
        name: category,
        post_cnt: categories[category].length,
      };
    })
  );
}
