import { KARRIO_API } from "@/client/context";
import { TokenObtainPair } from "karrio/rest";
import axios from "axios";
import { isNone } from "@/lib/helper";



export async function authenticate(data: TokenObtainPair) {
  return axios({
    url: KARRIO_API + '/api/token',
    method: 'POST',
    headers: { 'Cache-Control': 'no-store' },
    data
  })
    .then(({ data }) => data);
}

export async function refreshToken(refresh: string, org_id?: string) {
  return axios({
    url: KARRIO_API + '/api/token/refresh',
    method: 'POST',
    headers: { 'Cache-Control': 'no-store' },
    data: {
      refresh,
      ...(isNone(org_id) ? {} : { org_id })
    }
  })
    .then(({ data: { refresh, access } }) => {
      return { access, refresh };
    });
}
