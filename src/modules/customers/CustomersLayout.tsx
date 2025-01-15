import { useState } from "react";
import NavigationRaw from "@/components/NavigationRaw";
import useCustomerQuery from "@/lib/hooks/customers/CustomerProvider";
import Customer from "./components/Customer";
import { useNavigate } from "@tanstack/react-router";


const CustomersLayout = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");
    const { customersList, isLoading, isError, error } = useCustomerQuery()


    // Filter customers based on search query (name or email)
    // const filteredCustomers = data?.filter((customer: any) => {
    //     const fullName = `${customer.first_name} ${customer.last_name}`.toLowerCase();
    //     const email = customer.email.toLowerCase();
    //     const query = searchQuery.toLowerCase();
    //     return fullName.includes(query) || email.includes(query);
    // });

    function handleClick(id: string) {
        const clientData = (customersList?.find((client: any) => client.id === id));
        localStorage.setItem("client", JSON.stringify(clientData));
        navigate({ to: "/catalog" })
    }

    const handleSearchChange = (e: any) => {
        setSearchQuery(e.target.value);
    };

    return (
        <div>
            {/* value={searchQuery}
             onChange={handleSearchChange} */}
            <NavigationRaw first={'New Order →'} second={"Select Customer →"} />
            <main className='my-[25px] flex flex-col flex-nowrap justify-center items-center gap-[10px]'>
                {isLoading ? (
                    <p>Loading...</p>
                ) : isError ? (
                    <p>Error: {error?.message}</p>
                ) : customersList && customersList.length > 0 ? (
                    customersList?.map((customer) => (
                        <Customer name={customer.first_name} surname={customer.last_name} id={customer.id} key={customer.id} email={customer.email} handleClick={handleClick} />
                    ))
                ) : (
                    <p>No customers found.</p>
                )}
                {/* {filteredCustomers?.length > 0 ? (
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
                ) : ( */}
                {/* )} */}
            </main>
        </div>
    );
};
export default CustomersLayout;
