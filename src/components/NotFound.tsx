import { Button, Heading } from "@medusajs/ui";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col flex-nowrap justify-center items-center gap-[20px] my-[20px]">
            <Heading level="h1">Page Not Found</Heading>
            <Button onClick={() => { navigate("/main"); }}>
                Go Back To Home Page
            </Button>
        </div>
    );
};
export default NotFound;