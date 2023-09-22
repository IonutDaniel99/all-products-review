'use client'
import React from 'react'

export default function HomeLayout({ children }: { children: React.ReactElement }) {

    return (
        <main className='flex mt-16 relative w-full px-6 lg:px-2'>
            {children}
        </main>
    )
}
