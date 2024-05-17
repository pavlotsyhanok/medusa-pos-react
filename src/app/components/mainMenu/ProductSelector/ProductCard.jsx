import styles from "./ProductSelector.module.css"
import AbstractCard from "./AbstractCard";

export default function CollectionCard({product, onClick}) {
    let prices = []
    for (const variant of product.variants) {
        for (const price of variant.prices) {
            prices.push(price.amount)
        }
    }
    const maxPrice = Math.max.apply(Math, prices)
    const minPrice = Math.min.apply(Math, prices)
    return (
        <AbstractCard onClick={onClick} imgSrc={product.thumbnail}>
            <strong>{product.title}</strong>
            <span className={styles.itemSKU}>SKU: {product.variants.length && product.variants[0].sku ? product.variants[0].sku : "not set"}</span>
            <strong>{minPrice === Infinity ? "Price unavailable" : `$${minPrice/100}`}</strong>
            {/* <strong>${maxPrice === minPrice ? maxPrice/100 : `${minPrice/100} - ${maxPrice/100}`}</strong> */}
        </AbstractCard>
    )
}