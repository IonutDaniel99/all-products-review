import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import ProductsFilters from "./ProductsFilters"
import ProductItemComponent from "@/components/ProductItemComponent";
import { Separator } from "@/components/ui/separator";
import { Suspense } from "react";
import ProductsItemLoading from "@/components/loading/ProductsItemLoading";
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'
import { PrismaClient, Product } from "@prisma/client";


export default async function ProductsPage() {
    const prisma = new PrismaClient()
    const products = await prisma.product.findMany()

    return (
        <div className="flex flex-col w-full relative ">
            <div className="flex flex-col xl:flex-row gap-2 xl:gap-10 overflow-y-auto transition-all duration-500 ease-in-out">
                <div className="z-40 bg-background hidden xl:block xl:w-3/12 ">
                    <ProductsFilters />
                </div>
                <Dialog>
                    <DialogTrigger className="block xl:hidden border-2 h-10 font-bold w-40 self-end rounded-md">Filters</DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle className="pb-6">Filters</DialogTitle>
                            <ProductsFilters />
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
                <div className="w-full xl:w-9/12 border-2 rounded-md relative ">
                    {products.map((product, index) => {
                        return <>
                            <Suspense fallback={<ProductsItemLoading />}>
                                <ProductItemComponent key={index} product={product} />
                                {index !== products.length - 1 && <Separator orientation='horizontal' decorative className='my-2' />}
                            </Suspense>
                        </>
                    })}
                </div>
            </div>

        </div>
    )
}