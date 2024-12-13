import { Container } from "@medusajs/ui";
import { Button } from "@medusajs/ui";
const Customer = (props: any) => {
    const name = props.name
    const surname = props.surname;
    const id = props.id;
    const email = props.email;


    return (
        <Container onClick={() => props.handleClick(id)} className="flex flex-row justify-between items-center cursor-pointer">
            <div className="flex flex-col justify-start">
                <h2 className="text-[15px] leading-[18.15px] font-semibold text-start">{name} {surname}</h2>
                <p className="text-[12px] leading-[14.52px] font-normal text-start">{email}</p>
            </div>
            <Button className="text-center h-[30px] w-[100px]">Select</Button>
        </Container>
    );
};

export default Customer;