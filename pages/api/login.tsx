// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest, NextApiResponse} from 'next';
import axios, { AxiosRequestConfig } from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { ROBINHOOD_CHALLENGE_ID_HEADER, ROBINHOOD_CLIENT_ID, ROBINHOOD_SESSION_DURATION_MINUTES } from '../../src/common/constants';
import { urls } from '../../src/common/urls';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const DEVICE_TOKEN = req.body?.device_token || uuidv4();
  const body = {
    ...req.body,
    client_id: ROBINHOOD_CLIENT_ID,
    device_token: DEVICE_TOKEN,
    expires_in: ROBINHOOD_SESSION_DURATION_MINUTES * 60, // must be in seconds
    grant_type: 'password',
    scope: 'internal',
  }
  try {
    let headers = {};
    if (req.headers?.[ROBINHOOD_CHALLENGE_ID_HEADER]) {
      headers = {
        ...headers,
        [ROBINHOOD_CHALLENGE_ID_HEADER]: req.headers[ROBINHOOD_CHALLENGE_ID_HEADER]
      }
    }
    const config: AxiosRequestConfig = { headers };
    const loginRes = await axios.post(urls.ROBINHOOD_LOGIN, body, config);
    res.status(loginRes.status).send({...loginRes.data, device_token: DEVICE_TOKEN});
  } catch (e) {
    const challengeTypes = e.response?.data?.accept_challenge_types;
    const challenge = e.response?.data?.challenge;
    if (challengeTypes || challenge) {
      res.status(200).send({...e.response?.data, device_token: DEVICE_TOKEN});
    } else {
      console.error(e);
      res.status(400).send({device_token: DEVICE_TOKEN});  
    }
  }
}
