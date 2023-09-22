'use client'

import { useRouter } from "next/navigation";


const errors_handle_message: Record<string, string> = {
    "date_error": "Invalid date format. Please provide a valid date.",
    "stars_error": "Invalid stars value. Stars must be a number between 1 and 10.",
    "stars_diff_error": "Stars difference value should be over or under. Please provide valid value.",
    "comments_number_error": "Invalid number of comments. Please provide a valid number.",
    "comments_diff_error": "Comments difference value should be over or under. Please provide valid value.",
    "products_orderBy_error": "Comments difference value should be asc or desc. Please specify a valid sorting order.",
    "products_perPage_error": "Invalid items per page. Please provide a valid value"
};


export default function Error({
    error,
    reset,
}: {
    error: Error
    reset: () => void
}) {
    const router = useRouter()
    const handlePathRefresh = () => {
        router.replace('/products')
    }

    return (
        <div>
            <h2>Something went wrong! {errors_handle_message[error.message]}</h2>
            <button onClick={() => handlePathRefresh()}>Back to products.</button>
        </div>
    )
}