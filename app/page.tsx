'use client'
import { SessionProvider, signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Loading from './loading'
import { Avatar, AvatarFallback, AvatarImage } from './components/ui/avatar'

export default function Root() {
    const router = useRouter()
    const { status } = useSession()
    if (status === "loading") return <Loading />

    if (status === "authenticated") router.push("/home")

    return (
        <div>
            test2
            <button onClick={() => signIn()} className='px-2 py-1.5 text-sm font-semibold'>Sign in</button>
            <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
        </div>

    )
}