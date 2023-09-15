import { PrismaClient } from '@prisma/client'
import React from 'react'

async function Product({ params }: { params: { id: number } }) {
    const prisma = new PrismaClient()
    const product = await prisma.product.findUnique({
        where: {
            id: Number(params.id),
        },
    })

    return (
        <div>
            <p>{product?.title}</p>
            <p>{product?.description}</p>
            <p>{product?.numberOfVotes}</p>
        </div>
    )
}

export default Product