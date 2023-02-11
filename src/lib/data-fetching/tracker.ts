import { loadAPIMetadata } from "@/lib/data-fetching";
import { GetServerSideProps } from "next";
import { rest$ } from "@/lib/client";


export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { res, params } = ctx;
  const id = params?.id as string;
  const metadata = await loadAPIMetadata(ctx).catch(_ => _);

  try {
    // Retrieve tracker by id
    const data = await rest$.value?.trackers.retrieves({ idOrTrackingNumber: id })
      .then(({ data }) => ({ tracker: JSON.parse(JSON.stringify(data)) }))
      .catch(_ => ({ message: `No Tracker ID nor Tracking Number found for ${id}` }));

    res.setHeader('Cache-Control', 'public, s-maxage=10, stale-while-revalidate=59')

    return { props: { id, ...metadata, ...data } };
  } catch (e) {
    return { props: { id, ...metadata, ...(e as {}) } };
  }
};
