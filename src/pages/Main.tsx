import { Link } from 'react-router-dom';
import StripeTerminals from "../components/StripeTerminals"
import { medusa } from "../lib/medusa-provider";
import Cookies from "js-cookie";
import "../styles/main.css"

const Main = ({ setEnable, setClient, detectTerminal, disable, setIsLogged }: { setEnable: (disable: boolean) => void, setClient: any, detectTerminal: string, disable: boolean, setIsLogged: (isLogged: any) => void }) => {

    return (
        <div className="main-page">
            <header>
                <h1 className="page-name"> Main Menu</h1>
                <StripeTerminals name={detectTerminal} />
            </header>
            <nav>
                <ul>
                    {!disable ? (<Link to="/shopping-panel"><li>Continue Order</li></Link>) : (<Link to="#" id="disable"><li id="disable">Continue Order</li></Link>)}
                    <Link to="/register-customer"><li>Register New Customer</li></Link>
                    <Link to="/terminal"><li>Connect Terminal</li></Link>
                    <Link to="/new-order"><li>Select Customer (new order)</li></Link>
                    <Link to="/shopping-panel"><li>Browse Catalog</li></Link>
                    <Link className="color" to="/login" onClick={() => {
                        setEnable(true);
                        setClient("");
                        setIsLogged(Cookies.remove("token"));
                        localStorage.clear();
                        medusa.admin.auth.deleteSession();
                    }}><li>Log Out</li></Link>
                    <Link to="/draft-orders"><li>Draft Orders</li></Link>
                </ul>
            </nav>
        </div>
    );
};
export default Main;
