import supabase from '@/api/_supabase/supabase'
import React from 'react'

async function page() {

    // const { data: posts } = await supabase.from('Product').select()
    // const d = await supabase.auth.getSession()
    // console.log(d)
    // console.log(posts)

    return (
        <div>
            <p>Primu copil</p>
            <pre>{JSON.stringify(posts, null, 2)}</pre>
        </div>
    )
}

export default page

