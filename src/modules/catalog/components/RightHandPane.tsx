import CartComponent from "../components/CartComponent";
import Client from "../components/Client";
import { Button } from "@medusajs/ui";
import useCustomerQuery from "@/lib/hooks/customers/CustomerProvider";
import Customer from "@/modules/customers/components/Customer";
import { useNavigate } from "@tanstack/react-router";

export default function RightHandPane({ isClientSet, clientData, handleClickClient, deleteProduct }: { isClientSet: boolean, clientData: any, handleClickClient: (id: string) => void, deleteProduct: (uniqueId: number) => void }) {
    const { customersList, isLoading, isError, error } = useCustomerQuery();
    const navigate = useNavigate();

    return (
        <div className="flex-[1.2] border-b border-[rgba(206,206,206,1)] py-[10px] flex flex-col justify-between h-full">
            {isClientSet ? (
                <div className="cursor-pointer w-full border-b border-[rgba(206,206,206,1)] p-[5px_10px_5px_10px]">
                    <Client
                        first_name={clientData?.first_name}
                        last_name={clientData?.last_name}
                        email={clientData?.email}
                    />
                </div>
            ) : isLoading ? (
                <p className="ml-10px text-[14px]">Loading...</p>
            ) : isError ? (
                <p className="ml-10px text-[14px]">Error: {error?.message}</p>
            ) : customersList && customersList.length > 0 ? (
                <div className="flex flex-col justify-start items-center gap-[8px]">
                    {customersList.map((e) => (
                        <Customer
                            handleClick={handleClickClient}
                            name={e.first_name}
                            surname={e.last_name}
                            email={e.email}
                            key={e.id}
                            id={e.id}
                        />
                    ))}
                </div>
            ) : (
                <p className="ml-10px text-[14px]">No customers found.</p>
            )}
            <div className="border-[rgba(206,206,206,1)] min-h-[500px] max-h-[450px] flex flex-col justify-start items-start gap-[10px] w-full p-[10px_10px] overflow-y-scroll overflow-x-hidden">
                <CartComponent deleteProduct={deleteProduct} />
            </div>
            <div className="border-t border-[rgba(206,206,206,1)] flex flex-col justify-end items-start gap-[10px] w-full p-[20px_25px]">
                <div className="flex flex-row justify-between items-center w-full">
                    <p className="text-[14px] leading-[18.15px] font-semibold text-gray-400">Total:</p>
                    <p className="text-[14px] leading-[18.15px] font-semibold">CA Some price</p>
                </div>
                <Button className="w-full h-[55px] cursor-pointer" onClick={() => navigate({ to: "/checkout" })}>
                    Checkout
                </Button>
            </div>
        </div>
    );
}
