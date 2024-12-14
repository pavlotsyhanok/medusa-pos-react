import { Button, Container, Heading } from "@medusajs/ui";

const Note = (props: any) => {
    const { note, index, deleteNote, id } = props;
    return (
        <div>
            <Heading level="h3" className="text-[15px] text-gray-400 text-center">Notes {id + 1}</Heading>
            <Container key={index} id={id} className="h-[280px] w-[280px] flex flex-col flex-nowrap justify-between items-center" >
                <p>{note}</p>
                <Button type="submit" variant="danger" className="btn-order-note" onClick={() => deleteNote(id)}>Delete</Button>
            </Container>
        </div>
    );
}

export default Note;