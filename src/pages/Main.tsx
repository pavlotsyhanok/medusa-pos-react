import { Link } from 'react-router-dom';

const Main = () => {
    return (
        <div>
            <h1>POS Application</h1>
            <nav>
                <ul>
                    <li><Link to="/new-order">New Order</Link></li>
                    <li><Link to="/register-customer">Register Customer</Link></li>
                    <li><Link to="/settings">Settings</Link></li>
                </ul>
            </nav>
        </div>
    );
};

export default Main;
