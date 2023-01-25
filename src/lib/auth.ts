import { KARRIO_API } from "@/client/context";
import { TokenObtainPair } from "karrio/rest";
import { isNoneOrEmpty } from "@/lib/helper";
import { NextApiRequest } from "next";
import logger from '@/lib/logger';
import axios from "axios";


export async function authenticate(data: TokenObtainPair) {
  logger.debug("authenticating...");

  return axios({
    url: KARRIO_API + '/api/token',
    method: 'POST',
    data
  })
    .then(({ data }) => data);
}

export async function refreshToken(refresh: string) {
  if (isNoneOrEmpty(refresh)) {
    return Promise.reject("Missing refresh token!")
  }

  logger.debug("Send refresh token request...");

  return axios({
    url: KARRIO_API + '/api/token/refresh',
    method: 'POST',
    data: { refresh }
  })
    .then(({ data: { refresh, access } }) => {
      return { access, refresh };
    });
}

export async function getCurrentOrg(access: string, orgId?: string, isMultiOrg?: string) {
  logger.debug("retrieving session org...");

  return (
    axios.post(
      `${KARRIO_API || ''}/graphql`,
      { query: `{ organizations { id } }` },
      {
        headers: { 'authorization': `Bearer ${access}` },
      })
      .then(({ data: { data } }) => {
        return (
          (data?.organizations || []).find(({ id }: any) => id === orgId)
          || (data?.organizations || [{ id: null }])[0]
        );
      })
      .catch(({ data }) => {
        logger.error(data)
        return { id: null };
      })
  );
}


export function computeTestMode(req: NextApiRequest): boolean {
  const cookieTestMode = (req.cookies['testMode'] || "").toLowerCase();
  const urlTestMode = (
    req.url?.includes("/test")
    || req.headers.referer?.includes("/test")
  ) as boolean;

  if (cookieTestMode === 'true' && urlTestMode) return true;
  if (cookieTestMode === 'false' && !urlTestMode) return false;

  return urlTestMode;
}
