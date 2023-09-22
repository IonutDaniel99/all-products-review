export type ProductsSearchParams = {
    params?: {}
    searchParams?: {
        from: number,
        stars_number: number,
        stars_diff: "under" | "over",
        comments_diff: "under" | "over",
        comments_number: number,
        order_by: 'asc' | 'desc',
        items_per_page: number,
    }
}
