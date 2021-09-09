import type { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';

const secret = process.env.JWT_SECRET;

export default async function OrgAPI(req: NextApiRequest, res: NextApiResponse) {
  const token = await getToken({ req, secret, encryption: true });
  const org_id = req.query.org_id;



  res.status(200).redirect('/');
}
