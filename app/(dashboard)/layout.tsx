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
        <>
            <Suspense fallback={<Loading />}>
                <NavigationBar />
                <div className='flex mt-4 md:gap-4 md:justify-evenly relative top-10'>
                    <aside className='hidden md:block  w-3/12'>
                        <UserComponent />
                    </aside>
                    <main className='w-full md:w-8/12 border-2 border-blue-200'>
                        {children}
                    </main>
                </div>
            </Suspense>

        </>
    )
}
