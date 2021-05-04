// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest, NextApiResponse} from 'next';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { ROBINHOOD_CLIENT_ID, ROBINHOOD_SESSION_DURATION_MINUTES } from '../../src/common/constants';
import { urls } from '../../src/common/urls';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const body = {
    client_id: ROBINHOOD_CLIENT_ID,
    device_token: uuidv4(),
    expires_in: ROBINHOOD_SESSION_DURATION_MINUTES * 60, // must be in seconds
    grant_type: 'password',
    scope: 'internal',
    ...req.body,
  }
  try {
    const loginRes = await axios.post(urls.ROBINHOOD_LOGIN, body);
    res.status(loginRes.status).send(loginRes.data);
  } catch (e) {
    console.error(e);
    res.status(400).send({});
  }
}
