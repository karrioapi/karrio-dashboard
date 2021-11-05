import '@fortawesome/fontawesome-free/css/all.min.css';
import 'highlight.js/styles/stackoverflow-light.css';
import '@/styles/theme.scss';
import '@/styles/dashboard.scss';
import type { AppProps } from 'next/app';
import { Provider } from 'next-auth/client';
import Head from 'next/head';
import MainLayout from '@/layouts/main-layout';
import { ClientsProvider } from '@/client/context';


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider session={pageProps.session}>
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
