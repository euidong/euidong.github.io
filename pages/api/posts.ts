// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getAllPosts } from "../../lib/api";

type Data = { name: string; slug: string }[];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const posts = getAllPosts();
  res.status(200).json(posts.map((e) => ({ name: e.title, slug: e.slug })));
}
