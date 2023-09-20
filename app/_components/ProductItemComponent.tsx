/* eslint-disable @next/next/no-async-client-component */
'use client'
import { Star, StarHalf } from 'lucide-react'
import Image from 'next/image'
import React, { Suspense, useMemo, useState } from 'react'
import { type ProductType } from "../_types/ProdcutType";
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { Product } from '@prisma/client';

async function ProductItemComponent({ product }: any) {
    const { id, image, title, description } = product
    const { theme } = useTheme()
    const randomNumber = Number((Math.random() * 10).toFixed(1))
    const randomStars = randomNumber < 1 ? 1 : randomNumber


    const generateStars = useMemo(() => {
        const stars: Array<any> = []
        for (var index = 0; index < randomStars; index++) {
            if (index < Math.floor(randomStars)) {
                stars.push(<Star key={index} strokeWidth={0} size={16} className='fill-primary' />)
            }
        }
        for (var index = stars.length; index < 10; index++) {
            stars.push(<Star key={index} strokeWidth={0} size={16} fill='#ccc' />)
        }
        return stars
    }, [randomStars, theme])


    return <Link href={`/product/${id}`}>
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
                    <p className='flex gap-2'><b>{randomStars.toFixed(1)}</b>({(Math.random() * (Math.random() * 1000)).toFixed()})</p>
                </div>
                <div className='line-clamp-3'>{description}</div>
            </div>
        </div>
    </Link>
}

export default ProductItemComponent