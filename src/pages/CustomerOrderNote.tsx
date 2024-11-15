import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import Note from "../components/Notes";
import "../styles/OrderNote.css";

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
            <header>
                <h1 className='page-name'>Product Page</h1>
            </header>
            <nav className='back-menu back-checkout'>
                <Link to={".."} onClick={() => navigate(-1)}>← Back to Catalog</Link>
            </nav>
            <main className="order-note">
                <div className="input-note">
                    <input type="text" placeholder="Order Notes" onChange={handleChange} value={note} />
                    <button type="submit" className="btn-order-note" onClick={() => handleSubmit({ title: note })}>Submit</button>
                </div>
                <div className="notes">
                    <ul>
                        {draftsData?.notes.map((e: any, index: any) => (
                            <Note id={index} key={index} note={e.title} deleteNote={deleteNote} />
                        ))}
                    </ul>
                </div>
            </main>
        </>
    );
};

export default OrderNote;