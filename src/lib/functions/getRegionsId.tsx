import medusaClient from "../utils/axios.config"

export default async function getRegionsId() {

    const regionsResponse = await medusaClient.get("/admin/regions");
    const regions = regionsResponse.data.regions;
    console.log("Available regions:", regions);

    return regions
}