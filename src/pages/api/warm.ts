import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'
import {scrapePage} from './utils';

type Data = {
  name: string
}
let color: any = [];
let url = ''
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if(color.length === 0) {
    color = await scrapePage(`https://colorhunt.co/palettes/warm`);
  }
  res.status(200).json( color as any);
}
