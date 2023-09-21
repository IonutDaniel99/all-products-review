/* eslint-disable @next/next/no-async-client-component */
'use client'
import { Star, StarHalf } from 'lucide-react'
import Image from 'next/image'
import React, { useMemo, useState } from 'react'
import { type ProductType } from "../_types/ProdcutType";
import Link from 'next/link';

async function ProductItemComponent({ product }: any) {
    const { product_id, image_url, title, description, number_of_votes, average_grade } = product

    const generateStars = useMemo(() => {
        const stars: Array<any> = []
        for (var index = 0; index < average_grade; index++) {
            if (index < Math.floor(average_grade)) {
                stars.push(<Star key={index} strokeWidth={0} size={16} className='fill-primary' />)
            }
        }
        for (var index = stars.length; index < 10; index++) {
            stars.push(<Star key={index} strokeWidth={0} size={16} fill='#ccc' />)
        }
        return stars
    }, [average_grade, product])


    return <Link href={`/product/${product_id}`}>
        <div className='flex p-4 h-48 gap-6 items-center m-2 hover:bg-secondary rounded-md ease-in-out transition-all duration-500 group font-normal'>
            <Image
                src={"https://picsum.photos/id/19/2500/1667"}
                alt={'placeholder logo'}
                width="256"
                height="160"
                className='max-w-[10rem] sm:max-w-[16rem] h-40 sm:group-hover:scale-105 ease-in-out transition-all duration-500 object-fill'
                priority={false}
            />
            <div className='w-8/12 flex flex-col justify-evenly gap-2 ease-in-out transition-all duration-500'>
                <p className='font-semibold'>{title}</p>
                <div className='flex gap-2 items-center '>
                    <div className='flex items-center'>
                        {generateStars}
                    </div>
                    <p className='flex gap-2'><b>{average_grade.toFixed(1)}</b>({number_of_votes})</p>
                </div>
                <div className='line-clamp-3'>{description}</div>
            </div>
        </div>
    </Link>
}

export default ProductItemComponent