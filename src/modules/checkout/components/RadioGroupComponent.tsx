import { Button, RadioGroup, Label, Container } from "@medusajs/ui";
import { useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import type { ClientState } from "@/components/types/ClientState";
import { draftOrderProvider, getDraftOrder } from "@/lib/hooks/draft-order/DraftOrderProvider";
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
    });
    const { placeDraftOrder } = draftOrderProvider();


    // Load client data from localStorage on component mount
    useEffect(() => {
        const storedClient = localStorage.getItem("client");
        if (storedClient) {
            setClient({
                isClientSet: true,
                clientData: JSON.parse(storedClient),
            });
        }
    }, []);

    const handleClick = (index: number) => {
        setSelect(index)
    }

    const buttonClick = async () => {
        setIsLoading(true);

        const items = client.clientData.customerOrder.map((product: any) => ({
            variant_id: product.variants[0].id,
            title: product.title,
            quantity: 1,
            unit_price: product.variants[0].prices[0].amount,
            metadata: {
                thumbnail: product.thumbnail,
            },
        }));

        const regions = await getRegionsId();
        const region_id = regions[0].id;

        const shippingOptionsResponse = await medusaClient.get(`/admin/shipping-profiles`);
        const shippingOptions = shippingOptionsResponse.data.shipping_profiles[0];
        console.log(shippingOptions);
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
        }

        try {
            const createDraftOrder = await placeDraftOrder(newDraftOrder);
            console.log(createDraftOrder);

            queryDraftOrder.invalidateQueries({ queryKey: ['draftOrdersList'] });

            console.log(createDraftOrder.draft_order.id);

            // Fetch the draft order details
            // const draftOrderData = await retrieveDraftOrder(createDraftOrder.draft_order.id);

            // Store the order details in localStorage
            localStorage.setItem("order_id", JSON.stringify(createDraftOrder));

            // Update the client state with the new draft order data
            setClient((prevValue: any) => ({
                ...prevValue,
                clientData: createDraftOrder,
            }));
        } catch (error) {
            console.error("Error creating or retrieving draft order:", error);
        } finally {
            setIsLoading(false);
        }


        if (select === 1) {

            navigate({ to: "/payment-section" })

        } else if (select === 2) {

            localStorage.clear();
            navigate({ to: "/orders" })

        }
    }
    console.log(client);

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
                    Draft Order
                </Label>
            </Container>
            <Button className=" h-[60px] w-[370px] text-[16px] transition-all duration-900" isLoading={isloading} disabled={select === 4 ? true : false} onClick={buttonClick}>
                {select === 1 ? "Continue" : "Save as Draft Order"}
            </Button>
        </RadioGroup>
    );
}