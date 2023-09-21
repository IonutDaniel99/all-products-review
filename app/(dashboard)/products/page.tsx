
/* eslint-disable @next/next/no-async-client-component */
/* eslint-disable react-hooks/exhaustive-deps */
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/_components/ui/dialog";
import ProductsFilters from "./ProductsFilters"
import ProductsPage from "./ProductsPage";


export default function Page() {


    return (
        <div className="flex flex-col w-full relative ">
            <div className="flex flex-col xl:flex-row gap-2 xl:gap-10 overflow-y-auto transition-all duration-500 ease-in-out">
                <div className=" bg-background hidden xl:block xl:w-3/12 ">
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
                    <ProductsPage />
                </div>
            </div>

        </div>
    )
}