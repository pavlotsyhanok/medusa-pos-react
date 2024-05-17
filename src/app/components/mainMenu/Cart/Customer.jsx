"use client"

import styles from "./Cart.module.css"
import { useAdminCustomerGroups } from "medusa-react"
import { BaseUrlContext } from "@/app/(root)/layout"
import Medusa from "@medusajs/medusa-js"
import { useContext } from "react"

export default function Customer({cartId, customer, setPriceList, setActiveCustomer, closeDrawer}) {

    const {customer_groups, customerGroupsLoading,} = useAdminCustomerGroups()
    const {BASE_URL} = useContext(BaseUrlContext)
    const medusa = new Medusa({ baseUrl: BASE_URL, maxRetries: 3 })
    // const { price_lists, price_listsLoading } = useAdminPriceLists()
    
    function selectCustomer() {
        closeDrawer()
        setActiveCustomer(customer)
        let found = false;
        groups: for (const group of customer_groups) {
            if (found) break groups;
            console.log(group);
            medusa.admin.customerGroups.listCustomers(group.id)
            .then(({ customers }) => {
                console.log(customers);
                customers : for (const customerInstance of customers) {
                    if (customerInstance.id === customer.id) {
                        found = true;
                        console.log(`Found customer in group: ${group.id}`)
                        medusa.admin.priceLists.list({customer_groups:[group.id]})
                        .then(({ price_lists }) => {
                            medusa.admin.priceLists.listProducts(price_lists[0].id)
                            .then(({ products }) => {
                                setPriceList(products);
                                console.log(products);
                            })
                        })
                        break customers;
                    }
                }
            })
        }
    }
    
    return (
        <div 
            onClick={selectCustomer} 
            className={styles.customerContainer} 
            key={customer.id}
        >
            {customer.first_name ? `${customer.first_name} ${customer.last_name}` : customer.email}
        </div>
    )
}