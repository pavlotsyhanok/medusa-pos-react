import medusaClient from '../../../utils/axios.config'
import { InputData } from '../types/PaymentCollection'

export async function postPaymentCollection(paymentCollection: InputData) {
    const response = await medusaClient.post('/admin/payment-collections', paymentCollection)
    return response.data.payment_collection
}
