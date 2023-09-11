'use client'
import { SessionProvider, signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function Root() {
    const router = useRouter()
    const { status } = useSession()

    if (status === "authenticated") router.push("/home")

    return (
        <div>
            test2
            <button onClick={() => signIn()} className='px-2 py-1.5 text-sm font-semibold'>Sign in</button>
        </div>

    )
}