import { create } from 'zustand'
import { devtools } from "zustand/middleware";

export type ProductFilterStoreType = {
    selectedDate: number,
    lowestStar: number,
    highestStar: number,
    commentsDiff: string,
    commentsNumber: number,
    productsOrder: string,
    productPerPage: number,
    setSelectedDate: (by: number) => void
    setLowerStar: (by: number) => void
    setHighestStar: (by: number) => void
    setCommentsDiff: (by: "over" | "under") => void
    setCommentsNumber: (by: number) => void
    setProductOrder: (by: "asc" | "desc") => void
    setProductPerPage: (by: number) => void
}

export const useProductsFilterStore = create<ProductFilterStoreType>()(
    devtools((set, get) => ({
        selectedDate: 0,
        lowestStar: 1,
        highestStar: 10,
        commentsDiff: "over",
        commentsNumber: 10,
        productsOrder: "asc",
        productPerPage: 2,
        setSelectedDate: (value: number) => set({ selectedDate: value }),
        setLowerStar: (value: number) => set({ lowestStar: value }),
        setHighestStar: (value: number) => set({ highestStar: value }),
        setCommentsDiff: (value: string) => set({ commentsDiff: value }),
        setCommentsNumber: (value: number) => set({ commentsNumber: value }),
        setProductOrder: (value: string) => set({ productsOrder: value }),
        setProductPerPage: (value: number) => set({ productPerPage: value }),
    }))
)

export const useSelectedDate = () => useProductsFilterStore((state) => state.selectedDate);
export const useLowestStar = () => useProductsFilterStore((state) => state.lowestStar);
export const useHighestStar = () => useProductsFilterStore((state) => state.highestStar);
export const useCommentsDiff = () => useProductsFilterStore((state) => state.commentsDiff);
export const useCommentsNumber = () => useProductsFilterStore((state) => state.commentsNumber);
export const useProductsOrder = () => useProductsFilterStore((state) => state.productsOrder);
export const useProductPerPage = () => useProductsFilterStore((state) => state.productPerPage);
