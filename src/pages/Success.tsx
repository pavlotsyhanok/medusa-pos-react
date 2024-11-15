import { useNavigate } from "react-router-dom";
import "../styles/success.css";

const Success = ({ setEnable, setClient }: { setEnable: any, setClient: any }) => {
    const navigate = useNavigate();

    const restart = () => {
        setEnable(true);
        setClient("");
        navigate("/main");
        localStorage.clear();
        localStorage.removeItem("cart_id");
    }
    return (
        <div className="success">
            <p>Sucesss!</p>
            <h1>Order No. 1 Placed</h1>
            <nav className="checkout-options">
                <ul className="checkout-options">
                    <li><button onClick={restart} className="btn-option" id="continue">Back to main menu</button></li>
                </ul>
            </nav>
        </div>
    );
};

export default Success;
