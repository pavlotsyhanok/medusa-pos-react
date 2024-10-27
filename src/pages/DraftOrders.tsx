import { Link, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { medusa } from "../lib/medusa-provider";
import DraftOrderCard from "../components/DraftOrderCard";

export default function DraftOrders({ setClient, setDraftOrder, setEnable }: { setEnable: any, setDraftOrder: (newOrder: boolean) => void; setClient: any }) {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

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
        return totalPrice;
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
                setEnable(false);
            });
    };

    return (
        <>
            <header>
                <h1 className='page-name'>Draft Orders</h1>
            </header>
            <nav className='back-menu back-checkout'>
                <Link to={".."} onClick={() => {
                    navigate(-1);
                }}>← Back to Catalog</Link>
            </nav>
            <nav>
                <ul className="draft-orders-list">
                    {draftsData.map((e: any) => (
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
                </ul>
            </nav>
        </>
    );
}