'use client'

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import ProductsFilters from "./ProductsFilters"
import ProductItemComponent from "@/components/ProductItemComponent";

function ProductsPage() {
    return (
        <div className="flex flex-col w-full relative">
            <div className="flex flex-col xl:flex-row gap-2 xl:gap-10">
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
                <div className="w-full xl:w-9/12 border-2 rounded-md overflow-y-auto relative">
                    {Array.from(Array(10).keys()).map((value, index) => {
                        console.log(value)
                        return <ProductItemComponent key={index} val={value} />
                    })}
                </div>
            </div>

        </div>
    )
}

export default ProductsPage