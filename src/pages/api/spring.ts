import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'
import {scrapePage} from './utils';
import NextCors from 'nextjs-cors';
type Data = {
  name: string
}
let color: any = [];
let url = ''
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await NextCors(req, res, {
    // Options
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    origin: '*',
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
 });
  if(color.length === 0) {
    color = await scrapePage(`https://colorhunt.co/palettes/spring`);
  }
  res.status(200).json(color as any);
}
