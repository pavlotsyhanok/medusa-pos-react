import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Products from "../components/Products";
import Customer from "../components/Customer";
import { medusa } from "../lib/medusa-provider";
import { useEffect, useState } from "react";
import "../styles/shoppingPanel.css";
import Product from "../components/Products";

const ShoppingPanel = ({ client, disable, setClient, setEnable, newOrder, setDraftOrder }: { setDraftOrder: (newOrder: boolean) => void; newOrder: boolean; client: any; disable: boolean; setClient: any; setEnable: (enable: boolean) => void; }) => {
    const [search, setSearch] = useState("")
    const navigate = useNavigate();
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
    //Updating Draft Order to use the API-based draft order POST request
    const updateDraftOrder = async (draftOrderId: string) => {
        try {
            // Retrieve the current draft order
            const response = await medusa.admin.draftOrders.retrieve(draftOrderId);
            const currentItems = response.draft_order.cart.items;

            // Remove each existing line item
            for (const item of currentItems) {
                try {
                    await medusa.admin.draftOrders.removeLineItem(draftOrderId, item.id);
                    console.log(`Removed item with ID: ${item.id}`);
                } catch (error) {
                    break
                }
            }

            const itemsToAdd = client.cart.items.map((product: any) => {
                let unitPrice;

                if (product.total) {
                    unitPrice = product.total;
                } else if (product.variants[0]?.prices[0]?.amount) {
                    unitPrice = product.variants[0].prices[0].amount;
                }
                return {
                    variant_id: product.id,
                    title: product.title,
                    quantity: 1,
                    unit_price: unitPrice,
                };
            });

            for (const item of itemsToAdd) {
                try {
                    await medusa.admin.draftOrders.addLineItem(draftOrderId, {
                        variant_id: item.product_id,
                        title: item.title,
                        unit_price: item.unit_price,
                        quantity: item.quantity,
                    }).then((response) => console.log(response));
                    console.log(`Added item with variant ID: ${item.variant_id}`);
                } catch (error) {
                    console.error(`Failed to add item with variant ID ${item.variant_id}:, error`);
                }
            }
            console.log('Draft order updated successfully.');
        } catch (error) {
            console.error('Error updating draft order:', error);
        }
        navigate("/draft-orders")
    };

    return (
        <div>
            <header>
                <h1 className="page-name">Shopping Panel</h1>
            </header>
            <nav className="back-menu shopping-nav-bar">
                {!disable ? (
                    <Link to={".."} onClick={() => navigate(-1)}>
                        ← Back to Menu
                    </Link>
                ) : (
                    <Link to={"/main"}>← Back to Menu</Link>
                )}
                <div className="search-bar">
                    <p>🔎 Search Product</p>
                    <input type="text" placeholder="Search Product..." onChange={searchEngine} value={search} />
                </div>
                {!disable && newOrder ? (
                    <Link to="/order-note">
                        <li>📝 Order Note</li>
                    </Link>
                ) : (
                    <Link to="#" id="disable">
                        <li id="disable">📝 Order Note</li>
                    </Link>
                )}
            </nav>
            <main className="main-panel">
                <div className="panel-left-side">
                    <div className="search-bar">
                        <p>Breadcrumbs</p>
                        <div className="categories">
                            <Link to="">Main Category</Link>
                            <Link to="">Category 1</Link>
                        </div>
                    </div>
                    <div className="search-bar">
                        <p>📦 Product Browser</p>
                        <div className="product-container">
                            {!disable ? (
                                productIsLoading ? (
                                    <h2>Loading Products...</h2>
                                ) : productIsError ? (
                                    <h2>Error Loading Product Cards: {(productError as Error).message}</h2>
                                ) : (
                                    filteredProducts.length > 0 ? (
                                        filteredProducts?.map((product: any) => (
                                            <Product key={product.id} title={product.title} selectProduct={() => selectProduct(product.id)} />
                                        ))
                                    ) : (
                                        <p>No products found.</p>
                                    )
                                )
                            ) : (
                                <h2>Select the customer first</h2>
                            )}
                        </div>
                    </div>
                </div>
                <div className="panel-right-side">
                    <div className="search-bar">
                        <p>🛒 Cart</p>

                        {!disable ? (client.order === null ? (
                            <div className="summery">
                                <div className="summery-customer">
                                    <h2>🗂️ Managing draft order for {client.cart.customer.first_name} {client.cart.customer.last_name}</h2>
                                </div>
                                <div className="panel-product">
                                    {client.cart.items?.map((e: any) => (
                                        <Products
                                            key={e.id}
                                            title={e.title}
                                            selectProduct={() => deleteProduct(e.id)}
                                        />
                                    ))}
                                </div>
                                <div className="panel-product">
                                    <div className="cart-totals">
                                        <p>Cart Totals</p>
                                    </div>
                                </div>
                                <button className="btn-checkout" onClick={() => updateDraftOrder(client.id)}>Update Draft Order</button>
                            </div>
                        ) : (
                            <div className="summery">
                                <div className="summery-customer">
                                    <h2>
                                        👨 Customer is {client.first_name} {client.last_name}
                                    </h2>
                                </div>
                                <div className="panel-product">
                                    {client.customerOrder?.map((e: any) => (
                                        <Products
                                            key={e.id}
                                            title={e.title}
                                            selectProduct={() => deleteProduct(e.uniqueId)}
                                        />
                                    ))}
                                </div>
                                <div className="panel-product">
                                    <div className="cart-totals">
                                        <p>Cart Totals</p>
                                    </div>
                                </div>
                                <button className="btn-checkout" onClick={handleCheckout}>Checkout</button>
                            </div>

                        )) : (
                            <div className="summery">
                                <div className="customer-results shopping-cart">
                                    {customersData.map((e: any) => (
                                        <Customer
                                            handleClick={handleClickClient}
                                            name={e.first_name}
                                            surname={e.last_name}
                                            key={e.id}
                                            id={e.id}
                                        />
                                    ))}
                                </div>
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