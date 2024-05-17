import styles from "./ProductSelector.module.css"
import AbstractCard from "./AbstractCard";

export default function CollectionCard({collection, onClick}) {
    return (
        <AbstractCard onClick={onClick} imgSrc={collection.image}>
            <strong className={styles.collectionTitle}>{collection.title}</strong>
        </AbstractCard>
    )
}