export interface PaymentCollection {
    payment_collection: {
        id: string,
        currency_code: string,
        region_id: string,
        amount: number,
        status: string,
        payment_providers: {
            id: string,
            is_enabled: boolean
        }[]
    }
}

export interface InputData {
    order_id: string,
    amount: number,
}