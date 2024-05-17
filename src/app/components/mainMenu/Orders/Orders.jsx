"use client"

import { useAdminOrders } from "medusa-react"
import styles from "./Orders.module.css"
import OrderCard from "./OrderCard"

export default function Orders() {
    const { orders, ordersLoading } = useAdminOrders()
    return (
        <div className={styles.main}>
          {ordersLoading && <span>Loading...</span>}
          {orders && !orders.length && <span>No Orders</span>}
          {orders && orders.length > 0 && (
            <>
              {orders.map((order) => (
                <OrderCard key={order.id} order={order}/>
              ))}
            </>
          )}
        </div>
      )
}