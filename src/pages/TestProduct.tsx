import { useQuery } from "@tanstack/react-query"
import { medusa } from "../lib/medusa-provider"

// Function to fetch products using fetch
const fetchProducts = async () => {
    const response = await medusa.admin.products.list();
    return response.products;
}

export default function TestProduct() {
    const { data: productQuery, error, isLoading: productIsLoading, isError: productIsError } = useQuery({
        queryKey: ["products"],
        queryFn: fetchProducts,

        staleTime: 10000, // 10 seconds
        refetchInterval: 5000, // 5 seconds
    });
    const clientId = "cus_01J6BK8CP8JKGWFZN46ZTC94XQ";

    const { isLoading: draftsIsLoading, isError: draftsIsError, data: draftsData, error: draftsError } = useQuery({
        queryKey: ["APIRoute"],
        queryFn: async () => {
            const response = fetch(`http://localhost:9000/admin/custom/customer/${clientId}`, {
                method: "GET",
            })

            console.log(response)
            return response

        }
    });
    if (draftsIsLoading) return <h1>Loading...</h1>;
    if (draftsIsError) {
        const typedError = draftsError as Error;
        return <div>Error: {typedError.message}</div>;
    }
    console.log(draftsData);
    // const { data: testAPIRoute, error: APIRouteError, isLoading: APIRouteIsLoading, isError: APIRouteIsError } = useQuery({
    //     queryKey: ["APIRoute"],
    //     queryFn: async () => {
    //         fetch(`http://localhost:9000/hello-world`, {
    //             method: "GET",
    //         }).then((response) => {
    //             const data = response.json();
    //             console.log(data);
    //             return data
    //         })
    //     },
    // });

    // Handle loading state
    if (productIsLoading) return <div>Loading...</div>

    // Handle error state
    if (productIsError) {
        const typedError = error as Error;
        return <div>Error: {typedError.message}</div>;
    }

    return (
        <>
            <h1>Product Test</h1>
            <p>{ }</p>
            <ul>
                {productQuery?.map((product) => (
                    <li key={product.id}>{product.title}</li>
                ))}
            </ul>
        </>
    );
}
// import { useQuery } from "@tanstack/react-query";

// const fetchTestData = async () => {
//   // Simulate a fetch request
//   return new Promise((resolve) => setTimeout(() => resolve("Test Data"), 1000));
// };

// export default function TestComponent() {
//   const { data, error, isLoading } = useQuery({
//     queryKey: ["test"],
//     queryFn: fetchTestData,
//   });

//   if (isLoading) return <div>Loading...</div>;
//   if (error) {const typedError = error as Error; return <div>Error: {error.message}</div>;}

//   return <div>Data: {data}</div>;
// }