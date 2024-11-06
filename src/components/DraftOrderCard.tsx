export default function DraftOrderCard(props: any) {
    const { id, status, deleteOrder, changeOrder, email, price } = props;
    return (
        <li className="list-draft-orders">
            <div>
                <p>Draft-order ID: <b>{id}</b></p>
                <p>Draft-order email: <b>{email}</b></p>
                <p>Draft-order Status: <b>{status}</b></p>
                <p>Draft-order Price: <b>{price} $</b></p>
            </div>
            <div>
                <button className="btn-register" onClick={deleteOrder}>Delete</button>
                <button className="btn-register" onClick={changeOrder}>Change the Draft Order</button>
            </div>
        </li>
    );
}