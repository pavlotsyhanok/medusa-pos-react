"use client"

import { useState, useEffect, useContext } from "react";
import styles from "./ProductSelector.module.css"
// import testData from "./testData.json"
import Collections from "./Collections";
import Products from "./Products";
import { useCreateLineItem } from "medusa-react"
import { Toaster, useToast } from "@medusajs/ui"
import { SearchContext } from "@/app/(root)/page";

export default function ProductSelector({cart, updateCart, priceList}) {
  const {searchQuery, setSearchQuery} = useContext(SearchContext)
    // const collections = testData;
    const [activeCollection, setActiveCollection] = useState(null)

    const createLineItem = useCreateLineItem(cart ? cart.id : '')

    const { toast } = useToast()
    
    function addCartItem(variantId, quantity) {     
        createLineItem.mutate({
          variant_id: variantId,
          quantity: quantity,
        }, {
          onSuccess: ({ cart }) => {
            updateCart(cart)
            toast({ 
              title: "Cart update",
              description: "Item added to cart",
            })
          }
        })
    }

    return (
        <div className={styles.main}>
        <Toaster variant="success" />
            <div className={styles.breadcrumbs}>
                <span onClick={() => {searchQuery ? setSearchQuery('') : setActiveCollection(null)}} className={!activeCollection && !searchQuery ? styles.bold : undefined}>All Collections</span> 
                {activeCollection && <>{" >"} <span className={styles.bold}>{activeCollection.title}</span></>}
                {searchQuery && <>{" >"} <span className={styles.bold}>Search results</span></>}
            </div>
            {
                !activeCollection && !searchQuery
                ? 
                <Collections setActiveCollection={setActiveCollection}/>
                :
                <Products priceList={priceList} searchQuery={searchQuery} cart={cart} collection={activeCollection} addCartItem={addCartItem}/>
            }
        </div>
    )
}