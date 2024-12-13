import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Products from "../components/Products";
import Customer from "../components/Customer";
import { medusa } from "../lib/medusa-provider";
import { useEffect, useState } from "react";
import Product from "../components/Products";
import { ArrowDownLeftMini, PencilSquareSolid } from "@medusajs/icons";
import { Button, Container, Input } from "@medusajs/ui"

const ShoppingPanel = ({ client, disable, setClient, setEnable, newOrder, setDraftOrder }: { setDraftOrder: (newOrder: boolean) => void; newOrder: boolean; client: any; disable: boolean; setClient: any; setEnable: (enable: boolean) => void; }) => {
    const [search, setSearch] = useState("")
    const navigate = useNavigate();
    console.log(client);
    useEffect(() => {
        const storedClient = localStorage.getItem("client");
        if (storedClient) {
            setClient(JSON.parse(storedClient));
            setEnable(false);
        }
    }, [setClient, setEnable]);

    // Query for customers
    const { isLoading: customerIsLoading, isError: customerIsError, data: customersData, error: customerError, } = useQuery({
        queryKey: ["customer"],
        queryFn: async () => {
            const response = await medusa.admin.customers.list();
            return response.customers;
        },
    });

    // Query for products
    const { isLoading: productIsLoading, isError: productIsError, data: productQuery, error: productError, } = useQuery({
        queryKey: ["products"],
        queryFn: async () => {
            const response = await medusa.admin.products.list();
            return response.products;
        },
    });

    // Handle loading and error states for customers
    if (customerIsLoading) return <h1>Loading...</h1>;
    if (customerIsError) {
        const typedError = customerError as Error;
        return <div>Error: {typedError.message}</div>;
    }

    const filteredProducts = productQuery?.filter((product) => {
        const result = product.title?.toLowerCase();
        return result?.includes(search.toLowerCase())
    }) ?? [];

    // Update selectProduct to use the API-based draft order mutation
    function selectProduct(productId: string) {
        const selectedProduct = productQuery?.find((product: any) => product.id === productId);
        console.log(selectedProduct);
        if (!newOrder) {
            const updatedCart = client.cart.items ? [...client.cart.items, selectedProduct] : [selectedProduct];
            const orderLength = updatedCart.length;
            updatedCart[updatedCart.length - 1] = { ...selectedProduct, uniqueId: orderLength };

            setClient((prevInfo: any) => ({
                ...prevInfo,
                cart: {
                    ...prevInfo.cart,
                    items: updatedCart,
                }
            }));
        } else {
            const updatedCart = client.customerOrder ? [...client.customerOrder, selectedProduct] : [selectedProduct];
            const orderLength = updatedCart.length;
            updatedCart[updatedCart.length - 1] = { ...selectedProduct, uniqueId: orderLength };

            setClient((prevInfo: any) => ({
                ...prevInfo,
                customerOrder: updatedCart
            }));
        }

    }

    const calculatePrice = (items: any) => {
        return `$${(items / 100).toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        })}`;
    }

    // Handle client selection
    function handleClickClient(id: string) {
        const selectedClient = customersData?.find((customer: any) => customer.id === id);
        if (selectedClient) {
            const updatedClient = { ...selectedClient, customerOrder: [] };
            localStorage.setItem("client", JSON.stringify(updatedClient));
            setClient(updatedClient);
            setEnable(false);
            setDraftOrder(true);
        }
    }
    // Deleting Product from the Product Card
    function deleteProduct(uniqueId: any) {
        if (newOrder === true) {
            setClient((prevInfo: any) => {
                const updatedOrder = prevInfo.customerOrder.filter((product: any) => product.uniqueId !== uniqueId);
                return { ...prevInfo, customerOrder: updatedOrder };
            });
        } else {
            console.log(uniqueId);
            setClient((prevInfo: any) => {
                const updatedOrder = prevInfo.cart.items.filter((product: any) => product.id !== uniqueId);
                return { ...prevInfo, cart: { ...prevInfo.cart, items: updatedOrder } };
            });
        }
    }

    // navigate to Checkoout 
    const handleCheckout = async () => {
        navigate("/checkout");
    };

    //Search Product engine
    const searchEngine = (e: any) => {
        setSearch(e.target.value);
    };

    return (
        <div>
            <nav className="flex flex-row flex-nowrap justify-around items-center py-[25px] border-b border-[rgba(206,206,206,1)]">
                {!disable ? (
                    <Link className="flex flex-row flex-nowrap justify-center items-center text-black text-[14px]" to={".."} onClick={() => navigate(-1)}>
                        <ArrowDownLeftMini className="mr-[5px]" /> Main Menu
                    </Link>
                ) : (
                    <Link to={"/main"} className="flex flex-row justify-center items-center gap-[5px] text-grey-100"><ArrowDownLeftMini /> Main Menu</Link>
                )}
                <div className="flex flex-row justify-center items-center relative">
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
                {client.id ? (newOrder ?
                    <Link to="/customer-order-note" className="flex flex-row justify-center items-center gap-[5px] text-black text-[14px]">
                        Order Note <PencilSquareSolid />
                    </Link>
                    :
                    <Link to="/draft-order-note" className="flex flex-row justify-center items-center gap-[5px] text-black text-[14px]">
                        Order Note <PencilSquareSolid />
                    </Link>
                ) : (
                    <div className="flex flex-row justify-center items-center gap-[8px] text-gray-400 text-[14px] cursor-not-allowed">
                        Order Note <PencilSquareSolid />
                    </div>
                )}
            </nav>
            <main className="flex flex-row flex-nowrap align-content-start justify-around items-stretch gap-[0px]">
                <div className="flex-[2]">
                    <div className="border border-b-0 border-r-0 border-[rgba(206,206,206,1)] p-[15px] mt-[15px]">
                        <p className="text-[14px] text-gray-400">Main Category</p>
                    </div>
                    <div className="flex flex-wrap gap-[10px] py-[15px] border border-r-0 overflow-y-scroll min-h-[760px] max-[1618px]:[&::-webkit-scrollbar]:block max-[1618px]:[&::-webkit-scrollbar]:w-2 max-[1618px]:[&::-webkit-scrollbar-thumb]:bg-gray-400 max-[1618px]:[&::-webkit-scrollbar-track]:bg-gray-100">
                        {!disable ? (
                            productIsLoading ? (
                                <h2>Loading Products...</h2>
                            ) : productIsError ? (
                                <h2>Error Loading Product Cards: {(productError as Error).message}</h2>
                            ) : (
                                filteredProducts.length > 0 ? (
                                    filteredProducts?.map((product: any) => (
                                        <div className="flex justify-start items-center hover:cursor-pointer">
                                            <Product key={product.id}
                                                className={`h-full w-[230px] hover:cursor-pointer`}
                                                title={product.title}
                                                selectProduct={() => selectProduct(product.id)}
                                                image={product.thumbnail}
                                                classNameImage={`bg-non`}
                                                price={calculatePrice(product.variants[0].prices[0].amount)}
                                            />
                                        </div>
                                    ))
                                ) : (
                                    <p>No products found.</p>
                                )
                            )
                        ) : (
                            <div className="flex flex-col justify-center items-start border-b h-[50px] w-full">
                                <h2 className="text-[24px] font-semibold text-center ml-[15px]">Select the customer first</h2>
                            </div>
                        )}
                    </div>
                </div>
                <div className="flex-[1.2] border border-[rgba(206,206,206,1)] py-[10px] mt-[15px]">
                    <div>
                        {!disable ? (client.order === null ?
                            (<div>
                                <Container className="flex flex-row justify-between items-center cursor-pointer mb-[10px]">
                                    <div className="flex flex-col justify-start">
                                        <h2 className="text-[15px] leading-[18.15px] font-semibold text-start mb-[5px]">{client.cart.customer.first_name} {client.cart.customer.last_name} (Draft Order)</h2>
                                        <p className="text-[12px] leading-[14.52px] font-normal text-start">{client.cart.email}</p>
                                    </div>
                                </Container>
                                <div className="border-t min-h-[550px] max-h-[550px] flex flex-col justify-start items-start gap-[10px] w-full p-[10px_10px] overflow-y-scroll overflow-x-hidden [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-500 [&::-webkit-scrollbar-track]:bg-gray-200 [&::-webkit-scrollbar-thumb]:hover:bg-gray-600">
                                    {client.cart.items?.map((e: any) => (
                                        <div className="w-full h-[105px] relative">
                                            <Products
                                                className={`h-[105px] hover:cursor-pointer p-2 m-0 flex align-center justify-start gap-[15px] min-w-[335px]`}
                                                classNameImage={`w-[90px]`}
                                                title={e.title}
                                                image={e.thumbnail}
                                                price={e.unit_price ? calculatePrice(e.unit_price) : calculatePrice(e.variants[0].prices[0].amount)}
                                            />
                                            <Button
                                                onClick={() => deleteProduct(e.id)}
                                                variant="danger"
                                                className="absolute top-1/2 right-4 transform -translate-y-1/2 w-[60px] sm:w-[50px] md:w-[70px]"
                                            >
                                                Delete
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                                <div className="border-t border-[rgba(206,206,206,1)] flex flex-col justify-end items-start gap-[10px] w-full p-[20px_25px] h-full">
                                    <div className="flex flex-row justify-between items-center w-full">
                                        <p className="text-[14px] leading-[18.15px] font-semibold text-gray-400">Total:</p>
                                        <p className="text-[14px] leading-[18.15px] font-semibold">CA
                                            {calculatePrice(client.cart.items?.reduce((acc: any, item: any) => {
                                                if (item.unit_price) {
                                                    return acc + item.unit_price;
                                                } else {
                                                    return acc + item.variants[0].prices[0].amount;
                                                }
                                            }, 0))}
                                        </p>
                                    </div>
                                    <Button className="w-full h-[55px] cursor-pointer" onClick={handleCheckout}>Checkout</Button>
                                </div>
                            </div>
                            )
                            : (
                                <div className="h-full flex flex-col justify-start items-center gap-[10px]">
                                    <div className="cursor-pointer w-full  border-b border-[rgba(206,206,206,1)] p-[5px_10px_10px_10px]">
                                        <Container className="flex flex-row justify-between items-center cursor-pointer">
                                            <div className="flex flex-col justify-start">
                                                <h2 className="text-[15px] leading-[18.15px] font-semibold text-start mb-[5px]">{client.first_name} {client.last_name}</h2>
                                                <p className="text-[12px] leading-[14.52px] font-normal text-start">{client.email}</p>
                                            </div>
                                        </Container>
                                    </div>
                                    <div className="min-h-[550px] max-h-[550px] flex flex-col justify-start items-start gap-[10px] w-full p-[10px_10px] overflow-y-scroll overflow-x-hidden [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-500 [&::-webkit-scrollbar-track]:bg-gray-200 [&::-webkit-scrollbar-thumb]:hover:bg-gray-600">
                                        {client.customerOrder?.map((e: any) => (
                                            <div className="w-full h-[105px] relative">
                                                <Products
                                                    className={`h-[105px] hover:cursor-pointer p-2 m-0 flex align-center justify-start gap-[15px] min-w-[335px]`}
                                                    classNameImage={`w-[90px]`}
                                                    title={e.title}
                                                    image={e.thumbnail}
                                                    price={calculatePrice(e.variants[0].prices[0].amount)}
                                                />
                                                <Button
                                                    onClick={() => deleteProduct(e.uniqueId)}
                                                    variant="danger"
                                                    className="absolute top-1/2 right-4 transform -translate-y-1/2 w-[60px] sm:w-[50px] md:w-[70px]"
                                                >
                                                    Delete
                                                </Button>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="border-t border-[rgba(206,206,206,1)] flex flex-col justify-end items-start gap-[10px] w-full p-[20px_25px] h-full">
                                        <div className="flex flex-row justify-between items-center w-full">
                                            <p className="text-[14px] leading-[18.15px] font-semibold text-gray-400">Total:</p>
                                            <p className="text-[14px] leading-[18.15px] font-semibold">CA{calculatePrice(client.customerOrder?.reduce((acc: any, item: any) => acc + item.variants[0].prices[0].amount, 0) || 0)}</p>
                                        </div>
                                        <Button className="w-full h-[55px] cursor-pointer" onClick={handleCheckout}>Checkout</Button>
                                    </div>
                                </div>
                            )) : (
                            <div className="flex flex-col justify-start items-center gap-[8px]">
                                {customersData.map((e: any) => (
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
                        )
                        }
                    </div>
                </div>
            </main>
        </div>
    );
};
export default ShoppingPanel;