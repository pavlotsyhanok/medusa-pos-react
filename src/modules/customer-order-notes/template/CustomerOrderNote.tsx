import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import Note from "../../../components/Notes";
import { ArrowDownLeftMini } from "@medusajs/icons";
import { Button, Input } from "@medusajs/ui";
const OrderNote = ({ setClient, client, setEnable }: { setDraftOrder: (newOrder: boolean) => void; newOrder: boolean; setEnable: any, client: any, setClient: (client: any) => void }) => {
    const navigate = useNavigate();
    const [note, setNote] = useState("");
    const queryClient = useQueryClient();

    useEffect(() => {
        const storedClient = localStorage.getItem("client");
        if (storedClient) {
            setClient(JSON.parse(storedClient));
            setEnable(false);
        }
    }, [setClient, setEnable]);

    const { isLoading: draftsIsLoading, isError: draftsIsError, data: draftsData, error: draftsError } = useQuery(
        ["notes", client?.id],
        async () => {
            if (!client?.id) throw new Error("Client ID is not defined");
            const response = await fetch(`http://localhost:9000/admin/custom/customer/${client.id}`, {
                method: "GET",
                credentials: 'include',
            });
            if (!response.ok) {
                throw new Error("Failed to fetch data");
            }
            return response.json();
        }
    );

    const submitNoteMutation = useMutation({
        mutationFn: async (bodyNote: { title: string }) => {
            const response = await fetch(`http://localhost:9000/admin/custom/customer/${client.id}`, {
                method: "PUT",
                credentials: "include",
                body: JSON.stringify({ bodyNote }),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Failed to add note: ${errorText}`);
            }
            return response.json();
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries(["notes", client.id]);
            setNote("");
            console.log("Note added:", data);
        },
    });
    const deleteNotes = useMutation({
        mutationFn: async (noteId) => {
            const response = await fetch(`http://localhost:9000/admin/custom/customer/${client.id}`, {
                method: "DELETE",
                body: JSON.stringify({ noteId }),
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: 'include',
            });
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Failed to delete note: ${errorText}`);
            }

            return response.json();
        },
        onSuccess: ((data) => {
            queryClient.invalidateQueries({ queryKey: ["notes", client.id] });
            console.log("Note Deleted:", data);
        }),
        onError: (error) => {
            console.error("Error deleting note:", error);
        }
    });
    if (draftsIsLoading) return <h1>Loading...</h1>;
    if (draftsIsError) {
        const typedError = draftsError as Error;
        return <div>Error: {typedError.message}</div>;
    }

    // Handlers for note input and submission
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNote(e.target.value);
    };

    const handleSubmit = (bodyNote: { title: string }) => {
        if (note.trim() === "") return;
        submitNoteMutation.mutate(bodyNote);
    };
    const deleteNote = (noteId: any) => {
        deleteNotes.mutate(noteId);
    }

    return (
        <>
            <nav className="w-full px-[25px] h-[80px] flex flex-row flex-nowrap justify-between items-center border">
                <Link className="flex flex-row flex-nowrap justify-center items-center text-black text-[14px]" to={".."} onClick={() => navigate(-1)}>
                    <ArrowDownLeftMini className="mr-[5px]" /> Back to Catalog
                </Link>
            </nav>
            <header className="p-[15px] self-start border-b border-b-[rgba(206,206,206,1)]">
                <p className="text-[15px] text-gray-400">Customer Notes</p>
            </header>
            <main className="flex flex-col flex-nowrap justify-center items-center gap-[20px] my-[20px]">
                <div className="flex flex-col flex-nowrap justify-center items-center gap-[10px]">
                    <Input type="text" placeholder="New Note..." onChange={handleChange} value={note} className="h-[50px] w-[400px]" />
                    <Button type="submit" className="btn-order-note" onClick={() => handleSubmit({ title: note })}>Submit</Button>
                </div>
                <div className="flex flex-row flex-wrap justify-start items-center gap-[15px] self-start mx-[20px]">
                    {draftsData?.notes.map((e: any, index: any) => (
                        <Note id={index} key={index} note={e.title} deleteNote={deleteNote} />
                    ))}
                </div>
            </main>
        </>
    );
};

export default OrderNote;