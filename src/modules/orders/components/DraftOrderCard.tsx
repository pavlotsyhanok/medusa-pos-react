import { Button, toast, Container, Toaster } from "@medusajs/ui";

export default function DraftOrderCard(props: any) {
    const { id, status, changeOrder, price, first_name, last_name, email } = props;

    return (
        <Container className="flex flex-col flex-nowrap justify-between items-center w-[450px] h-[200px] p-[15px] border border-[rgba(206,206,206,1)] rounded-[10px] hover:shadow-md transition-shadow">
            <div className="w-full">
                <p className="text-[14px] leading-[18.15px] font-normal text-gray-600 mb-[5px]">
                    Draft-order ID: <b className="text-black">{id}</b>
                </p>
                <p className="text-[14px] leading-[18.15px] font-normal text-gray-600 mb-[5px]">
                    Draft-order Status: <b className="text-black">{status}</b>
                </p>
                <p className="text-[14px] leading-[18.15px] font-normal text-gray-600 mb-[5px]">
                    Draft-order Price: <b className="text-black">{price} $</b>
                </p>
                <p className="text-[14px] leading-[18.15px] font-normal text-gray-600 mb-[5px]">
                    Name: <b className="text-black">{first_name} {last_name}</b>
                </p>
                <p className="text-[14px] leading-[18.15px] font-normal text-gray-600">
                    Email: <b className="text-black">{email}</b>
                </p>
            </div>
            <div className="flex flex-row gap-[10px]">
                <Toaster />
                <Button
                    onClick={() => {
                        if (status === "completed" || status === "paid") {
                            toast.warning("Warning", {
                                description: "The draft order is completed or paid, you can't select it.",
                                duration: 3500,
                            })
                        } else {
                            changeOrder(id);
                        }
                    }}
                    className="w-[120px] h-[40px] text-[14px]">
                    Select
                </Button>
            </div>
        </Container>
    );
}