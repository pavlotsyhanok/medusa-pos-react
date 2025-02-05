import { useEffect } from "react";
import NavigationRaw from "@/components/NavigationRaw";
import useCustomerQuery from "@/lib/hooks/customers/CustomerProvider";
import Customer from "./components/Customer";
import { useNavigate } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";

const CustomersLayout = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    useEffect(() => {
        queryClient.invalidateQueries({ queryKey: ["customer"], exact: true });
    }, [queryClient]);

    const { customersList, isLoading, isError, error } = useCustomerQuery()

    function handleClick(id: string) {
        const clientData = (customersList?.find((client: any) => client.id === id));
        localStorage.setItem("client", JSON.stringify(clientData));
        localStorage.removeItem('draftOrder');
        navigate({ to: "/catalog" })
    }

    return (
        <div>
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
            </main>
        </div>
    );
};
export default CustomersLayout;
