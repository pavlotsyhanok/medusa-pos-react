"use client"

import { BaseUrlContext } from "@/app/(root)/layout"
import Medusa from "@medusajs/medusa-js"
import { useContext } from "react"
import { Input } from "@medusajs/ui"
import { useEffect, useState } from "react"
import Customer from "./Customer"

export default function Customers({toggleDrawer, cart, setActiveCustomer, setPriceList}) {

    const {BASE_URL} = useContext(BaseUrlContext)
    const medusa = new Medusa({ baseUrl: BASE_URL, maxRetries: 3 })
    
    // const { customers, customersLoading } = useAdminCustomers({
    //     q:query
    // })

    const [query, setQuery] = useState('')
    const [customers, setCustomers] = useState()

    useEffect(() => {
        medusa.admin.customers.list({q:query})
        .then(({ customers }) => {
          setCustomers(customers)
        })
    }, [query])
    

    function closeDrawer() {
        toggleDrawer(false)
    }

    return <div>
    <Input value={query} onChange={e => setQuery(e.currentTarget.value)} placeholder="Email / First name / Last name" id="search" />
    {customers && !customers.length && (
        <span>No customers</span>
    )}
    {customers && customers.length > 0 && <>
        {customers.map((customer) => {
            return <Customer closeDrawer={closeDrawer} cartId={cart?.id} setActiveCustomer={setActiveCustomer} setPriceList={setPriceList} key={customer.id} customer={customer}/>
        })} </>
    }  
</div>
}