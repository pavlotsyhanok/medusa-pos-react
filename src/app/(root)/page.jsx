"use client"

import MainMenu from "../components/mainMenu/MainMenu";
import styles from "../styles/home.module.css"
import { useAdminGetSession, useAdminRegions } from "medusa-react"
import { redirect } from 'next/navigation'
import React, { useEffect, useState } from "react";
import Header from "../components/header/Header";
import { initializeTerminal } from "../teminal";
import { Toaster } from "@medusajs/ui"
import { useToast } from "@medusajs/ui"

export const SearchContext = React.createContext({searchQuery:'', setSearchQuery: ()=>{}});
export const ToasterContext = React.createContext({toast: ()=>{}});
export default function Home() {
  // This is the route protection logic. It's pretty slow so if there's some kind of middleware that can solve this it would be great.
    const { user, isLoading } = useAdminGetSession()
    useEffect(() => {
      if (user === undefined && !isLoading) {
        redirect('/login')
      }
    }, [isLoading])

    const [searchQuery, setSearchQuery] = useState('')

    const { regions, regionsLoading } = useAdminRegions()
    useEffect(() => {
      if (regions) {
        console.log("Regions:")
        console.table(regions, ["id", "name"]);
      }
    }, [regions, regionsLoading])

    const [terminal, setTerminal] = useState(null)

    useEffect(() => {
        initializeTerminal().then(setTerminal);
    }, []);

    const { toast } = useToast()
    
    return (
    <ToasterContext.Provider value={{toast}}>
    <SearchContext.Provider value={{searchQuery, setSearchQuery}}>
    <Header toast={toast} terminal={terminal}/>
    <main className={styles.main}>
      <MainMenu toast={toast} terminal={terminal}/>
    </main>
    <Toaster />
    </SearchContext.Provider>
    </ToasterContext.Provider>
  );
}
