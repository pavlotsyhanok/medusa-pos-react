import { Button } from "@medusajs/ui"
import Products from "./Products";

export default function CartComponent(props: any) {

    const client = localStorage.getItem("client") ? JSON.parse(localStorage.getItem("client") as string) : null;



    return (
        <div className="min-h-[550px] max-h-[550px] flex flex-col justify-start items-start gap-[10px] w-full p-[10px_10px]">
            {client?.customerOrder?.map((e: any) => (
                <div className="w-full h-[105px] relative" key={e.uniqueId}>
                    <Products
                        className={`h-[105px] hover:cursor-pointer p-2 m-0 flex align-center justify-start gap-[15px] min-w-[335px]`}
                        classNameImage={`w-[90px]`}
                        title={e.title}
                        image={e.thumbnail}
                        price={e.variants[0].prices[1].amount}
                    />
                    <Button
                        onClick={() => props.deleteProduct(e.uniqueId)}
                        variant="danger"
                        className="absolute top-1/2 right-4 transform -translate-y-1/2 w-[60px] sm:w-[50px] md:w-[70px]"
                    >
                        Delete
                    </Button>
                </div>
            ))}
        </div>

    )
}