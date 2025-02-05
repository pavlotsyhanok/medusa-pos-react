import type { DraftOrder } from "./types/CreateDraftOrder";
import { useMutation } from "@tanstack/react-query";
import { postDraftOrder } from "./funtions/postDraftOrder";
import { useQuery } from "@tanstack/react-query";
import { getDraftOrdersList } from "./funtions/getDraftOrdersList";
import { retrieveDraftOrder } from "./funtions/retrieveDraftOrder";
import { deleteDraftOrderItem, postDraftOrderEdit, postDraftOrderItem, postCreateDraftOrderEdit } from "./funtions/DraftOrderItems.tsx";
import { useQueryClient } from "@tanstack/react-query";
import { postItemQuantity } from "./funtions/postItemQuantity";

export function useDraftOrdersListQuery() {
    const { isLoading, isError, data: draftOrdersList, error } = useQuery({

        queryKey: ['draftOrdersList'],
        queryFn: async () => {
            const response = await getDraftOrdersList();
            return response;
        },
        staleTime: 0,
    });
    return {
        isLoading,
        isError,
        draftOrdersList,
        error
    }
}

export function useDraftOrderQuery(draftOrderId: string) {
    const { isLoading, isError, data: draftOrderData, error } = useQuery({

        queryKey: ["draftOrder", draftOrderId],
        queryFn: async () => {
            const response = await retrieveDraftOrder(draftOrderId);
            console.log("Draft Order Response:", response);
            return response;
        },
        enabled: !!draftOrderId,
        staleTime: 0,
    });
    return {
        isLoading,
        isError,
        draftOrderData,
        error
    }
}

export function draftOrderProvider() {
    const { mutateAsync: placeDraftOrder } = useMutation({

        mutationFn: async (newDraftOrder: DraftOrder) => {
            const response = postDraftOrder(newDraftOrder);
            return response
        },
        onSuccess: () => {
            console.log("Succeed saved draft order");
        },
        onError: (error) => {
            console.error("Draft order saving has been failed:", error);
            throw error;
        },
    });
    return {
        placeDraftOrder
    }
}
export function useCreateEditDraftItemsProvider() {
    const { mutateAsync: createDraftOrderEdit } = useMutation({

        mutationFn: async (draftOrderId: string) => {
            const response = await postCreateDraftOrderEdit(draftOrderId);
            return response
        },
        onSuccess: () => {
            console.log("Succeed create draft order edit");
        },
        onError: (error) => {
            console.error("Draft order create edit has been failed:", error);
            throw error;
        },
    });
    return {
        createDraftOrderEdit
    }
}

export function useConfirmDraftItemsProvider() {
    const { mutateAsync: confirmDraftOrderEdit } = useMutation({

        mutationFn: async (draftOrderId: string) => {
            return await postDraftOrderEdit(draftOrderId);
        },
        onSuccess: () => {
            console.log("Succeed confirm draft order edit");
        },
        onError: (error) => {
            console.error("Draft order confirm edit has been failed:", error);
            throw error;
        },
    });
    return {
        confirmDraftOrderEdit
    }
}

export function useDeleteDraftItemsProvider() {
    const queryClient = useQueryClient();

    const { mutateAsync: deleteDraftOrderItems } = useMutation({

        mutationFn: async ({ draftOrderId, item_id }: { draftOrderId: string; item_id: any }) => {
            const response = await deleteDraftOrderItem(draftOrderId, item_id);
            return response
        },
        onSuccess: () => {
            console.log("Succeed deleted draft order item");
            queryClient.invalidateQueries({ queryKey: ["draftOrdersList"] });
        },
        onError: (error) => {
            console.error("Draft order deleting has been failed:", error);
            throw error;
        },
    });
    return {
        deleteDraftOrderItems
    }
}

export function useAddDraftItemsProvider() {
    const queryClient = useQueryClient();

    const { mutateAsync: addDraftOrderItems } = useMutation({
        mutationFn: async ({ draftOrderId, items }: { draftOrderId: string; items: DraftOrder }) => {
            return await postDraftOrderItem(draftOrderId, items);
        },
        onSuccess: () => {
            console.log("Succeed saved draft order item");
            queryClient.invalidateQueries({ queryKey: ["draftOrdersList"] });
        },
        onError: (error) => {
            console.error("Draft order saving item has been failed:", error);
            throw error;
        },
    });
    return {
        addDraftOrderItems
    }
}

export function useUpdateItemQuantity() {
    const queryClient = useQueryClient();

    const { mutateAsync: updateItemQuantity } = useMutation({

        mutationFn: async ({ draftOrderId, item_id, quantity }: { draftOrderId: string; item_id: string, quantity: number }) => {
            const response = await postItemQuantity(draftOrderId, item_id, quantity);
            queryClient.invalidateQueries({ queryKey: ["draftOrder", draftOrderId] });
            return response
        },
        onSuccess: () => {
            console.log("Succeed updated item quantity");
        },
        onError: (error) => {
            console.error("Draft order updating item quantity has been failed:", error);
            throw error;
        },
    });
    return {
        updateItemQuantity
    }
}