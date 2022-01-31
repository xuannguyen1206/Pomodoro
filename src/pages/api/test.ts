import { NextApiRequest, NextApiResponse } from "next";
type Data = {
  name: string
}
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
)  {
  const date = new Date();
  const format = date.toUTCString();

  res.setHeader("Cache-Control", "s-maxage=10, stale-while-revalidate");

  res.json({ now: format });
}