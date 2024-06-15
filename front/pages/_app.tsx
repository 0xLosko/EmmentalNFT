import '../styles/globals.css';
import '@rainbow-me/rainbowkit/styles.css';
import type { AppProps } from 'next/app';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { RainbowKitSiweNextAuthProvider } from '@rainbow-me/rainbowkit-siwe-next-auth';
import {
  arbitrum,
  base,
  mainnet,
  optimism,
  polygon,
  sepolia,
  zora,
} from 'wagmi/chains';
import { getDefaultConfig, RainbowKitProvider } from '@rainbow-me/rainbowkit';

const config = getDefaultConfig({
  appName: 'RainbowKit App',
  projectId: '12d66ee7fe7f31eef0181c18a51f4873',
  chains: [
    mainnet,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true' ? [sepolia] : []),
  ],
  ssr: true,
});

import {
  GetSiweMessageOptions,
} from '@rainbow-me/rainbowkit-siwe-next-auth';
import { SessionProvider } from 'next-auth/react';
import { Session } from 'next-auth';
import {ReactElement, ReactNode} from "react";
import {NextPage} from "next";
import Layout from "./layout";


const getSiweMessageOptions: GetSiweMessageOptions = () => ({
  statement: 'Sign in to Nodesify',
});

const client = new QueryClient();
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}
type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout,
  Session: Session
}

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => <Layout>{page}</Layout>);
    return (
        <WagmiProvider config={config}>
          <SessionProvider refetchInterval={0} session={pageProps.session}>
            <QueryClientProvider client={client}>
              <RainbowKitSiweNextAuthProvider  getSiweMessageOptions={getSiweMessageOptions}>
                <RainbowKitProvider modalSize="compact">
                  {getLayout(<Component {...pageProps} />)}
                </RainbowKitProvider>
              </RainbowKitSiweNextAuthProvider>
            </QueryClientProvider>
          </SessionProvider>
        </WagmiProvider>
    );
}
export default MyApp;
