'use client'
import NavigationBar from '@/components/NavigationBar'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { Suspense } from 'react'
import Loading from './loading'
import UserComponent from '@/components/UserComponent'

export default function HomeLayout({ children }: { children: React.ReactElement }) {
    const router = useRouter()
    const { status } = useSession()

    if (status === "unauthenticated") router.push("/")

    return (
        <Suspense fallback={<Loading />}>
            <div className='h-full max-w-7xl flex flex-col gap-20'>
                <NavigationBar />
                <main className='flex mt-28 relative w-full px-6 lg:px-2'>
                    {children}
                </main>
                {/* <footer className='border-2 border-blue-600 h-96 static bottom-0 w-full'>
                    <div>2</div>
                    <div>2</div>
                    <div>2</div>
                    <div>2</div>
                    <div>2</div>
                    <div>2</div>
                    <div>2</div>
                    <div>2</div>
                    <div>2</div>
                    <div>2</div>
                    <div>2</div>
                    <div>2</div>
                </footer> */}
            </div>
        </Suspense>

    )
}
