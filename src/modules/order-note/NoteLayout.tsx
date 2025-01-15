import { Button, Input } from "@medusajs/ui"

function NoteLayout() {
    return (
        <>
            <header className="p-[15px] self-start border-b border-b-[rgba(206,206,206,1)]">
                <p className="text-[15px] text-gray-400">Order Notes</p>
            </header>
            <main className="flex flex-col flex-nowrap justify-center items-center gap-[20px] my-[20px]">
                <div className="flex flex-col flex-nowrap justify-center items-center gap-[10px]">
                    <Input type="text" placeholder="New Note..."
                        // onChange={handleChange} value={note} 
                        className="h-[50px] w-[400px]" />
                    <Button type="submit" className="btn-order-note"
                    // onClick={() => handleSubmit({ title: note })}
                    >
                        Submit
                    </Button>
                </div>
                <div className="flex flex-row flex-wrap justify-start items-center gap-[15px] self-start mx-[20px]">
                    {/* {draftsData?.notes.map((e: any, index: any) => (
                        <Note id={index} key={index} note={e.title} deleteNote={deleteNote} />
                    ))} */}
                </div>
            </main>
        </>
    );
}

export default NoteLayout;
