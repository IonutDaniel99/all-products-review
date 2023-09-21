import React, { useState } from 'react'

import { createClientComponentClient, createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Suspense, useEffect, useMemo } from "react";
import ProductsItemLoading from "@/_components/loading/ProductsItemLoading";
import { Separator } from "@/_components/ui/separator";
import ProductItemComponent from "@/_components/ProductItemComponent";
import { useCommentsDiff, useCommentsNumber, useHighestStar, useLowestStar, useProductPerPage, useProductsFilterStore, useProductsOrder, useSelectedDate } from "./productState";

import { cookies } from 'next/headers';

// eslint-disable-next-line @next/next/no-async-client-component
async function ProductsPage() {

    const supabase = createServerComponentClient({
        cookies: cookies
    })

    const { data: products, error } = await supabase
        .from('products')
        .select()
        .limit(5)
    // .filter('average_grade', 'gte', lowestStar)
    // .filter('average_grade', 'lte', highestStar)
    // .order('date_added', { ascending: productsOrder === 'asc' ? true : false })
    // .limit(productPerPage)

    // const filters = {
    //     selectedDate: useSelectedDate(),
    //     lowestStar: useLowestStar(),
    //     highestStar: useHighestStar(),
    //     commentsDiff: useCommentsDiff(),
    //     commentsNumber: useCommentsNumber(),
    //     productsOrder: useProductsOrder(),
    //     productPerPage: useProductPerPage(),
    // }

    return (
        <div>

            {products?.map((product: any, index: number) => {
                return <>
                    <Suspense fallback={<ProductsItemLoading />}>
                        <ProductItemComponent key={index} product={product} />
                        {index !== products?.length - 1 && <Separator orientation='horizontal' decorative className='my-2' />}
                    </Suspense>
                </>
            })}
        </div >
    )
}

export default ProductsPage