import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
const options = {
    db: {
        schema: 'public',
    },
    auth: {
        autoRefreshToken: false,
        persistSession: false,
        detectSessionInUrl: false,
    },
    global: {
        headers: { 'x-my-custom-header': 'my-app-name' },
    },
}


export default async function useSupabase() {
    return createServerComponentClient({ cookies }, {
        supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
        supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ROLE_KEY,
        options: options,
    });
}