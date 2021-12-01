import '@fortawesome/fontawesome-free/css/all.min.css';
import 'highlight.js/styles/stackoverflow-light.css';
import '@/styles/theme.scss';
import '@/styles/dashboard.scss';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Provider } from "next-auth/client";
import MainLayout from '@/layouts/main-layout';
import { ClientsProvider } from '@/client/context';
import { p } from '@/lib/helper';


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider session={pageProps.session} options={{ basePath: p`/api/auth` }}>
      <ClientsProvider>
        <Head>
          <meta name="viewport" content="viewport-fit=cover" />
        </Head>
        <MainLayout error={pageProps?.error}>
          <Component {...pageProps} />
        </MainLayout>
      </ClientsProvider>
    </Provider>
  );
}

export default MyApp;
