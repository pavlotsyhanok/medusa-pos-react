import { Button, Text } from "@medusajs/ui"
import Products from "./Products";

export default function CartComponent(props: any) {
    const { amountClick } = props;

    const client = localStorage.getItem("client") && JSON.parse(localStorage.getItem("client") as string);
    const draftOrder = localStorage.getItem("draftOrder") ? JSON.parse(localStorage.getItem("draftOrder") as string) : false;

    return (
        <div className="min-h-[550px] flex flex-col justify-start items-start gap-[10px] w-full p-[10px_10px]">
            {!draftOrder ? (client?.customerOrder?.map((e: any) => (
                <div className="w-full h-[105px] relative" key={e.uniqueId}>
                    <Products
                        prompt={false}
                        className={`h-[105px] hover:cursor-pointer p-2 m-0 flex align-center justify-start gap-[15px] min-w-[340px]`}
                        classNameImage={`w-[90px]`}
                        title={e.title}
                        image={e.thumbnail}
                        price={e.variants[0].prices[0].amount}
                        count={e.quantity}
                        amountClick={amountClick}
                    />
                    <div className="absolute top-[25px] right-4 md:bottom-[55px]">
                        <div className="flex flex-row justify-center items-center">
                            <Button className="w-[7px] h-[15px]" onClick={() => amountClick(1, e.id)}>
                                -
                            </Button>
                            <Text className="mx-2">
                                {e.quantity}
                            </Text>
                            <Button className="w-[7px] h-[15px]" onClick={() => amountClick(2, e.id)}>
                                +
                            </Button>
                        </div>
                    </div>
                    <Button
                        onClick={() => props.deleteProduct(e.uniqueId)}
                        variant="danger"
                        className="absolute top-3/4 right-4 transform -translate-y-1/2 w-[60px] sm:w-[50px] md:w-[70px]">
                        Delete
                    </Button>
                </div>
            ))) : (draftOrder.items.map((e: any) => (
                <div className="w-full h-[105px] relative" key={e.uniqueId ? e.uniqueId : e.id}>
                    <Products
                        className={`h-[105px] hover:cursor-pointer p-2 m-0 flex align-center justify-start gap-[15px] min-w-[300px]`}
                        classNameImage={`w-[90px]`}
                        title={e.product_title ? e.product_title : e.title}
                        image={e.thumbnail ? e.thumbnail : e.metadata.thumbnail}
                        price={e.original_total ? e.original_total : e.variants[0].prices[0].amount}
                        count={e.quantity}
                        amountClick={amountClick}
                    />
                    <div className="absolute top-[25px] right-4 md:bottom-[55px]">
                        <div className="flex flex-row justify-center items-center">
                            <Button className="w-[7px] h-[15px]" onClick={() => amountClick(1, e.id)}>
                                -
                            </Button>
                            <Text className="mx-2">
                                {e.quantity}
                            </Text>
                            <Button className="w-[7px] h-[15px]" onClick={() => amountClick(2, e.id)}>
                                +
                            </Button>
                        </div>
                    </div>
                    <Button
                        onClick={() => props.deleteProduct(e.uniqueId ? e.uniqueId : e.id)}
                        variant="danger"
                        className="absolute top-3/4 right-4 transform -translate-y-1/2 w-[60px] sm:w-[50px] md:w-[70px]" >
                        Delete
                    </Button>
                </div>
            )))}
        </div>
    )
}