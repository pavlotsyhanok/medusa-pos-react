import type { DraftOrder, DraftOrderResponse } from "./types/CreateDraftOrder";
import { useMutation } from "@tanstack/react-query";
import { postDraftOrder } from "./funtions/postDraftOrder";
import { useQuery } from "@tanstack/react-query";
import { getDraftOrdersList } from "./funtions/getDraftOrdersList";
import { deleteDraftOrder } from "./funtions/deleteDraftOrder";
import { retrieveDraftOrder } from "./funtions/retrieveDraftOrder";

export function draftOrderProvider() {

    const { mutateAsync: placeDraftOrder } = useMutation({

        mutationFn: async (newDraftOrder: DraftOrder) => {
            const response = postDraftOrder(newDraftOrder);
            return response
        },
        onSuccess: () => {
            console.log("succeed saved draft order");
        },
        onError: (error) => {
            console.error("Login failed:", error);
            throw error;
        },
    });
    return {
        placeDraftOrder
    }
}
// export function draftOrderProvider() {
//     const { mutateAsync: placeDraftOrder } = useMutation({
//         mutationFn: async (newDraftOrder: DraftOrder): Promise<DraftOrderResponse> => {
//             const response = await postDraftOrder(newDraftOrder);
//             return response;
//         },
//         onSuccess: () => {
//             console.log("Succeeded in saving draft order");
//         },
//         onError: (error) => {
//             console.error("Failed to save draft order:", error);
//             throw error;
//         },
//     });

//     return {
//         placeDraftOrder,
//     };
// }




export function useDraftOrdersListQuery() {

    // Fetch customers from Medusa API
    const { isLoading, isError, data: draftOrdersList, error } = useQuery({
        queryKey: ['draftOrdersList'],
        queryFn: async () => {
            const response = await getDraftOrdersList();
            return response.data;
        },
    });

    return {
        isLoading,
        isError,
        draftOrdersList,
        error
    }
}
export function deleteDraftOrderProvider() {

    const { mutateAsync: deletedDraftOrder } = useMutation({

        mutationFn: async (id: string) => {
            await deleteDraftOrder(id);
        },
        onSuccess: () => {
            console.log("succeed deleted draft order");
        },
        onError: (error) => {
            console.error("Delete failed:", error);
            throw error;
        },
    });
    return {
        deletedDraftOrder
    }
}
export function getDraftOrder(draftOrderId: string) {

    // Fetch customers from Medusa API
    const { isLoading, isError, data: draftOrderData, error } = useQuery({
        queryKey: ['draftOrder'],
        queryFn: async () => {
            const response = await retrieveDraftOrder(draftOrderId);
            return response;
        },
    });

    return {
        isLoading,
        isError,
        draftOrderData,
        error
    }
}