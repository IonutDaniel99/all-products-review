'use client'
import React, { useState } from 'react'

import { createClientComponentClient, createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Suspense, useEffect, useMemo } from "react";
import ProductsItemLoading from "@/_components/loading/ProductsItemLoading";
import { Separator } from "@/_components/ui/separator";
import ProductItemComponent from "@/_components/ProductItemComponent";

import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { ProductsSearchParams } from '@/_types/ProductsSearchParamsType';

// eslint-disable-next-line @next/next/no-async-client-component
function ProductsPage({ searchParams }: ProductsSearchParams) {
    const selectedDate = searchParams?.from || 0
    const starsNumber = searchParams?.stars_number || 10
    const starsDiff = searchParams?.stars_diff || "under"
    const commentsNumber = searchParams?.comments_number || 500
    const commentsDiff = searchParams?.comments_diff || "under"
    const productsOrder = searchParams?.order_by || "desc"
    const productPerPage = searchParams?.items_per_page || 10

    const supabaseClient = useSupabaseClient()

    const currentDate = new Date();
    const xTimesAgo = new Date(currentDate);

    const substractDateFromFilter: Record<number, () => number> = {
        1: () => xTimesAgo.setHours(currentDate.getHours() - 1),
        24: () => xTimesAgo.setDate(currentDate.getDate() - 1),
        168: () => xTimesAgo.setDate(currentDate.getDate() - 7),
        720: () => xTimesAgo.setDate(currentDate.getDate() - 30),
        0: () => xTimesAgo.setFullYear(currentDate.getHours() - 1), // Note: changed to setHours
    }

    substractDateFromFilter[selectedDate]();


    const [prodData, setProdData] = useState<Array<any>>()
    const [prodError, setProdError] = useState<string>()


    useMemo(async () => {
        const supabasePromise: any = await supabaseClient
            .from('products')
            .select()
            .filter('date_added', 'gte', xTimesAgo.toISOString())
            .filter('date_added', 'lt', currentDate.toISOString())
            .filter('average_grade', starsDiff === "under" ? "lte" : "gte", starsNumber)
            .order('date_added', { ascending: productsOrder === 'asc' ? true : false })
            .limit(productPerPage)

        setProdData(supabasePromise.data)
        setProdError(supabasePromise.error)
    }, [searchParams])

    return (
        <div>
            {prodData?.map((product: any, index: number) => {
                return <>
                    <Suspense fallback={<ProductsItemLoading />} key={index}>
                        <ProductItemComponent key={index} product={product} />
                        {index !== prodData?.length - 1 && <Separator orientation='horizontal' decorative className='my-2' />}
                    </Suspense>
                </>
            })}
        </div >
    )
}

export default ProductsPage