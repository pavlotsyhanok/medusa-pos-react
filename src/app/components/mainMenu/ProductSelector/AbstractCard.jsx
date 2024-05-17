import styles from "./ProductSelector.module.css"

export default function AbstractCard({children, imgSrc, onClick, skeleton}) {
    return (
        <div onClick={onClick} className={styles.card}>
            <div className={styles.cardText}>{children}</div>
            {!skeleton
            ?
            <img src={imgSrc ? imgSrc : "/placeholder.webp"} alt="" />
            :
            <div className={styles.skeletonImage}></div>
            }
        </div>
    )
}