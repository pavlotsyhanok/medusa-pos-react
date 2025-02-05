import { useAuthQuery } from "@/lib/hooks/auth/AuthProvider";
import HeaderAvatar from "./components/HeaderAvatar";
import { PencilSquareSolid, ArrowDownLeftMini, User, PlusMini } from "@medusajs/icons";
import { Link, useLocation } from "@tanstack/react-router";
import NavigationConfig from "@/components/types/NavigationConfig";
import { useState, useEffect } from "react";
import useProductQuery from "@/lib/hooks/products/ProductProvider";
import ProductSearchPrompt from "./functions/ProductSearchPrompt";
import type { ClientState } from "@/components/types/ClientState";

const navigationConfig: NavigationConfig = {
    "/orderNote": {
        label: "Back to Catalog",
        link: "/catalog",
        showInput: false,
        icon: <ArrowDownLeftMini className="mx-[5px]" />,
    },
    "/catalog": {
        label: "Order Note",
        link: "/orderNote",
        showInput: true,
        icon: <PencilSquareSolid className="mx-[5px]" />,
    },
    "/new-customer": {
        label: "Existing Customers",
        link: "/customers",
        showInput: false,
        icon: <User className="mx-[5px]" />,
    },
    "/customers": {
        label: "New Customer",
        link: "/new-customer",
        showInput: false,
        icon: <PlusMini className="w-[20px]" />,
    },
    "/orders": {
        label: "Go Back",
        link: "..",
        showInput: false,
        icon: <ArrowDownLeftMini className="mr-[5px]" />,
    },
    "/stripe-terminals": {
        label: "Go Back",
        link: "..",
        showInput: false,
        icon: <ArrowDownLeftMini className="mr-[5px]" />,
    },
    "/checkout": {
        label: "Go Back",
        link: "..",
        showInput: false,
        icon: <ArrowDownLeftMini className="mr-[5px]" />,
    },
    "/payment-section": {
        label: "Go Back",
        link: "..",
        showInput: false,
        icon: <ArrowDownLeftMini className="mr-[5px]" />,
    },
    // Add more configurations as needed
};

export default function CataLogHeaderLayout() {
    const { user, userLoading } = useAuthQuery();
    const location = useLocation();
    const { productsList } = useProductQuery();

    const [client, setClient] = useState<ClientState>({
        isClientSet: false,
        clientData: null,
        draftOrder: false,
    });


    useEffect(() => {
        const storedClient = localStorage.getItem("client");
        const draftOrder = localStorage.getItem("draftOrder");

        if (storedClient) {
            setClient({
                isClientSet: true,
                clientData: JSON.parse(storedClient),
                draftOrder: false,
            });
        } else if (draftOrder) {
            setClient({
                isClientSet: true,
                clientData: null,
                draftOrder: JSON.parse(draftOrder),
            });
        }
    }, []);

    if (userLoading) {
        return <div />;
    }

    if (!user) {
        return null;
    }

    const currentPath = Object.keys(navigationConfig).find((path) =>
        location.pathname.includes(path)
    );

    const navigation = currentPath ? navigationConfig[currentPath] : null;

    const selectProduct = (productId: string) => {
        const selectedProduct = productsList?.find((product: any) => product.id === productId);
        if (!selectedProduct) return;

        if (!client.draftOrder) {
            // When there is an existing customer order:
            if (client.clientData?.customerOrder) {
                const productIndex = client.clientData.customerOrder.findIndex(
                    (product: any) => product.id === selectedProduct.id
                );

                if (productIndex > -1) {
                    // Use a functional update to get the latest state.
                    setClient((prevClient) => {
                        const updatedCart = [...(prevClient.clientData?.customerOrder || [])];
                        updatedCart[productIndex] = {
                            ...updatedCart[productIndex],
                            quantity: (updatedCart[productIndex].quantity || 1) + 1,
                        };
                        const updatedClient = {
                            ...prevClient,
                            clientData: {
                                ...prevClient.clientData,
                                customerOrder: updatedCart,
                            },
                            draftOrder: false,
                        };
                        // Persist the new cart in localStorage.
                        localStorage.setItem("client", JSON.stringify(updatedClient.clientData));
                        return updatedClient;
                    });
                } else {
                    // Add the product if it does not exist.
                    setClient((prevClient) => {
                        const existingCart = prevClient.clientData?.customerOrder || [];
                        const updatedCart = [
                            ...existingCart,
                            { ...selectedProduct, quantity: 1, uniqueId: existingCart.length + 1 },
                        ];
                        const updatedClient = {
                            ...prevClient,
                            clientData: {
                                ...prevClient.clientData,
                                customerOrder: updatedCart,
                            },
                            draftOrder: false,
                        };
                        localStorage.setItem("client", JSON.stringify(updatedClient.clientData));
                        return updatedClient;
                    });
                }
            } else {
                // No customerOrder exists; create one.
                const updatedCart = [{ ...selectedProduct, quantity: 1, uniqueId: 1 }];
                setClient((prevClient) => {
                    const updatedClient = {
                        ...prevClient,
                        clientData: {
                            ...prevClient.clientData,
                            customerOrder: updatedCart,
                        },
                        draftOrder: false,
                    };
                    localStorage.setItem("client", JSON.stringify(updatedClient.clientData));
                    return updatedClient;
                });
            }
        } else {
            // Handle the draft order case.
            setClient((prevClient) => {
                const currentItems = prevClient.draftOrder?.items || [];
                const productIndex = currentItems.findIndex(
                    (product: any) => product.id === selectedProduct.id
                );
                let updatedCart;
                if (productIndex > -1) {
                    updatedCart = [...currentItems];
                    updatedCart[productIndex] = {
                        ...updatedCart[productIndex],
                        quantity: (updatedCart[productIndex].quantity || 1) + 1,
                    };
                } else {
                    updatedCart = [
                        ...currentItems,
                        { ...selectedProduct, quantity: 1, uniqueId: currentItems.length + 1 },
                    ];
                }
                const updatedClient = {
                    ...prevClient,
                    draftOrder: {
                        ...prevClient.draftOrder,
                        items: updatedCart,
                    },
                };
                localStorage.setItem("draftOrder", JSON.stringify(updatedClient.draftOrder));
                return updatedClient;
            });
        }
    };

    return (
        <div className="flex justify-between items-center">
            <HeaderAvatar user={user} />
            {navigation && (
                <>
                    {navigation.showInput && (
                        <div className="relative w-[550px] mx-[10px] min-w-[160px]">
                            <ProductSearchPrompt selectProduct={selectProduct} />
                        </div>
                    )}
                    <Link
                        to={navigation.link}
                        className="flex flex-row justify-center items-center gap-[5px]"
                    >
                        <div className="flex flex-row justify-center items-center gap-[5px] text-[14px]">
                            {navigation.label} {navigation.icon}
                        </div>
                    </Link>
                </>
            )}
        </div>
    );
}
