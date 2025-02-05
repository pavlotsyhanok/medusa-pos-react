import type { InputData } from "./types/PaymentCollection";
import { useMutation } from "@tanstack/react-query";
import { postPaymentCollection } from "./functions/postPaymentCollection";
import { createPaymentSession } from "./functions/createPaymentSession"; // Import the new function
// import { postStoreCarts } from "./functions/postStoreCarts";
import { postOrderPayment } from "./functions/postOrderPayment";
import { patchUpdateOrder } from "./functions/patchUpdateOrder";
// import { patchDraftOrder } from "./functions/patchDraftOrder";

export default function PaymentProvider() {

    const { mutateAsync: placePaymentCollection } = useMutation({

        mutationFn: async (newPaymentCollection: InputData) => {
            return await postPaymentCollection(newPaymentCollection);
        },
        onSuccess: (data) => {
            console.log("Succeeded in adding payment collection:", data);
        },
        onError: (error) => {
            console.error("Failed to add payment collection:", error);
        },
    });

    const { mutateAsync: initiatePaymentSession } = useMutation({

        mutationFn: async ({ paymentCollectionId, providerId }: { paymentCollectionId: string, providerId: string }) => {
            return await createPaymentSession(paymentCollectionId, providerId);
        },
        onSuccess: (data) => {
            console.log("Succeeded in creating payment session:", data);
        },
        onError: (error) => {
            console.error("Failed to create payment session:", error);
        },
    });

    const { mutateAsync: completeOrderPayment } = useMutation({

        mutationFn: async ({ orderId }: { orderId: string }) => {
            return await postOrderPayment(orderId);
        },
        onSuccess: (data) => {
            console.log("Successfully completed an order:", data);
        },
        onError: (error) => {
            console.error("Failed to complete the order:", error);
        },
    });

    const { mutateAsync: updateOrder } = useMutation({

        mutationFn: async (id: string) => {
            return await patchUpdateOrder(id)
        },
        onSuccess: (data) => {
            console.log("Succeeded in updating is_draft_order flag:", data);
        },
        onError: (error) => {
            console.error("Failed in updating is_draft_order flag:", error);
        },
    });

    return {
        updateOrder,
        placePaymentCollection,
        initiatePaymentSession,
        completeOrderPayment,
    };
}
