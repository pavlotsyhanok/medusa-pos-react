interface Product {
    title: string,
    description: string,
    id: any
    limit?: number,
    offset?: number,
    count?: number,
    products?: [{}],
    uniqueId: undefined | number,

}
export type { Product };
