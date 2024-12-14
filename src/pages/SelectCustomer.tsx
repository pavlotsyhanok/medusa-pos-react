import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Customer from "../components/Customer";
import { useQuery } from "@tanstack/react-query";
import { medusa } from "../lib/medusa-provider";
import { Input } from "@medusajs/ui";
import { ArrowDownLeftMini, Plus } from "@medusajs/icons";


const SelectCustomer = ({ setClient, setEnable, setDraftOrder }: { setDraftOrder: (newOrder: boolean) => void; setClient: any, setEnable: (enable: boolean) => void }) => {
    const navigate = useNavigate();

    const [searchQuery, setSearchQuery] = useState("");

    // Fetch customers from Medusa API
    const { isLoading, isError, data, error } = useQuery({
        queryKey: ['customer'],
        queryFn: async () => {
            const response = await medusa.admin.customers.list();
            return response.customers;
        },
        staleTime: 60000,
    });

    if (isLoading) return <h1>Loading...</h1>;
    if (isError) {
        const typedError = error as Error;
        return <pre>Error:{typedError.message}</pre>
    }

    // Filter customers based on search query (name or email)
    const filteredCustomers = data?.filter((customer: any) => {
        const fullName = `${customer.first_name} ${customer.last_name}`.toLowerCase();
        const email = customer.email.toLowerCase();
        const query = searchQuery.toLowerCase();
        return fullName.includes(query) || email.includes(query);
    });

    function handleClick(id: string) {
        setClient(data?.find((client: any) => client.id === id));
        setEnable(false);
        setDraftOrder(true);
        navigate('/shopping-panel');
    }

    const handleSearchChange = (e: any) => {
        setSearchQuery(e.target.value);
    };

    return (
        <div>
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
                            value={searchQuery}
                            onChange={handleSearchChange}
                        />
                    </div>
                </div>
                <Link className="flex flex-row flex-nowrap justify-center items-center text-black text-[14px] w-[120px]" to={"/register-customer"}>
                    New Customer <Plus className="ml-[5px]" />
                </Link>
            </nav>
            <header className="p-[15px] self-start border">
                <p className="text-[15px] text-gray-400">New Order → Select Customer</p>
            </header>
            <main className='my-[25px] flex flex-col flex-nowrap justify-center items-center gap-[1px]'>
                {filteredCustomers?.length > 0 ? (
                    filteredCustomers.map((customer: any) => (
                        <div className="h-[90px] w-[400px] flex flex-row flex-nowrap justify-center items-center" key={customer.id}>
                            <Customer
                                email={customer.email}
                                handleClick={handleClick}
                                name={customer.first_name}
                                surname={customer.last_name}
                                key={customer.id}
                                id={customer.id}
                            />
                        </div>
                    ))
                ) : (
                    <p>No customers found.</p>
                )}
            </main>
        </div>
    );
};
export default SelectCustomer;
