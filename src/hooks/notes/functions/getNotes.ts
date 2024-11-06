// export async function getNotes(customerId: string) {
//     const requestOptions: RequestInit = {
//         method: "GET",
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         credentials: 'include' as RequestCredentials, // explicitly specify type
//     };

//     const response = await fetch(`http://localhost:9000/admin/custom/customer/${customerId}`, requestOptions);

//     if (!response.ok) {
//         throw new Error("Failed to fetch data");
//     }

//     return response.json(); // Parse and return the JSON data
// }
