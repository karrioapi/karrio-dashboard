import { restClient } from "@/client/context";
import { API_INSTANCE_ERROR } from "@/lib/middleware";
import { GetStaticProps } from "next"


export const getStaticProps: GetStaticProps = async (context) => {
  const props = await restClient.value.API.data()
    .then(references => ({ references }))
    .catch(() => API_INSTANCE_ERROR)
  
  return { props, revalidate: 30 }
}
