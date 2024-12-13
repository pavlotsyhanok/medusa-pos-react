import { Button } from "@medusajs/ui";
import { useNavigate } from "react-router-dom";

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
        <div className="flex flex-col flex-nowrap justify-center items-center gap-[20px]">
            <p>Sucesss!</p>
            <h1>Order No. 1 Placed</h1>
            <nav>
                <Button onClick={restart} className="btn-option" id="continue" color="primary">
                    Back to main menu
                </Button>
            </nav>
        </div>
    );
};

export default Success;
