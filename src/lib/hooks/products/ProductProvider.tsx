import { useQuery } from "@tanstack/react-query";
import { getProductsList } from "./function/getProductsList";

export default function useProductQuery() {

    const { isLoading, isError, data: productsList, error } = useQuery({
        queryKey: ['product'],
        queryFn: async () => {
            const response = await getProductsList();
            return response.data.products;
        },
    });

    return {
        isLoading,
        isError,
        productsList,
        error
    }
}