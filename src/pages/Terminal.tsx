import { Link, useNavigate } from 'react-router-dom';
import StripeTerminals from "../components/StripeTerminals";
import stripeTerminals from "../assets/stripeTerminals";
import { useQuery } from "@tanstack/react-query";
import { ArrowDownLeftMini } from '@medusajs/icons';
import { Input } from '@medusajs/ui';
import { useState } from 'react';

const Terminal = ({ setDetectTerminal }: { setDetectTerminal: (detectTerminal: string) => void }) => {
    const navigate = useNavigate();

    const [search, setSearch] = useState("");
    const searchEngine = (e: any) => {
        setSearch(e.target.value);
    };

    const terminalQuery = useQuery({
        queryKey: ["terminal"],
        queryFn: () => [...stripeTerminals],
    });

    if (terminalQuery.isLoading) return <h1 className="text-xl font-bold">Loading...</h1>
    if (terminalQuery.isError) return <pre className="text-red-500">{JSON.stringify(terminalQuery.error)}</pre>

    const filteredTerminals = terminalQuery.data.filter((terminal) => {
        return terminal.name.toLowerCase().includes(search.toLowerCase());
    });

    return (
        <div className="w-full p-0 m-0 text-center flex flex-col justify-start items-center">
            <nav className="w-full px-[25px] h-[80px] flex flex-row flex-nowrap justify-between items-center border">
                <Link className="flex flex-row flex-nowrap justify-center items-center text-black text-[14px]" to={".."} onClick={() => navigate(-1)}>
                    <ArrowDownLeftMini className="mr-[5px]" /> Go Back
                </Link>
                <div className="flex flex-row justify-center items-center flex-1">
                    <div className="relative w-[550px]">
                        <Input
                            className="w-full text-black rounded-[100px] pl-[35px] focus:text-black shadow-none bg-white focus:bg-white hover:bg-white"
                            placeholder="Search..."
                            id="search-input"
                            type="search"
                            onChange={searchEngine}
                            value={search}
                        />
                    </div>
                </div>
                <div className="w-[100px]"></div>
            </nav>
            <header className="p-[15px] self-start">
                <p className="text-[15px] text-gray-400">Connect Stripe Terminal</p>
            </header>
            <main className="flex flex-row flex-wrap justify-center items-start gap-[10px] px-[18px] h-[calc(100vh-100px)] border w-full ">
                {filteredTerminals.map((e) =>
                    <StripeTerminals
                        selectTerminal={(e: any) => {
                            setDetectTerminal(e.target.innerText);
                            navigate("/main")
                        }}
                        key={e.id}
                        name={e.name}
                    />
                )}
            </main>
        </div>
    );
};
export default Terminal;
