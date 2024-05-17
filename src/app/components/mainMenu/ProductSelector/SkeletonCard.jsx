import styles from "./ProductSelector.module.css"
import AbstractCard from "./AbstractCard";

export default function SkeletonCard() {
    return (
        <AbstractCard skeleton>
            <span className={styles.skeletonText}></span>
            <span className={styles.skeletonText}></span>
            <span className={styles.skeletonText}></span>
        </AbstractCard>
    )
}