import { loaduseAPIMetadata } from "@/lib/data-fetching";
import { GetServerSideProps } from "next";


export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { res } = ctx;
  const metadata = await loaduseAPIMetadata(ctx).catch(_ => _);

  res.setHeader('Cache-Control', 'public, s-maxage=30, stale-while-revalidate=59')

  return { props: { ...metadata } };
};
