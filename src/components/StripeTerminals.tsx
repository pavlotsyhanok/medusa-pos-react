import { Container } from '@medusajs/ui';

const StripeTerminals = (props: any) => {
    const name = props.name;
    const selectTerminal = props.selectTerminal;

    return (
        <Container onClick={selectTerminal} className="h-[60px] w-[370px] mt-[25px] cursor-pointer">
            <p>{name}</p>
        </Container>
    )
}

export default StripeTerminals;