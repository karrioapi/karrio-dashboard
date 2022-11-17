import { rest$ } from "@/client/context";
import { checkAPI } from "@/lib/middleware";
import { GetServerSideProps } from "next"


export const getServerSideProps: GetServerSideProps = async ({ res, params }) => {
  const id = params?.id as string;

  try {
    const metadata = await checkAPI();

    // Retrieve tracker by id
    const data = await rest$.value?.trackers.retrieves({ idOrTrackingNumber: id })
      .then(tracker => ({ tracker: JSON.parse(JSON.stringify(tracker)) }))
      .catch(() => ({ message: `No Tracker ID nor Tracking Number found for ${id}` }));

    res.setHeader('Cache-Control', 'public, s-maxage=10, stale-while-revalidate=59')

    return { props: { id, ...metadata, ...data } };
  } catch (e) {
    return { props: { id, ...(e as {}) } };
  }
};
