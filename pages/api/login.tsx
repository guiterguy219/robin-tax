// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest, NextApiResponse} from 'next';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const body = {
    client_id: `c82SH0WZOsabOXGP2sxqcj34FxkvfnWRZBKlBjFS`,
    device_token: uuidv4(),
    expires_in: 300,
    grant_type: 'password',
    scope: 'internal',
    ...req.body,
  }
  try {
    const loginRes = await axios.post('https://api.robinhood.com/oauth2/token/', body);
    res.status(loginRes.status).send(loginRes.data);
  } catch (e) {
    console.error(e);
    res.status(403).send({});
  }
}
