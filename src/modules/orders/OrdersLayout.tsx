import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import NavigationRaw from "@/components/NavigationRaw";
import { deleteDraftOrderProvider, useDraftOrdersListQuery } from "@/lib/hooks/draft-order/DraftOrderProvider";
import DraftOrderCard from "./components/DraftOrderCard";

export default function OrdersLayout() {

    const queryClient = useQueryClient();
    const [search, setSearch] = useState("");
    const { isLoading, isError, draftOrdersList, error } = useDraftOrdersListQuery();

    console.log(draftOrdersList)
    const { deletedDraftOrder } = deleteDraftOrderProvider();

    const deleteOrder = async (draftOrderId: string) => {
        try {
            await deletedDraftOrder(draftOrderId);
            queryClient.invalidateQueries({ queryKey: 'draftOrdersList' });
        } catch (error) {
            console.log(error);
        }
    };


    const changeOrder = (draftOrderId: string) => {

    };

    const searchEngine = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    // const filteredDraftOrders = draftsData.filter((order: any) => {
    //     const searchLower = search.toLowerCase();
    //     const price = calculatePrice(order.cart.items);
    //     const email = order.cart.email?.toLowerCase() || '';
    //     const id = order.id.toLowerCase();
    //     const status = order.status.toLowerCase();

    //     return email.includes(searchLower) ||
    //         id.includes(searchLower) ||
    //         status.includes(searchLower) ||
    //         price.includes(searchLower);
    // });

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
                            price={order.summary.current_order_total}
                            deleteOrder={() => deleteOrder(order.id)}
                            changeOrder={() => changeOrder(order.id)}
                        />
                    ))
                ) : (
                    <p>No orders have been found</p>
                )}
                {/* {filteredDraftOrders.map((e: any) => (
                    <DraftOrderCard
                        key={e.id}
                        id={e.id}
                        status={e.status}
                        email={e.cart.email}
                        price={calculatePrice(e.cart.items)}
                        deleteOrder={() => deleteOrder(e.id)}
                        changeOrder={() => changeOrder(e.id)}
                    />
                ))} */}
            </main>
        </>
    );
}