// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest, NextApiResponse} from 'next';
import axios from 'axios';
import { urls } from '../../src/common/urls';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const body = {
    response: req.body?.response,
  }
  try {
    const loginRes = await axios.post(urls.ROBINHOOD_CHALLENGE_RESPONSE(req.body?.challengeId), body);
    res.status(loginRes.status).send(loginRes.data);
  } catch (e) {
    console.error(e);
    res.status(400).send({});
  }
}
