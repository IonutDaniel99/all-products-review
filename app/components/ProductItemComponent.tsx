import { Star, StarHalf } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

function ProductItemComponent({ val }) {
    return (
        <div className='flex p-2 gap-4 h-48'>
            <div className='w-4/12'>
                <Image src={"https://placehold.co/300x180.svg"}
                    alt={'placeholder logo'}
                    width="300"
                    height="180"
                    priority={false}
                />
            </div>
            <div className='w-8/12 flex flex-col justify-evenly'>
                <p>Title of product</p>
                <div className='flex gap-2 items-center'>
                    <p>4.6 out of 10</p>
                    <Star strokeWidth={1.25} size={20} fill='#ffff00' color='gray' />
                </div>
                <desc>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatibus ipsam vero accusantium ex, voluptates, a provident architecto error ipsum at ea! Deserunt, id impedit! Laboriosam ab nobis at quos iste!</desc>
            </div>
        </div>
    )
}

export default ProductItemComponent