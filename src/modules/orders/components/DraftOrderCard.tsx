import { Button, toast, Container, Toaster } from "@medusajs/ui";

export default function DraftOrderCard(props: any) {
    const { id, status, deleteOrder, changeOrder, price } = props;

    return (
        <Container className="flex flex-col flex-nowrap justify-between items-center w-[450px] h-[170px] p-[15px] border border-[rgba(206,206,206,1)] rounded-[10px] hover:shadow-md transition-shadow">
            <div className="w-full">
                <p className="text-[14px] leading-[18.15px] font-normal text-gray-600 mb-[5px]">
                    Draft-order ID: <b className="text-black">{id}</b>
                </p>
                <p className="text-[14px] leading-[18.15px] font-normal text-gray-600 mb-[5px]">
                    Draft-order Status: <b className="text-black">{status}</b>
                </p>
                <p className="text-[14px] leading-[18.15px] font-normal text-gray-600">
                    Draft-order Price: <b className="text-black">{price} $</b>
                </p>
            </div>
            <div className="flex flex-row gap-[10px]">
                <Button
                    onClick={deleteOrder}
                    variant="danger"
                    className="w-[100px] h-[35px] text-[14px]"
                    disabled={status === "completed" || status === "paid"}
                >
                    Delete
                </Button>
                <Toaster />
                <Button
                    onClick={() => {
                        if (status === "completed" || status === "paid") {
                            toast.warning("Warning", {
                                description: "The draft order is completed or paid, you can't select it.",
                                duration: 3000,
                            })
                        } else {
                            changeOrder(id);
                        }
                    }}
                    className="w-[100px] h-[35px] text-[14px]"
                >
                    Select
                </Button>
            </div>
        </Container>
    );
}