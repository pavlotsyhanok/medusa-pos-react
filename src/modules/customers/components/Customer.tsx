import { Avatar, Container } from "@medusajs/ui";
import { Button } from "@medusajs/ui";

const Customer = (props: any) => {
    const { name, surname, id, email } = props;

    return (
        <Container className="flex flex-row justify-between items-center cursor-pointer">
            <div className="flex flex-raw gap-4 justify-start">
                <Avatar fallback={name[0].toUpperCase() || surname[0].toUpperCase() || email[0].toUpperCase() || "?"} />
                <div>
                    <h2 className="text-[15px] leading-[18.15px] font-semibold text-start">{name} {surname}</h2>
                    <p className="text-[12px] leading-[14.52px] font-normal text-start">{email}</p>
                </div>
            </div>
            <Button onClick={() => props.handleClick(id)} className="text-center h-[30px] w-[100px]">Select</Button>
        </Container>
    );
};

export default Customer;