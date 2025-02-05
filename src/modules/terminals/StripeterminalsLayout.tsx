import NavigationRaw from '@/components/NavigationRaw';
import stripeTerminals from '../../lib/data/stripeTerminals';
import StripeTerminals from './components/StripeTerminals';
import { useNavigate } from '@tanstack/react-router'

const StripeTerminalsLayout = () => {
    const navigate = useNavigate();

    return (
        <>
            <NavigationRaw first={'Stripe Terminals →'} />
            <main className="flex flex-row flex-wrap justify-center items-start gap-[15px] px-[25px] h-[calc(100vh-100px)] border w-full ">
                {stripeTerminals.map((e: any) => (
                    <StripeTerminals key={e.id} name={e.name} selectTerminal={(e: any) => {
                        navigate({ to: "/store" })
                    }} />
                ))}
            </main>
        </>
    );
};
export default StripeTerminalsLayout;
