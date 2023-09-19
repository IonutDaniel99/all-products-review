'use client'
import { SessionProvider, signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Loading from './loading'
import { Avatar, AvatarFallback, AvatarImage } from './components/ui/avatar'


export default function Root() {
    const router = useRouter()

    return (
        <div>
            test2
        </div>

    )
}


