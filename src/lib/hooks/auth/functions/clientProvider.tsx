import React, { createContext, useContext, useState } from "react";

const ClientContext = createContext<{
    clientIsSet: boolean;
    setClient: (value: boolean) => void;
}>({ clientIsSet: false, setClient: () => { } });

export const ClientProvider = ({ children }: { children: React.ReactNode }) => {
    const [clientIsSet, setClient] = useState(!!localStorage.getItem("client"));
    return (
        <ClientContext.Provider value={{ clientIsSet, setClient }}>
            {children}
        </ClientContext.Provider>
    );
};

export const useClient = () => useContext(ClientContext);
