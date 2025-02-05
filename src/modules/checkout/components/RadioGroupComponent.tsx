import { Button, RadioGroup, Label, Container } from "@medusajs/ui";
import { useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import type { ClientState } from "@/components/types/ClientState";
import { draftOrderProvider, useDeleteDraftItemsProvider, useAddDraftItemsProvider, useConfirmDraftItemsProvider, useCreateEditDraftItemsProvider, useDraftOrderQuery, useUpdateItemQuantity } from "@/lib/hooks/draft-order/DraftOrderProvider";
import medusaClient from "@/lib/utils/axios.config";
import getRegionsId from "@/lib/functions/getRegionsId";
import { useQueryClient } from "@tanstack/react-query";

export default function RadioGroupComponent() {

    const queryDraftOrder = useQueryClient();
    const navigate = useNavigate();

    const [select, setSelect] = useState(4);
    const [isloading, setIsLoading] = useState(false);
    const [client, setClient] = useState<ClientState>({
        isClientSet: false,
        clientData: null,
        draftOrder: false
    });

    const { placeDraftOrder } = draftOrderProvider();
    const { deleteDraftOrderItems } = useDeleteDraftItemsProvider();
    const { addDraftOrderItems } = useAddDraftItemsProvider()
    const { confirmDraftOrderEdit } = useConfirmDraftItemsProvider();
    const { createDraftOrderEdit } = useCreateEditDraftItemsProvider();
    const { draftOrderData } = useDraftOrderQuery(client.draftOrder.id);
    const { updateItemQuantity } = useUpdateItemQuantity();

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
    const handleClick = (index: number) => {
        setSelect(index)
    }

    const buttonClick = async () => {
        setIsLoading(true);
        if (!client.draftOrder) {

            const items = client.clientData.customerOrder.map((product: any) => ({
                variant_id: product.variants[0].id,
                title: product.title,
                quantity: product.quantity,
                unit_price: product.variants[0].prices[0].amount,
                metadata: {
                    thumbnail: product.thumbnail,
                },
            }));
            console.log(items);
            const regions = await getRegionsId();
            const region_id = regions[0].id;

            const shippingOptionsResponse = await medusaClient.get(`/admin/shipping-profiles`);
            const shippingOptions = shippingOptionsResponse.data.shipping_profiles[0];
            const newDraftOrder = {
                email: client.clientData.email,
                customer_id: client.clientData.id,
                billing_address: {
                    first_name: client.clientData.first_name,
                    last_name: client.clientData.last_name,
                    address_1: "N/A",
                    city: "N/A",
                    country_code: "ca",
                    postal_code: "00000"
                },
                region_id,
                items,
                shipping_address: {
                    first_name: client.clientData.first_name,
                    last_name: client.clientData.last_name,
                    phone: "",
                    company: "",
                    address_1: "N/A",
                    address_2: "N/A",
                    city: "",
                    country_code: "ca",
                    province: "",
                    postal_code: "00000",
                    metadata: {}
                },
                shipping_methods: [
                    {
                        shipping_option_id: shippingOptions.id,
                        amount: 0,
                        name: shippingOptions.name,
                    },
                ],
                metadata: {
                    first_name: client.clientData.first_name,
                    last_name: client.clientData.last_name,
                    email: client.clientData.email,
                }
            }

            try {
                const createDraftOrder = await placeDraftOrder(newDraftOrder);
                console.log(createDraftOrder);
                queryDraftOrder.invalidateQueries({ queryKey: ['draftOrdersList'] });

                // Store the order details in localStorage
                localStorage.setItem("order_id", JSON.stringify(createDraftOrder.draft_order));
            } catch (error) {
                console.error("Error creating or retrieving draft order:", error);
            } finally {
                setIsLoading(false);
            }
        } else {
            const draftOrderId = client.draftOrder?.id;
            if (!draftOrderId) {
                console.error("No draft order ID found.");
                return;
            }
            try {
                // Get server items' IDs from the draft order data
                const filteredServerItemsId = draftOrderData.order.items.map((item: any) => item.id);

                // Filter client draftOrder items that have a variant ID (assuming that's what you need)
                const filteredServerItemsVariantId = client.draftOrder.items.filter(
                    (item: any) => Boolean(item.variants?.[0]?.id)
                );

                // Determine items to delete: items on the server that are not in client draftOrder.items
                const itemsToDelete = filteredServerItemsId.filter(
                    (productId: any) => !client.draftOrder.items.some((item: any) => item.id === productId)
                );
                console.log("Items to delete:", itemsToDelete);

                // Prepare items to add: items in the client draft order (that have a valid variant) to be added to the server.
                const itemsToAdd = filteredServerItemsVariantId.map((product: any) => ({
                    variant_id: product.variants?.[0]?.id,
                    title: product.title,
                    quantity: product.quantity,
                    unit_price: product.variants?.[0]?.prices?.[0]?.amount,
                }));
                console.log("Items to add:", itemsToAdd);

                // Create a draft order edit
                try {
                    const createEditDraft = await createDraftOrderEdit(draftOrderId);
                    console.log("Draft order edit created:", createEditDraft);
                } catch (error) {
                    console.error("Error creating draft order edit:", error);
                }

                // Delete items that are on the server but not in the client draft order
                for (const item of itemsToDelete) {
                    try {
                        await deleteDraftOrderItems({ draftOrderId, item_id: item });
                        console.log(`Deleted draft order item: ${item}`);
                    } catch (error) {
                        console.error(`Error deleting draft order item ${item}:`, error);
                        continue;
                    }
                }

                // Add new items if any exist
                if (itemsToAdd.length > 0) {
                    try {
                        const response = await addDraftOrderItems({ draftOrderId, items: itemsToAdd });
                        console.log("Draft order updated with new items:", response);
                    } catch (error) {
                        console.error("Error adding items to draft order:", error);
                    }
                }
                console.log("Draft order update process completed.");

                // Now update quantities: Filter for items whose quantity differs between client and server.
                const itemsToUpdate = client.draftOrder.items.filter((clientItem: any) => {
                    const serverItem = draftOrderData.order.items.find((sItem: any) => sItem.id === clientItem.id);
                    return serverItem && serverItem.quantity !== clientItem.quantity;
                });
                console.log("Items to update quantities:", itemsToUpdate);

                // Loop through items that require quantity updates.
                for (const item of itemsToUpdate) {
                    try {
                        const response = await updateItemQuantity({
                            draftOrderId,
                            item_id: item.id,
                            quantity: item.quantity,
                        });
                        console.log(`Updated quantity for item ${item.id}:`, response);
                    } catch (error) {
                        console.error(`Error updating quantity for item ${item.id}:`, error);
                    }
                }

                // Confirm order edit after processing deletions, additions, and quantity updates
                try {
                    const confirmOrderEdit = await confirmDraftOrderEdit(draftOrderId);
                    console.log("Draft order successfully confirmed:", confirmOrderEdit);
                    localStorage.setItem("order_id", JSON.stringify(confirmOrderEdit.order_preview));
                } catch (error) {
                    console.error("Failed to confirm draft order:", error);
                }
            } catch (error) {
                console.error("Error in draft order process:", error);
            }
        }

        if (select === 1) {
            navigate({ to: "/payment-section" })
        } else if (select === 2) {
            localStorage.clear();

            // Invalidate query to refresh the draft order list
            queryDraftOrder.invalidateQueries({ queryKey: ["draftOrdersList"] });
            navigate({ to: "/orders" })
        }
    }

    return (
        <RadioGroup className="flex flex-col flex-nowrap justify-start items-center gap-y-[10px] w-[300px] h-[300px] mt-[25px]">
            <Container className="flex items-center gap-x-3 mb-[10px] h-[60px] w-[370px]">
                <RadioGroup.Item value="3" id="radio_3_disabled" disabled={true} />
                <Label className=" cursor-not-allowed text-gray-400 text-[18px]" htmlFor="radio_3_disabled" weight="plus">
                    Credit/Debit Card (Terminal)
                </Label>
            </Container>
            <Container className="flex items-center gap-x-3 mb-[10px] h-[60px] w-[370px]">
                <RadioGroup.Item value="1" id="radio_1_disabled"
                    onClick={() => handleClick(1)
                    } />
                <Label className="cursor-pointer text-black text-[18px]" htmlFor="radio_1_disabled" weight="plus" onClick={() => handleClick(1)}>
                    Credit/Debit Card (Digital)
                </Label>
            </Container>
            <Container className="flex items-center gap-x-3 mb-[10px] h-[60px] w-[370px]">
                <RadioGroup.Item value="2" id="radio_2_disabled" onClick={() => handleClick(2)} />
                <Label className="cursor-pointer text-black text-[18px]" htmlFor="radio_2_disabled" weight="plus" onClick={() => handleClick(2)}>
                    {!client.draftOrder ? "Draft Order (Pay Later)" : "Update the Draft Order (Pay Later)"}
                </Label>
            </Container>
            <Button className=" h-[60px] w-[370px] text-[16px] transition-all duration-900" isLoading={isloading} disabled={select === 4 ? true : false} onClick={buttonClick}>
                {select === 1 ? "Continue" : "Save as Draft Order"}
            </Button>
        </RadioGroup>
    );
}