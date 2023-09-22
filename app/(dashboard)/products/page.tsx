
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/_components/ui/dialog";
import ProductsFilters from "./ProductsFilters"
import ProductsPage from "./ProductsPage";
import { type ProductsSearchParams } from "@/_types/ProductsSearchParamsType";
import { Suspense } from "react";


export default function Page({ searchParams }: ProductsSearchParams) {
    return (
        <div className="flex flex-col w-full relative ">
            <div className="flex flex-col xl:flex-row gap-2 xl:gap-10 overflow-y-auto transition-all duration-500 ease-in-out">
                <div className=" bg-background hidden xl:block xl:w-3/12 ">
                    <Suspense fallback={"Loading"} >
                        <ProductsFilters searchParams={searchParams} />
                    </Suspense>
                </div>
                <Dialog>
                    <DialogTrigger className="block xl:hidden border-2 h-10 font-bold w-40 self-end rounded-md">Filters</DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle className="pb-6">Filters</DialogTitle>
                            <ProductsFilters searchParams={searchParams} />
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
                <div className="w-full xl:w-9/12 border-2 rounded-md relative ">
                    <ProductsPage searchParams={searchParams} />
                </div>
            </div>
        </div >
    )
}