export interface DraftOrder {
    email: string;
    customer_id: string;
    billing_address: {
        first_name: string;
        last_name: string;
        address_1: string;
        city: string;
        country_code: string;
        postal_code: string;
    };
    shipping_address: {
        first_name: string;
        last_name: string;
        phone: string;
        company: string;
        address_1: string;
        address_2: string;
        city: string;
        country_code: string;
        province: string;
        postal_code: string;
        metadata: Record<string, unknown>;
    };

}
export interface DraftOrderResponse {
    draft_order: {
        cart: any;
        id: string;
    };
}