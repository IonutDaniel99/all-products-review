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
                <div className='flex mt-28 bg-background md:justify-evenly relative'>
                    <aside className='hidden md:block w-3/12 '>
                        <UserComponent />
                    </aside>
                    <main className='w-full md:w-9/12 relative'>
                        {children}
                    </main>
                </div>
            </div>
        </Suspense>

    )
}
