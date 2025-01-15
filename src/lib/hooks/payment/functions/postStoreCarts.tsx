import medusaClient from '../../../utils/axios.config'

export async function postStoreCarts(regionId: string) {
    const PUBLISHABLE_API_KEY = import.meta.env.VITE_PUBLISHABLE_API_KEY

    const response = await medusaClient.post('/store/carts', {
        region_id: regionId,
        // items:
    }, {
        headers: {
            'x-publishable-api-key': PUBLISHABLE_API_KEY,
        },
    })
    return response.data.cart
}
