import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Customer from "../components/Customer";
import { useQuery } from "@tanstack/react-query";
import { medusa } from "../lib/medusa-provider";
import "../styles/selectCustome.css";


const SelectCustomer = ({ setClient, setEnable, setDraftOrder }: { setDraftOrder: (newOrder: boolean) => void; setClient: any, setEnable: (enable: boolean) => void }) => {
    const navigate = useNavigate();

    const [searchQuery, setSearchQuery] = useState("");

    // Fetch customers from Medusa API
    const { isLoading, isError, data, error } = useQuery({
        queryKey: ['customer'],
        queryFn: async () => {
            const response = await medusa.admin.customers.list();
            console.log(response.customers)
            return response.customers;
        },
        staleTime: 60000, // 1 minute
        // cacheTime: 300000, // 5 minutes
    });

    if (isLoading) return <h1>Loading...</h1>;
    if (isError) {
        const typedError = error as Error;
        return <pre>Error:{typedError.message}</pre>
    }

    // Filter customers based on search query
    const filteredCustomers = data?.filter((customer: any) => {
        const fullName = `${customer.first_name} ${customer.last_name}`.toLowerCase();
        return fullName.includes(searchQuery.toLowerCase());
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
            <header>
                <h1 className='page-name'>New Order → Select Customer</h1>
            </header>
            <nav className='back-menu'>
                <Link to='..' onClick={() => navigate(-1)}>← Back to Menu</Link>
            </nav>
            <main className='select-customer-menu'>
                <div className='search-bar'>
                    <p>Search</p>
                    <input type="text"
                        placeholder="Search Customer Name"
                        value={searchQuery}
                        onChange={handleSearchChange} />
                </div>
                <div className='search-results'>
                    <p>Search Results</p>
                    <div className='customer-results'>
                        {filteredCustomers?.length > 0 ? (
                            filteredCustomers.map((customer: any) => (
                                <Customer
                                    handleClick={handleClick}
                                    name={customer.first_name}
                                    surname={customer.last_name}
                                    key={customer.id}
                                    id={customer.id}
                                />
                            ))
                        ) : (
                            <p>No customers found.</p>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};
export default SelectCustomer;
