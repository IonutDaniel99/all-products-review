import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import ProductsFilters from "./ProductsFilters"
import ProductItemComponent from "@/components/ProductItemComponent";

async function ProductsPage() {

    const imagesList = await Promise.resolve(
        fetch("https://picsum.photos/v2/list?limit=35")
    ).then(data => data.json())

    return (
        <div className="flex flex-col w-full relative">
            <div className="flex flex-col xl:flex-row gap-2 xl:gap-10 overflow-y-auto ">
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
                <div className="w-full xl:w-9/12 border-2 rounded-md relative">
                    {imagesList.map((value: any, index: number) =>
                        <ProductItemComponent key={index} product={value} />
                    )}
                </div>
            </div>

        </div>
    )
}

export default ProductsPage