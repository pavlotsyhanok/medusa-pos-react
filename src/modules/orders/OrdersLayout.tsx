import { useQueryClient } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import NavigationRaw from "@/components/NavigationRaw";
import { useDraftOrdersListQuery } from "@/lib/hooks/draft-order/DraftOrderProvider";
import DraftOrderCard from "./components/DraftOrderCard";
import { useNavigate } from "@tanstack/react-router";
import { useDraftOrderQuery } from "@/lib/hooks/draft-order/DraftOrderProvider";

export default function OrdersLayout() {

    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { isLoading, isError, draftOrdersList, error } = useDraftOrdersListQuery();
    console.log(draftOrdersList);
    console.log(draftOrdersList);
    const [selectedDraftOrderId, setSelectedDraftOrderId] = useState<string>("");

    const { draftOrderData, isLoading: isLoadingDraftOrderData } = useDraftOrderQuery(selectedDraftOrderId || "");

    // Change Order Functionality
    const changeOrder = async (draftOrderId: string) => {
        await queryClient.invalidateQueries({ queryKey: ["draftOrder", draftOrderId] });
        await queryClient.refetchQueries({ queryKey: ["draftOrder", draftOrderId] });
        setSelectedDraftOrderId(draftOrderId);
    }

    useEffect(() => {
        if (!selectedDraftOrderId || isLoadingDraftOrderData) {
            return;
        }

        if (!draftOrderData) {
            console.error("Draft order data is not available.");
            return;
        }
        localStorage.removeItem("client");
        localStorage.setItem("draftOrder", JSON.stringify(draftOrderData.order));
        navigate({ to: "/catalog" });
    }, [draftOrderData, isLoadingDraftOrderData, selectedDraftOrderId]);

    console.log(draftOrdersList);

    return (
        <>
            <NavigationRaw first={'Draft Orders →'} />
            <main className="flex flex-col flex-nowrap justify-center items-center gap-[10px] my-[25px]">
                {isLoading ? (
                    <p>Loading...</p>
                ) : isError ? (
                    <p>Error: {error?.message}</p>
                ) : draftOrdersList?.draft_orders.some((orders: any) => orders.items.length > 0) ? (
                    draftOrdersList?.draft_orders.map((order: any) => (
                        <DraftOrderCard
                            key={order.id}
                            id={order.id}
                            status={order.status}
                            price={order.items.reduce((total: number, item: any) => total + item.unit_price * item.quantity, 0)}
                            first_name={order.metadata?.first_name || "null"}
                            last_name={order.metadata?.last_name || "null"}
                            email={order.metadata?.email || "null"}
                            changeOrder={() => changeOrder(order.id)}
                        />
                    ))
                ) : (
                    <p>No orders have been found</p>
                )}
            </main>
        </>
    );
}