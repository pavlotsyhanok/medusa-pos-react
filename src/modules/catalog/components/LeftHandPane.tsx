import Products from "./Products";
import useProductQuery from "@/lib/hooks/products/ProductProvider";

export default function LeftHandPane({ isClientSet, selectProduct }: { isClientSet: boolean, selectProduct: (id: string, uniqueId: string) => void }) {

    const { isLoading, isError, productsList, error } = useProductQuery()

    return (
        <div className="flex-[2] border-t-0 border border-[rgba(206,206,206,1)] h-full">
            <div className="flex flex-wrap gap-[10px] py-[5px] overflow-y-scroll  h-full overscroll-x-contain">
                {isClientSet ?
                    (isLoading ? (
                        <p>Loading...</p>
                    ) : isError ? (
                        <p>Error: {error?.message || "An error occurred"}</p>
                    ) : productsList && productsList.length > 0 ? (
                        productsList.map((product: any) => (
                            <div className="flex justify-start items-start hover:cursor-pointer pl-[10px] h-[390px] py-[10px]" key={product.id}>
                                <Products
                                    prompt={true}
                                    id={product.id}
                                    uniqueId={product.uniqueId}
                                    className="h-[380px] w-[230px] hover:cursor-pointer"
                                    title={product.title}
                                    selectProduct={selectProduct}
                                    image={product.thumbnail}
                                    classNameImage="bg-non mt-[5px]"
                                    price={product.variants[0].prices[0].amount}
                                    description={product.description}
                                />
                            </div>
                        )
                        )) : (
                        <p>No products found.</p>
                    )) : (
                        <div className="flex flex-col justify-center items-start border-b h-[50px] w-full">
                            <h2 className="text-[24px] font-semibold text-center ml-[15px]">
                                Select the customer first
                            </h2>
                        </div>
                    )}
            </div>
        </div>
    );
}
