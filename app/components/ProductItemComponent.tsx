import { Star, StarHalf } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import { type ProductType } from "@/types/ProdcutType";
import { Separator } from './ui/separator';
import Link from 'next/link';

function ProductItemComponent({ product }: ProductType) {
    const { id, author, download_url, height, url, width } = product
    return (
        <>
            <Link href={`/product/${id}`}>
                <div className='flex p-4 h-48 items-center my-2'>
                    <div className='w-4/12'>
                        <Image
                            src={download_url}
                            alt={'placeholder logo'}
                            width="260"
                            height="100"
                            priority={false}
                        />
                    </div>
                    <div className='w-8/12 flex flex-col justify-evenly'>
                        <p>{author}</p>
                        <div className='flex gap-2 items-center'>
                            <p>4.6 out of 10</p>
                            <Star strokeWidth={1.25} size={20} fill='#ffff00' color='gray' />
                        </div>
                        <div>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatibus ipsam vero accusantium ex, voluptates, a provident architecto error ipsum at ea! Deserunt, id impedit! Laboriosam ab nobis at quos iste!</div>
                    </div>
                </div>
            </Link>
            <Separator orientation='horizontal' decorative className='my-2' />

        </>
    )
}

export default ProductItemComponent