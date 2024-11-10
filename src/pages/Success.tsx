import { Link } from "react-router-dom";
import "../styles/success.css";

const Success = () => {
    return (
        <div className="success">
            <p>Sucesss!</p>
            <h1>Order No. 1 Placed</h1>
            <nav className="checkout-options">
                <ul className="checkout-options">
                    <li><Link to="/main" className="btn-option" id="continue">Back to main menu</Link></li>
                </ul>
            </nav>
        </div>
    );
};

export default Success;
