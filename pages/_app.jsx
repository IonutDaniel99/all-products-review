import { SessionProvider, useSession } from 'next-auth/react'
import "../app/globals.css"
import Layout from './Layout'
import { Component, useEffect } from 'react'
import WelcomePage from './welcome'
import { useRouter } from 'next/router'

export default function App({
    Component,
    pageProps: { session, ...pageProps },
}) {

    return <SessionProvider session={session}>
        <AuthCheck ><Component /></AuthCheck>
    </SessionProvider>
}

function AuthCheck({ children }) {
    const { status } = useSession()
    if (status === "unauthenticated") {
        return <WelcomePage />
    }
    if (status === "authenticated") {
        return <Layout>{children}</Layout>
    }
}