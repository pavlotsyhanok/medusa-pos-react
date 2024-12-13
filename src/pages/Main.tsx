import { Link } from 'react-router-dom';
import StripeTerminals from "../components/StripeTerminals"
import { medusa } from "../lib/medusa-provider";
import Cookies from "js-cookie";
import { Container, Heading } from '@medusajs/ui';
import { ArchiveBox, DocumentTextSolid, OpenRectArrowOut, Plus, Shopping, ShoppingBag, Users } from '@medusajs/icons';

const Main = ({ setEnable, setClient, detectTerminal, disable, setIsLogged, setDetectTerminal }: { setEnable: (disable: boolean) => void, setClient: any, detectTerminal: string, disable: boolean, setIsLogged: (isLogged: any) => void, setDetectTerminal: (detectTerminal: string) => void }) => {

    return (
        <div className="min-h-screen w-full p-0 m-0 text-center flex flex-col justify-start items-center">
            <header className="flex flex-col flex-wrap justify-center items-center">
                <Heading level="h1" className="text-[clamp(16px,4vw,20px)] font-semibold my-[clamp(20px,5vw,40px)]">Main Menu</Heading>
                <StripeTerminals name={detectTerminal} />
            </header>
            <nav className="flex flex-col flex-wrap justify-center items-center ">
                <ul className=" mt-[50px] w-[400px] gap-[5px] flex flex-row flex-wrap justify-center items-center p-0 px-2.5 md:flex-col">
                    {!disable ? (
                        <Link to="/shopping-panel" className="h-[60px] w-[370px]">
                            <Container className="flex flex-row justify-between items-center px-[30px]">
                                <li className="list-none">Continue Order</li>
                                <ShoppingBag />
                            </Container>
                        </Link>
                    ) : (
                        <Link to="#" className="h-[60px] w-[370px] cursor-not-allowed">
                            <Container className="flex flex-row justify-between items-center px-[30px]">
                                <li className="text-[#818181] list-none">Continue Order</li>
                                <ShoppingBag className="text-[#818181]" />
                            </Container>
                        </Link>
                    )}
                    <Link to="/terminal" className="h-[60px] w-[370px]">
                        <Container className="flex flex-row justify-between items-center px-[30px]">
                            <li className="list-none">Connect Terminal</li>
                            <ArchiveBox />
                        </Container>
                    </Link>
                    <Link to="/register-customer" className="h-[60px] w-[370px]">
                        <Container className="flex flex-row justify-between items-center px-[30px]">
                            <li className="list-none">Register New Customer</li>
                            <Plus />
                        </Container>
                    </Link>
                    <Link to="/new-order" className="h-[60px] w-[370px]">
                        <Container className="flex flex-row justify-between items-center px-[30px]">
                            <li className="list-none">Select Customer (new order)</li>
                            <Users />
                        </Container>
                    </Link>
                    <Link to="/shopping-panel" className="h-[60px] w-[370px]">
                        <Container className="flex flex-row justify-between items-center px-[30px]">
                            <li className="list-none">Browse Catalog</li>
                            <Shopping />
                        </Container>
                    </Link>
                    <Link to="/draft-orders" className="h-[60px] w-[370px]">
                        <Container className="flex flex-row justify-between items-center px-[30px]">
                            <li className="list-none">Draft Orders</li>
                            <DocumentTextSolid />
                        </Container>
                    </Link>
                    <Link
                        to="/login"
                        className="h-[60px] w-[370px] mt-[25px]"
                        onClick={() => {
                            setDetectTerminal("Please select the terminal");
                            setEnable(true);
                            setClient("");
                            setIsLogged(Cookies.remove("token"));
                            localStorage.clear();
                            medusa.admin.auth.deleteSession();
                        }}
                    >
                        <Container className="flex flex-row justify-between items-center px-[30px]">
                            <li className="list-none">Log Out</li>
                            <OpenRectArrowOut />
                        </Container>
                    </Link>
                </ul>
            </nav>
        </div>
    );
};
export default Main;
