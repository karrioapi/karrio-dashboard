import type { NextApiRequest, NextApiResponse } from 'next';
import { orgToken } from '@/pages/api/auth/[...nextauth]';
import { refreshToken } from '@/client/context';
import { getToken } from 'next-auth/jwt';
import { getSession } from 'next-auth/client';

const secret = process.env.JWT_SECRET;


export default async function OrgAPI(req: NextApiRequest, res: NextApiResponse) {
  try {
    const orgId = req.query.org_id as string;
    const current = await getToken({ req, secret, encryption: true });
    
    const token = await refreshToken(current?.refreshToken as string, orgId);
    orgToken.next(token);
  
    await getSession({ req });
  
    res.status(200).json({ orgId });
  } catch(err) {
    res.status(500).json({ error: JSON.stringify(err) });
  }
}
