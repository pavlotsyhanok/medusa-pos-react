import { useQuery } from "@tanstack/react-query";
import { getCustomersList } from "./functions/getCustomersList";

export default function useCustomerQuery() {

    const { isLoading, isError, data: customersList, error } = useQuery({
        queryKey: ["customer"],
        queryFn: async () => {
            const response = await getCustomersList();
            return response;
        },
        staleTime: 60000,
    });

    return {
        isLoading,
        isError,
        customersList,
        error
    }
}