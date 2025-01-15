import medusaClient from "../utils/axios.config"

export default async function getRegionsId() {

    // select to use the API-based draft order PUT request
    const regionsResponse = await medusaClient.get("/admin/regions");
    const regions = regionsResponse.data.regions;
    console.log("Available regions:", regions);

    return regions
}