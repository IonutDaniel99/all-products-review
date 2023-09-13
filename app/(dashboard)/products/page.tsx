import ProductsFilters from "./ProductsFilters"

function ProductsPage() {
    return (
        <div className="flex flex-col w-full">
            <div className="top-22 z-40 bg-white fixed max-w-5xl">
                <ProductsFilters />
            </div>
            <div className=" w-full border-2 rounded-md overflow-y-auto h-[1900px] top-20 relative">
                test
            </div>
        </div>
    )
}

export default ProductsPage