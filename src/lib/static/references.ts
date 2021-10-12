import { restClient } from "@/client/context";
import { API_INSTANCE_ERROR } from "@/lib/middleware";
import { GetServerSideProps } from "next"


export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const props = await restClient.value.API.data()
    .then(references => ({ references }))
    .catch(() => API_INSTANCE_ERROR);

  res.setHeader('Cache-Control', 'public, s-maxage=30, stale-while-revalidate=59')

  return { props };
}
