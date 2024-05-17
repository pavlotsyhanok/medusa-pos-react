'use client'

import styles from './Header.module.css'
import { IconButton, FocusModal, Drawer } from "@medusajs/ui"
import { CogSixToothSolid, Stripe } from '@medusajs/icons'
import { useContext, useState } from 'react'
import { SearchContext } from "@/app/(root)/page"
import dynamic from 'next/dynamic'
import MenuItem from './menu/MenuItem'
const Scanner = dynamic(() => import('../scanner/Scanner'), {ssr: false});
import { discoverReaderHandler, connectReaderHandler } from '@/app/teminal'
import TerminalCard from './menu/TerminalCard'

export default function Header({terminal, toast}) {
    const {searchQuery, setSearchQuery} = useContext(SearchContext)
    const [scannerOpen, setScannerOpen] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)
    const [terminalSelectorOpen, setTerminalSelectorOpen] = useState(false)
    const [availableTerminalDevices, setAvailableTerminalDevices] = useState([])

    function onScan (code) {
        setSearchQuery(code)
        setScannerOpen(false)
    }

    async function displayTerminals() {
        const devices = await discoverReaderHandler(terminal)
        setAvailableTerminalDevices(devices)
        setTerminalSelectorOpen(true)
        setMenuOpen(false)
    }

    async function connectTerminal(terminalObj) {
        const response = await connectReaderHandler(terminal, terminalObj)
        toast({
            title: "Terminal connection",
            description: response.message,
        })
        if (response.connected) {
            setTerminalSelectorOpen(false)
        }
    }

    return (
        <header className={styles.main}>
            <div>
            <FocusModal
                open={scannerOpen}
                onOpenChange={setScannerOpen}
            >
                <FocusModal.Trigger className={styles.scanButton}>
                    Scan QR
                </FocusModal.Trigger>
                <FocusModal.Content>
                    <FocusModal.Header>Bar code scanner</FocusModal.Header>
                    <FocusModal.Body>
                        <Scanner onScan={onScan}/>
                    </FocusModal.Body>
                </FocusModal.Content>
            </FocusModal>
            </div>
            <div>
                <input 
                    onChange={e => {setSearchQuery(e.currentTarget.value)}} 
                    type="text"
                    name="searchProducts"
                    id="searchProductsInput"
                    placeholder='Search Products'
                    className={styles.search}
                    value={searchQuery}
                />
            </div>
            <div>
            <Drawer
                open={menuOpen}
                onOpenChange={setMenuOpen}
            >
                <Drawer.Trigger className={styles.scanButton}>
                    <CogSixToothSolid/>
                </Drawer.Trigger>
                <Drawer.Content>
                    <Drawer.Header>
                    <Drawer.Title>POS menu</Drawer.Title>
                    </Drawer.Header>
                    <Drawer.Body>
                        <MenuItem onClick={displayTerminals} icon={<Stripe/>}>
                            Connect terminal
                        </MenuItem>
                    </Drawer.Body>
                    <Drawer.Footer></Drawer.Footer>
                </Drawer.Content>
            </Drawer>
            <FocusModal
                open={terminalSelectorOpen}
                onOpenChange={setTerminalSelectorOpen}
            >
                <FocusModal.Content>
                    <FocusModal.Header>Select a terminal</FocusModal.Header>
                    <FocusModal.Body className={styles.terminalSelector}>
                        {availableTerminalDevices?.map(device => <TerminalCard connectTerminal={connectTerminal} key={device.id} terminal={device}/>)}
                    </FocusModal.Body>
                </FocusModal.Content>
            </FocusModal>
            </div>
        </header>
    )
}