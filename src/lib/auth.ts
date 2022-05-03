import { KARRIO_API } from "@/client/context";
import { TokenObtainPair } from "karrio/rest";
import axios from "axios";
import { isNone } from "@/lib/helper";
import logger from '@/lib/logger';


export async function authenticate(data: TokenObtainPair) {
  logger.debug("authenticating...");
  return axios({
    url: KARRIO_API + '/api/token',
    method: 'POST',
    data
  })
    .then(({ data }) => data);
}

export async function refreshToken(refresh: string, org_id?: string) {
  logger.debug("refreshing token...");
  return axios({
    url: KARRIO_API + '/api/token/refresh',
    method: 'POST',
    data: {
      refresh,
      ...(isNone(org_id) ? {} : { org_id })
    }
  })
    .then(({ data: { refresh, access } }) => {
      return { access, refresh };
    });
}
