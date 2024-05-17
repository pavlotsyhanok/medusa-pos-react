"use client"

import styles from "./ProductSelector.module.css"
import { FocusModal, Tabs, Heading, Text, IconButton, Input, Select, Button } from "@medusajs/ui";
import { Plus, Minus } from "@medusajs/icons"
import { useEffect, useState } from "react";

export default function ProductDetails({product, addToCart}) {

    const [quantity, setQuantity] = useState(1)
    const [selectedVariant, setSelectedVariant] = useState(product.variants[0])
    // /\ that is just selecting the first variant available since there are no variants of products for now
    const [totalPrice, setTotalPrice] = useState(product.variants[0].prices[0].amount/100)

    useEffect(() => {
      setTotalPrice(selectedVariant.prices[0].amount * quantity / 100)
    }, [quantity])
    

    return (
        <FocusModal.Body className={styles.modalBody}>
            <Tabs defaultValue={product.images.length ? product.images[0].id : ''} className={styles.carousel}>
                {product.images.map(image => (
                    <Tabs.Content className={styles.carouselImage} key={image.id} value={image.id}><img src={image.url}/></Tabs.Content>
                ))}
                <Tabs.List className={styles.carouselButtonContainer}>
                    {product.images.map(image => (
                        <Tabs.Trigger className={styles.carouselButton} key={image.id} value={image.id}><img src={image.url}/></Tabs.Trigger>
                    ))}
                </Tabs.List>
            </Tabs>
            <div key={product.id} className={styles.modalInfo}>
                <Heading className={styles.title}>{product.title}</Heading>
                <Heading>${selectedVariant.prices[0].amount/100}</Heading>
                <Text>{product.description}</Text>
                <div className={styles.quantitySelector}>
                    <IconButton onClick={() => {setQuantity(Math.max(1, quantity - 1))}}>
                        <Minus className={styles.icon} />
                    </IconButton>
                    <Input style={{textAlign: "center"}} placeholder="Product quantity" id="productQty" value={quantity} onChange={e => {setQuantity(e.currentTarget.value)}} />
                    <IconButton onClick={() => {setQuantity(quantity + 1)}}>
                        <Plus className={styles.icon} />
                    </IconButton>
                </div>
                {/* The following segment is the options selector */}
                {/* {product.options.map(option => {
                    let uniqueOptions = new Set();
                    option.values.forEach(item => {
                        uniqueOptions.add(item.value)
                    })
                    return <>
                        <div className={styles.lineDivider}></div>
                        <Heading>{option.title}</Heading>
                        <Select onValueChange={val => {
                            const obj = option.values.find(i => i.value === val)
                            setSelectedVariant(
                                // TODO when variants will be a concern
                            )
                        }}>
                            <Select.Trigger className={styles.select}>  
                                <Select.Value placeholder={`Select ${option.title.toLowerCase()}`} />
                            </Select.Trigger>
                            <Select.Content>
                                {[...uniqueOptions].map((item) => (
                                    <Select.Item key={item} value={item}>
                                        {item}
                                    </Select.Item>
                                ))}
                            </Select.Content>
                        </Select>
                    </>
                })} */}
                <Heading className={styles.totalPrice}>Total: ${totalPrice}</Heading>
                <FocusModal.Close asChild>
                    <Button size="xlarge" onClick={() => {addToCart(selectedVariant.id, quantity)}}>Add to cart</Button>
                </FocusModal.Close>
            </div>
        </FocusModal.Body>
    )
}