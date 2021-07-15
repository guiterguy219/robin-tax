// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest, NextApiResponse} from 'next';
import axios, { Method } from 'axios';


export const REMOVE_HEADER_KEYS = ['cookie', 'host', 'referrer'];

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const token = req.cookies.robinhoodToken;
    const url = getQParam('url', req.query);
    const method: Method = req.method as Method;
    const data = req.body;
    let headers: { [key: string]: string | string[] | undefined } = {'Authorization': `Bearer ${token}`};
    // Forward headers, but remove local only headers (eg. host, referrer, cookie)
    if (req.headers) {
      headers = {...headers, ...req.headers};
      for (const key of REMOVE_HEADER_KEYS) {
        delete headers[key];
      }
    }
    const proxyRes = await axios.request({method, url, headers, data});
    res.status(proxyRes.status).send(proxyRes.data);
  } catch (e) {
    console.error(e);
    res.status(400).send({});
  }
}

/**
 * Gets string type value from query parameters
 * @param key Query paramater name/key
 * @param queryParams Object like query paramaters
 * @returns The value as a string, the first string if the value is a list
 */
const getQParam = (key: string, queryParams: { [key: string]: string | string[] }): string => {
  return Array.isArray(queryParams[key]) ? queryParams[key][0] : queryParams[key] as string;
}
