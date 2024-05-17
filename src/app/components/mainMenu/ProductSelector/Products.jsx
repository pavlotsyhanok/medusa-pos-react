"use client"

import styles from "./ProductSelector.module.css"
import SkeletonCard from "./SkeletonCard";
import ProductCard from "./ProductCard"
import { useProducts } from "medusa-react"
import { FocusModal, Tabs } from "@medusajs/ui";
import ProductDetails from "./ProductDetails";
import { useContext, useEffect } from "react";
import { SearchContext } from "@/app/(root)/page"

export default function Products({collection, addCartItem, cart, priceList}) {
    const {searchQuery} = useContext(SearchContext)
    const { products, productsLoading } = useProducts({
                                            q:(searchQuery? searchQuery : collection.title),
                                            cart_id : cart?.id, 
                                            region_id : process.env.MEDUSA_REGION_ID
                                        })

    return (
        <div className={styles.menu}>
            {productsLoading && <>
                <SkeletonCard/>
                <SkeletonCard/>
                <SkeletonCard/>
                <SkeletonCard/>
                <SkeletonCard/>
            </>}
            {products && !products.length && <span>No Products</span>}
            {products && products.length > 0 && (
                products.map(product => {
                    if (priceList) {
                        const found = priceList.find(newProduct => {
                            return newProduct.id === product.id
                        })
                        if (found) {
                            product = found
                        }
                    }
                    {/* function handleClick() {
                        addCartItem(cart.id)
                    } */}
                    return (
                        <FocusModal key={product.id}>
                            <FocusModal.Trigger>
                                <ProductCard product={product}/>  
                            </FocusModal.Trigger>
                            <FocusModal.Content>
                                <FocusModal.Header>
                                    {product.title}
                                </FocusModal.Header>
                                <ProductDetails product={product} addToCart={addCartItem} cartId={cart?.id}/>
                            </FocusModal.Content>
                        </FocusModal>
                    ) 
                })
            )}
        </div>
    )
}