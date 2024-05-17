"use client"

import styles from "./MainMenu.module.css"
import { Tabs } from "@medusajs/ui"
import ProductSelector from "./ProductSelector/ProductSelector"
import Cart from "./Cart/Cart"
import { useCreateCart } from "medusa-react"
import { useState, useEffect, useContext } from "react"
import Orders from "./Orders/Orders"
import { SearchContext } from "@/app/(root)/page"

export default function MainMenu({terminal, toast}) {
    const {searchQuery} = useContext(SearchContext)

    const REGION_ID = process.env.NEXT_PUBLIC_REGION_ID;
    
    const [cart, setCart] = useState(null)
    const [priceList, setPriceList] = useState()
    const [activeCustomer, setActiveCustomer] = useState()
    
    const createCart = useCreateCart()

    useEffect(() => {
        createCart.mutate({
            region_id: REGION_ID
            }, {
            onSuccess: ({ cart }) => {
                setCart(cart)
            }
        }) 
    }, [])
    
    function clearCart() {
        setCart(null)
        setActiveCustomer(undefined)
        createCart.mutate({
            region_id: REGION_ID
            }, {
            onSuccess: ({ cart }) => {
                setCart(cart)
            }
        }) 
    }

    return (
        <>
            <Tabs className={styles.main} defaultValue="products">
                <div className={styles.header}>
                    <Tabs.List>
                        <Tabs.Trigger className={styles.tabTrigger} value="products">Products</Tabs.Trigger>
                        <Tabs.Trigger className={styles.tabTrigger} value="orders">Orders</Tabs.Trigger>
                    </Tabs.List>
                </div>
                <Tabs.Content value="products">
                    <ProductSelector 
                        searchQuery={searchQuery} 
                        cart={cart} 
                        updateCart={setCart}
                        priceList={priceList}
                    />
                </Tabs.Content>
                <Tabs.Content value="orders">
                    <Orders/>
                </Tabs.Content>
            </Tabs> 
            <Cart 
                terminal={terminal} 
                setPriceList={setPriceList} 
                priceList={priceList} 
                cart={cart} 
                updateCart={setCart}
                toast={toast}
                clearCart={clearCart}
                regionId={REGION_ID}
                activeCustomer={activeCustomer}
                setActiveCustomer={setActiveCustomer}
            />
        </>
    )
}