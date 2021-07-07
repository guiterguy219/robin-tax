// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest, NextApiResponse} from 'next';
import axios from 'axios';
import { urls } from '../../src/common/urls';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const body = {
    response: req.body?.response,
  }
  try {
    const token = req.cookies.robinhoodToken 
    const ordersRes = await axios.get(urls.ROBINHOOD_ORDERS, {headers: {'Authorization': `Bearer ${token}`}});
    res.status(ordersRes.status).send(ordersRes.data);
  } catch (e) {
    console.error(e);
    res.status(400).send({});
  }
}
