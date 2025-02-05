import { Button, Input } from "@medusajs/ui"
import { useState, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import type { ClientState } from "@/components/types/ClientState";
import NotesProvider, { useGetTheCustomerNotesList, useGetTheDraftNotesList } from "@/lib/hooks/notes/NotesProvider";
import Note from "./template/Note";

function NoteLayout() {
    const [note, setNote] = useState("");
    const queryClient = useQueryClient();
    const { placeTheCustomerNote, useDeleteTheCustomerNote, placeTheDraftNote, useDeleteTheDraftNote } = NotesProvider()
    const [client, setClient] = useState<ClientState>({
        isClientSet: false,
        clientData: null,
        draftOrder: false
    });

    useEffect(() => {
        const storedClient = localStorage.getItem("client");
        const draftOrder = localStorage.getItem("draftOrder");

        if (storedClient) {
            setClient({
                isClientSet: true,
                clientData: JSON.parse(storedClient),
                draftOrder: false,
            });
        } else if (draftOrder) {
            setClient({
                isClientSet: false,
                clientData: null,
                draftOrder: JSON.parse(draftOrder),
            });
        }
    }, []);

    const { notesCustomerList, isLoading, isError, error } = useGetTheCustomerNotesList(client.clientData?.id)
    const { notesDraftList, isLoading: isNotesDraftListLoading, isError: isNotesDraftListError, error: notesDraftListError } = useGetTheDraftNotesList(client.draftOrder?.id)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNote(e.target.value);
    };

    const handleSubmit = async (bodyNote: { title: string }) => {
        if (note.trim() === "") return;
        if (client.isClientSet) {
            await placeTheCustomerNote({
                customer_id: client.clientData.id,
                bodyNote: bodyNote
            });
            queryClient.invalidateQueries({ queryKey: ["customer-note"] })
        } else {
            await placeTheDraftNote({
                order_id: client.draftOrder.id,
                bodyNote: bodyNote
            });
            queryClient.invalidateQueries({ queryKey: ["draft-note"] })
        }
        setNote("")
    };
    const deleteNote = async (id: number) => {
        if (client.isClientSet) {
            await useDeleteTheCustomerNote({
                customer_id: client.clientData.id,
                note_id: id,
            })
            queryClient.invalidateQueries({ queryKey: ["customer-note"] })
        } else {
            await useDeleteTheDraftNote({
                order_id: client.draftOrder.id,
                note_id: id,
            })
            queryClient.invalidateQueries({ queryKey: ["draft-note"] })
        }
    }

    return (
        <>
            <header className="p-[15px] self-start border-b border-b-[rgba(206,206,206,1)]">
                <p className="text-[15px] text-gray-400">Order Notes</p>
            </header>
            <main className="flex flex-col flex-nowrap justify-center items-center gap-[20px] my-[20px]">
                <div className="flex flex-col flex-nowrap justify-center items-center gap-[10px]">
                    <Input type="text" placeholder="New Note..."
                        onChange={handleChange} value={note}
                        className="h-[50px] w-[400px]" />
                    <Button type="submit" className="btn-order-note"
                        onClick={() => handleSubmit({ title: note })}>
                        Submit
                    </Button>
                </div>
                <div className="flex flex-row flex-wrap justify-start items-center gap-[15px] self-start mx-[20px]">
                    {isLoading || isNotesDraftListLoading ? (
                        <p>Loading...</p>
                    ) : isError || isNotesDraftListError ? (
                        <p>Error: {error?.message || notesDraftListError?.message}</p>
                    ) : client.isClientSet ? (
                        notesCustomerList?.notes.map((note: any, index: any) => (
                            <Note id={note.id} key={index} note={note.title} deleteNote={deleteNote} />
                        ))
                    ) : (
                        notesDraftList?.notes.map((note: any, index: any) => (
                            <Note id={note.id} key={index} note={note.title} deleteNote={deleteNote} />
                        ))
                    )}
                </div>
            </main>
        </>
    );
}

export default NoteLayout;
