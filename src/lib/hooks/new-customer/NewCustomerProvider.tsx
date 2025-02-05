import type { NewCustomer } from "./types/NewCustomer";
import { useMutation } from "@tanstack/react-query";
import { postCustomer } from "./functions/postCustomer";

export default function newCustomerProvider() {

    const { mutateAsync: updateCustomer } = useMutation({
        mutationFn: async (newCustomer: NewCustomer) => {
            return await postCustomer(newCustomer);
        },
        onSuccess: () => {
            console.log("Succeed added new client");
        },
        onError: (error) => {
            console.error("Adding new customer has failed:", error);
            throw error;
        },
    });
    return {
        updateCustomer
    };
}