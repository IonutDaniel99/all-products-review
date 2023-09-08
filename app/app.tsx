import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';
import React from 'react';
export default function App({
    Component,
    pageProps: { session, ...pageProps },
}: AppProps) {
    return (
        <SessionProvider session={pageProps.session}>
            <Component {...pageProps} />
        </SessionProvider>
    );
}