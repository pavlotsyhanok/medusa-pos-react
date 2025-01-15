interface NewCustomer {
    email: string,
    company_name: string,
    first_name: string,
    last_name: string,
    metadata: {
        website: string
    },
}
export type { NewCustomer }