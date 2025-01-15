import type { NewCustomer } from "./types/NewCustomer";
import { useMutation } from "@tanstack/react-query";
import { postCustomer } from "./functions/postCustomer";

export default function newCustomerProvider() {
    const { mutateAsync: updateCustomer } = useMutation({

        mutationFn: async (newCustomer: NewCustomer) => {
            postCustomer(newCustomer);
        },
        onSuccess: () => {
            console.log("succeed added new client");
        },
        onError: (error) => {
            console.error("Login failed:", error);
            throw error;
        },
    });
    return {
        updateCustomer
    }
}