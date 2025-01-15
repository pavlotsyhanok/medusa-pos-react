import { useState } from 'react';
import NavigationRaw from '@/components/NavigationRaw';
import stripeTerminals from '../../lib/data/stripeTerminals';
import StripeTerminals from './components/StripeTerminals';
import { useNavigate } from '@tanstack/react-router'
import { Button } from '@medusajs/ui';

const StripeTerminalsLayout = () => {
    const navigate = useNavigate();
    const [search, setSearch] = useState("");

    const searchEngine = (e: any) => {
        setSearch(e.target.value);
    };

    // const filteredTerminals = terminalQuery.data.filter((terminal) => {
    //     return terminal.name.toLowerCase().includes(search.toLowerCase());
    // });

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
