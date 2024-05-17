"use client"

import { useEffect, useState } from "react"
import styles from "./Cart.module.css"
import { Button } from "@medusajs/ui"

export default function CartItem({item, updateCartItem, deleteCartItem}) {

    const [quantity, setQuantity] = useState(item.quantity)
    
    useEffect(() => {
        updateCartItem(item.id, quantity)
    }, [quantity])
    

    return (
        <div className={styles.cartItem}>
            <div className={styles.itemImg}>
                <img src={item.thumbnail}/>
            </div>
            <div className={styles.itemDetails}>
                <span className={styles.itemName}>{item.title}</span>
                <span className={styles.itemSKU}>{item.variant.sku}</span>
            </div>
            <div className={styles.itemQty}>
                <input min="1" type="number" value={quantity} onChange={e => {setQuantity(parseInt(e.currentTarget.value))}} name="qty"/>
            </div>
            <div className={styles.itemPrice}>${item.total/100}</div>
            <div className={styles.itemDelete}>
                <Button onClick={() => {deleteCartItem(item.id)}}>Delete</Button>
            </div>
        </div>
    )
}