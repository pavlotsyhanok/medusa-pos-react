import { useQueryClient } from '@tanstack/react-query';
import ActiveCartElement from './ActiveCartElement'
import { useDraftOrdersListQuery } from '@/lib/hooks/draft-order/DraftOrderProvider';
import { useState, useEffect } from 'react';
import { useDraftOrderQuery } from '@/lib/hooks/draft-order/DraftOrderProvider';
import { useNavigate } from '@tanstack/react-router';

function ActiveCartsList() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [selectedDraftOrderId, setSelectedDraftOrderId] = useState<string>("");

  const { isLoading, isError, draftOrdersList, error } = useDraftOrdersListQuery();

  const handleClick = async (draftOrderId: string) => {
    await queryClient.invalidateQueries({ queryKey: ["draftOrder", draftOrderId] });
    await queryClient.refetchQueries({ queryKey: ["draftOrder", draftOrderId] });
    setSelectedDraftOrderId(draftOrderId);
  }
  const { draftOrderData, isLoading: isLoadingDraftOrderData } = useDraftOrderQuery(selectedDraftOrderId || "");

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

  return (
    <div className="w-full relative">
      <div className="overflow-x-auto">
        <div className="flex gap-4 w-max p-[2px]">
          {isLoading ? (
            <p>Loading...</p>
          ) : isError ? (
            <p>Error: {error?.message}</p>
          ) : draftOrdersList?.draft_orders.some((orders: any) => orders.items.length > 0) ? (
            draftOrdersList?.draft_orders.map((order: any) => (
              <ActiveCartElement
                key={order.id}
                id={order.id}
                status={order.status}
                price={order.summary.current_order_total}
                quantity={order.items.length}
                first_name={order.metadata?.first_name || "null"}
                last_name={order.metadata?.last_name || "null"}
                email={order.metadata?.email || "null"}
                handleClick={() => handleClick(order.id)}
              />
            ))
          ) : (
            <p>No orders have been found</p>
          )}
        </div>
      </div>
      <div className="absolute right-0 top-0 h-full w-20 pointer-events-none bg-gradient-to-l from-ui-base to-transparent" />
    </div>
  )
}

export default ActiveCartsList