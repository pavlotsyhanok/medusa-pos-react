import styles from '../Header.module.css'

export default function MenuItem({icon, children, onClick}) {
    return <div onClick={onClick} className={styles.posMenuItem}>
        {icon}
        <h1>{children}</h1>
    </div>
}