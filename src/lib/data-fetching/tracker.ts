import { loaduseAPIMetadata } from "@/lib/data-fetching";
import { KarrioClient } from "@karrio/rest";
import { KARRIO_API } from "@/lib/client";
import { GetServerSideProps } from "next";


export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { res, params } = ctx;
  const id = params?.id as string;
  const metadata = await loaduseAPIMetadata(ctx).catch(_ => _);
  const client = new KarrioClient({ basePath: `${metadata.metadata?.HOST || KARRIO_API}` });

  try {
    // Retrieve tracker by id
    const data = await client.trackers.retrieves({ idOrTrackingNumber: id })
      .then(({ data }) => ({ tracker: JSON.parse(JSON.stringify(data)) }))
      .catch(_ => ({ message: `No Tracker ID nor Tracking Number found for ${id}` }));

    res.setHeader('Cache-Control', 'public, s-maxage=10, stale-while-revalidate=59')

    return { props: { id, ...metadata, ...data } };
  } catch (e) {
    return { props: { id, ...metadata, ...(e as {}) } };
  }
};
