const Note = (props: any) => {
    const { note, index, deleteNote, id } = props;
    return (
        <div key={index} id={id} className="list-draft-orders" >
            <p>{note}</p>
            <button type="submit" className="btn-order-note" onClick={() => deleteNote(id)}>Delete</button>
        </div>
    );
}

export default Note;