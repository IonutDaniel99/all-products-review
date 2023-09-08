import { signIn } from 'next-auth/react'
import { useRouter } from 'next/router'
import React from 'react'

function WelcomePage() {
    return (
        <div>
            test


            <button onClick={() => signIn()} className='px-2 py-1.5 text-sm font-semibold'>Sign in</button>
        </div>

    )
}

export default WelcomePage