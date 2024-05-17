"use client"

import { useState } from 'react'
import styles from '../Header.module.css'
import { Badge } from "@medusajs/ui"

export default function TerminalCard({terminal, connectTerminal}) {
    
    const [terminalConnecting, setTerminalConnecting] = useState(false)

    const terminalInfo = {...terminal}
    if (terminal.device_type === "bbpos_wisepos_e") {
        terminalInfo.readableType = "BBPOS WisePOS E"
        terminalInfo.image = "BBPOS WisePOS E.png"
    } else if (terminal.device_type === "stripe_reader_s700") { // This is not the actual name, i just imagine it would be that
        terminalInfo.readableType = "Stripe Reader S700"
        terminalInfo.image = "Stripe Reader S700.png"
    } else if (terminal.device_type === "bbpos_wisepad_3") { // Same here
        terminalInfo.readableType = "BBPOS WisePad 3"
        terminalInfo.image = "BBPOS WisePad 3.png"
    }

    return <div onClick={() => {
                            connectTerminal(terminal)
                            setTerminalConnecting(true)
                            setTimeout(() => {
                                setTerminalConnecting(false)
                            }, 5000)
                        }} className={`${styles.terminalCard} ${terminalConnecting ? styles.connecting : ''}`}>
        <img src={`/readers/${terminalInfo.image}`}/>
        <h1>{terminalInfo.readableType}</h1>
        <span>{terminalInfo.label}</span>
        <Badge className={styles.statusBadge}><span className={`${styles.statusIcon} ${styles[terminal.status]}`}></span>{terminal.status.toUpperCase()}</Badge>
        <small>SN: {terminalInfo.serial_number}</small>
    </div>
}