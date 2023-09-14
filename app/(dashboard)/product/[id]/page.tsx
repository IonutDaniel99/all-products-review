import { ProductType } from '@/types/ProdcutType'
import React from 'react'

async function Product({ params }: { params: { id: number } }) {
    const productDetails = await Promise.resolve(
        fetch(`https://picsum.photos/id/${params.id}/info`)
    ).then(data => data.json())
    return (
        <div>Product {params.id}<br />{productDetails?.author}</div>
    )
}

export default Product