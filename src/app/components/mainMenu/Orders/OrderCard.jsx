"use client"

import styles from "./Orders.module.css"
import { Heading, Text, Badge } from "@medusajs/ui"

export default function OrderCard({order}) {
    const baseURL = document.querySelector("#base-url")?.dataset.baseUrl;
    function formatDateTime(isoString) {
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const date = new Date(isoString);
    
        const year = date.getFullYear();
        const month = months[date.getMonth()];
        const day = date.getDate();
        const hours = date.getHours();
        const minutes = date.getMinutes();
    
        const hours12 = hours % 12 || 12;
        const amPm = hours < 12 ? "AM" : "PM";
    
        const minutesPadded = minutes.toString().padStart(2, '0');
    
        return `${month} ${day}, ${year}, ${hours12}:${minutesPadded} ${amPm}`;
    }
    return (
        <div onClick={() => {location.replace(`${baseURL}/a/orders/${order.id}`)}} className={styles.order}>
            <div className={styles.orderInfo}>
                <Heading>Order #{order.display_id}</Heading>
                <Text>{formatDateTime(order.created_at)} from {order.sales_channel.name}</Text>
            </div>
            <div className={styles.orderStatus}>
                <Badge><span className={`${styles.statusIcon} ${styles[order.status]}`}></span>{order.status.toUpperCase()}</Badge>
            </div>
        </div>
      )
}