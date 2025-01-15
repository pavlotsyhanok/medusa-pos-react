import { Button, Container } from '@medusajs/ui';

const StripeTerminals = (props: any) => {
    const { name, selectTerminal } = props

    return (
        <Container className="h-[120px] w-[400px] mt-[25px] cursor-pointer flex gap-[15px] flex-col items-center justify-center">
            <p>{name}</p>
            <Button onClick={selectTerminal} className="w-[100px] h-[35px] text-[14px]">
                Select
            </Button>
        </Container>
    );
}

export default StripeTerminals;