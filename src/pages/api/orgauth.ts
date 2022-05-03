import type { NextApiRequest, NextApiResponse } from 'next';
import getConfig from 'next/config';
import { OrgToken } from '@/client/context';
import { getToken } from 'next-auth/jwt';
import { getSession } from "next-auth/react";
import { refreshToken } from '@/lib/auth';
import { withSentry } from '@sentry/nextjs';

const { serverRuntimeConfig } = getConfig();
const secret = serverRuntimeConfig?.JWT_SECRET;


async function OrgAPI(req: NextApiRequest, res: NextApiResponse) {
  try {
    const orgId = req.query.org_id as string;
    const current = await getToken({ req, secret });

    const token = await refreshToken(current?.refreshToken as string, orgId);
    OrgToken.next({ ...OrgToken.value, [current?.refreshToken as string]: token });

    await getSession({ req });

    res.status(200).json({ orgId });
  } catch (err) {
    res.status(500).json({ error: JSON.stringify(err) });
  }
}

export default withSentry(OrgAPI);
