import type { InputData } from "./types/PaymentCollection";
// import { useMutation } from "@tanstack/react-query";
// import { postPaymentCollection } from "./functions/postPaymentCollection";

// export default function PaymentProvider() {
//     const { mutateAsync: placePaymentCollection } = useMutation({

//         mutationFn: async (newPaymentCollection: InputData) => {
//             return await postPaymentCollection(newPaymentCollection);
//         },
//         onSuccess: (data) => {
//             console.log("succeed added payment collection", data);
//         },
//         onError: (error) => {
//             console.error("Login failed:", error);
//             throw error;
//         },
//     });


//     return {
//         placePaymentCollection
//     }
// }
import { useMutation } from "@tanstack/react-query";
import { postPaymentCollection } from "./functions/postPaymentCollection";
import { createPaymentSession } from "./functions/createPaymentSession"; // Import the new function
import { postStoreCarts } from "./functions/postStoreCarts";
import { postStorePayment } from "./functions/postStorePayment";

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
        mutationFn: async ({ paymentCollectionId, providerId }: {
            paymentCollectionId: string, providerId: string
        }) => {
            return await createPaymentSession(paymentCollectionId, providerId);
        },
        onSuccess: (data) => {
            console.log("Succeeded in creating payment session:", data);
        },
        onError: (error) => {
            console.error("Failed to create payment session:", error);
        },
    });

    const { mutateAsync: createStoreCart } = useMutation({
        mutationFn: async ({ regionId }: { regionId: string }) => {
            return await postStoreCarts(regionId);
        },
        onSuccess: (data) => {
            console.log("Succeeded in creating store cart:", data);
        },
        onError: (error) => {
            console.error("Failed to create store cart:", error);
        },
    });
    const { mutateAsync: completeStorePayment } = useMutation({
        mutationFn: async ({ cartId }: { cartId: string }) => {
            return await postStorePayment(cartId);
        },
        onSuccess: (data) => {
            console.log("Succeeded in creating store cart:", data);
        },
        onError: (error) => {
            console.error("Failed to create store cart:", error);
        },
    });

    return {
        createStoreCart,
        placePaymentCollection,
        initiatePaymentSession,
        completeStorePayment,
    };
}
