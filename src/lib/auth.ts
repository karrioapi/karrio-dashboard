import { PURPLSHIP_API } from "@/client/context";
import { TokenObtainPair } from "@purplship/rest";
import axios from "axios";
import { isNone } from "@/lib/helper";



export async function authenticate(data: TokenObtainPair) {
  return axios
    .post(PURPLSHIP_API + '/api/token', data)
    .then(({ data }) => data);
}

export async function refreshToken(refresh: string, org_id?: string) {
  return axios
    .post(PURPLSHIP_API + '/api/token/refresh', {
      refresh,
      ...(isNone(org_id) ? {} : { org_id })
    })
    .then(({ data: { refresh, access } }) => {
      return { access, refresh };
    });
}
