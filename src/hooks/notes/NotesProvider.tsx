// import { useQuery } from "@tanstack/react-query";

// interface Note {
//     id: string;
//     // content: string;
//     // Add any additional fields that may come from the API response
// }

// // Helper function to fetch notes data
// const fetchNotes = async (customerId: string): Promise<Note[]> => {
//     const response = await fetch(`http://localhost:9000/admin/custom/customer/${customerId}`, {
//         method: "GET",
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         credentials: 'include' as RequestCredentials,
//     });

//     if (!response.ok) {
//         throw new Error("Failed to fetch data");
//     }

//     return response.json();
// }

// // Custom hook to use notes data
// const useNotes = (customerId: string) => {
//     return useQuery({
//         queryKey: ["medusa", "notes", customerId],
//         queryFn: () => fetchNotes(customerId),
//     });
// };

// export default useNotes;
