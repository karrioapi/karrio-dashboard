import { checkAPI } from "@/lib/middleware";
import { GetServerSideProps } from "next";


export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { res } = ctx;
  const metadata = await checkAPI();

  res.setHeader('Cache-Control', 'public, s-maxage=30, stale-while-revalidate=59')

  return { props: { ...metadata } };
};
