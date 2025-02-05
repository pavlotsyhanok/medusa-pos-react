import { useMutation } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { getTheCustomerNotesList, putTheCustomerNote, deleteTheCustomerNote } from "./functions/TheCustomerNotes";
import { getTheDraftNotesList, putTheDraftNote, deleteTheDraftNote } from "./functions/TheDraftNotes";

export default function NotesProvider() {

    const { mutateAsync: placeTheCustomerNote } = useMutation({
        mutationFn: async ({ customer_id, bodyNote }: { customer_id: string, bodyNote: { title: string } }) => {
            return await putTheCustomerNote(customer_id, bodyNote);
        },
        onSuccess: () => {
            console.log("Succeed added new Note");
        },
        onError: (error) => {
            console.error("Adding new Note has failed:", error);
            throw error;
        },
    });

    const { mutateAsync: useDeleteTheCustomerNote } = useMutation({
        mutationFn: async ({ customer_id, note_id }: { customer_id: string, note_id: number }) => {
            return await deleteTheCustomerNote(customer_id, note_id);
        },
        onSuccess: () => {
            console.log("Succeed deleted the Note");
        },
        onError: (error) => {
            console.error("Deleting the Note has failed:", error);
            throw error;
        },
    });

    const { mutateAsync: placeTheDraftNote } = useMutation({
        mutationFn: async ({ order_id, bodyNote }: { order_id: string, bodyNote: { title: string } }) => {
            return await putTheDraftNote(order_id, bodyNote);
        },
        onSuccess: () => {
            console.log("Succeed added new Note");
        },
        onError: (error) => {
            console.error("Adding new Note has failed:", error);
            throw error;
        },
    });

    const { mutateAsync: useDeleteTheDraftNote } = useMutation({
        mutationFn: async ({ order_id, note_id }: { order_id: string, note_id: number }) => {
            return await deleteTheDraftNote(order_id, note_id);
        },
        onSuccess: () => {
            console.log("Succeed deleted the Note");
        },
        onError: (error) => {
            console.error("Deleting the Note has failed:", error);
            throw error;
        },
    });

    return {
        placeTheCustomerNote,
        useDeleteTheCustomerNote,
        placeTheDraftNote,
        useDeleteTheDraftNote
    }
}

export function useGetTheCustomerNotesList(customer_id: string) {

    const { isLoading, isError, data: notesCustomerList, error } = useQuery({
        queryKey: ["customer-note", customer_id],
        queryFn: async ({ queryKey }) => {
            const customer_id = queryKey[1];
            const response = await getTheCustomerNotesList(customer_id);
            return response;
        },
        staleTime: 60000,
        enabled: !!customer_id,
    });
    return {
        isLoading,
        isError,
        notesCustomerList,
        error,
    }
}

export function useGetTheDraftNotesList(order_id: string) {

    const { isLoading, isError, data: notesDraftList, error } = useQuery({
        queryKey: ["draft-note", order_id],
        queryFn: async ({ queryKey }) => {
            const order_id = queryKey[1];
            const response = await getTheDraftNotesList(order_id);
            return response;
        },
        staleTime: 60000,
        enabled: !!order_id,
    });

    return {
        isLoading,
        isError,
        notesDraftList,
        error,
    }
}