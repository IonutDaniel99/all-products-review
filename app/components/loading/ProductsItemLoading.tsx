import React from 'react'
import { Skeleton } from '../ui/skeleton'

function ProductsItemLoading() {
    return (
        <div className="flex p-4 h-48 gap-6 items-center m-2 hover:bg-secondary rounded-md ease-in-out transition-all duration-500 group font-normal">
            <Skeleton className="max-w-[10rem] sm:max-w-[16rem] w-full h-40 " />
            <div className='w-8/12 flex flex-col justify-evenly gap-2 ease-in-out transition-all duration-500 h-full '>
                <Skeleton className='font-semibold w-64 h-8 ' />
                <div className='flex gap-2 items-center '>
                    <div className='flex items-center'>
                        <Skeleton className=' w-40  h-4' />
                    </div>
                    <Skeleton className='flex gap-2 w-60'></Skeleton>
                </div>
                <Skeleton className='w-full h-4 ' />
                <Skeleton className='w-full h-4 ' />
                <Skeleton className='w-full h-4 ' />
            </div>
        </div>
    )
}

export default ProductsItemLoading