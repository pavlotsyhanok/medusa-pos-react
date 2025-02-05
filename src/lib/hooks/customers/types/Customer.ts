interface Customer {
    id: string,
    has_account: boolean,
    email: string,
    default_billing_address_id: string,
    default_shipping_address_id: string,
    company_name: string,
    first_name: string,
    last_name: string,
    metadata: string,

}

export type { Customer };
