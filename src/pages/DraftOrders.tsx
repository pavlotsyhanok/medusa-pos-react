import { Link, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { medusa } from "../lib/medusa-provider";
import DraftOrderCard from "../components/DraftOrderCard";
import { Input } from "@medusajs/ui";
import { ArrowDownLeftMini } from "@medusajs/icons";
import { useState } from "react";

export default function DraftOrders({ setClient, setDraftOrder, setEnable }: { setEnable: any, setDraftOrder: (newOrder: boolean) => void; setClient: any }) {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [search, setSearch] = useState("");

    const deleteOrderMutation = useMutation({
        mutationFn: (draftOrderId: string) => {
            return medusa.admin.draftOrders.delete(draftOrderId);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['draftOrders'] });
        }
    });

    const { isLoading: draftsIsLoading, isError: draftsIsError, data: draftsData, error: draftsError } = useQuery({
        queryKey: ["draftOrders"],
        queryFn: async () => {
            const response = await medusa.admin.draftOrders.list()
            return response.draft_orders
        }
    });

    if (draftsIsLoading) return <h1>Loading...</h1>;
    if (draftsIsError) {
        const typedError = draftsError as Error;
        return <div>Error: {typedError.message}</div>;
    };

    const calculatePrice = (items: any) => {
        const totalPrice = items
            .map((item: any) => item.unit_price)
            .reduce((acc: number, current: number) => acc + current, 0);
        return (totalPrice / 100).toFixed(2);
    }

    const deleteOrder = (draftOrderId: string) => {
        deleteOrderMutation.mutate(draftOrderId)
    };

    const changeOrder = (draftOrderId: string) => {
        medusa.admin.draftOrders.retrieve(draftOrderId)
            .then((draftOrderId) => {
                setClient(draftOrderId.draft_order);
                setDraftOrder(false);
                navigate('/shopping-panel');
                setEnable(true);
            });
    };

    const searchEngine = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    const filteredDraftOrders = draftsData.filter((order: any) => {
        const searchLower = search.toLowerCase();
        const price = calculatePrice(order.cart.items);
        const email = order.cart.email?.toLowerCase() || '';
        const id = order.id.toLowerCase();
        const status = order.status.toLowerCase();

        return email.includes(searchLower) ||
            id.includes(searchLower) ||
            status.includes(searchLower) ||
            price.includes(searchLower);
    });

    return (
        <>
            <nav className="w-full px-[25px] h-[80px] flex flex-row flex-nowrap justify-between items-center border">
                <Link className="flex flex-row flex-nowrap justify-center items-center text-black text-[14px]" to={".."} onClick={() => navigate(-1)}>
                    <ArrowDownLeftMini className="mr-[5px]" /> Go Back
                </Link>
                <div className="flex flex-row justify-center items-center flex-1">
                    <div className="relative w-[550px]">
                        <Input
                            className="w-full text-black rounded-[100px] pl-[35px] focus:text-black shadow-none bg-white focus:bg-white hover:bg-white"
                            placeholder="Search..."
                            id="search-input"
                            type="search"
                            onChange={searchEngine}
                            value={search}
                        />
                    </div>
                </div>
                <div className="w-[100px]"></div>
            </nav>
            <header className="p-[15px] self-start border-b">
                <p className="text-[15px] text-gray-400">Draft Orders</p>
            </header>
            <main className="flex flex-col flex-nowrap justify-center items-center gap-[10px] my-[25px]">
                {filteredDraftOrders.map((e: any) => (
                    <DraftOrderCard
                        key={e.id}
                        id={e.id}
                        status={e.status}
                        email={e.cart.email}
                        price={calculatePrice(e.cart.items)}
                        deleteOrder={() => deleteOrder(e.id)}
                        changeOrder={() => changeOrder(e.id)}
                    />
                ))}
            </main>
        </>
    );
}