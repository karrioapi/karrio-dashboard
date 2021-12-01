import { connectAPI } from "@/lib/middleware";
import { GetServerSideProps } from "next";


export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const metadata = await connectAPI().catch(_ => _);

  res.setHeader('Cache-Control', 'public, s-maxage=30, stale-while-revalidate=59')

  return { props: { ...metadata } };
};
