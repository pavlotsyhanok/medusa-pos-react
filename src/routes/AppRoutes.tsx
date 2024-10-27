import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import { appRoutes } from './Routes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import Cookies from 'js-cookie';
import { useEffect } from 'react';

const queryClient = new QueryClient();

const AppRoutes = () => {
    const [isLogged, setIsLogged] = useState(() => !!Cookies.get('token'));
    const [detectTerminal, setDetectTerminal] = useState("Please select the terminal");
    const [disable, setEnable] = useState(true);
    const [client, setClient] = useState("")
    const [newOrder, setDraftOrder] = useState(true);
    useEffect(() => {
        if (Object.keys(client).length !== 0) {
            localStorage.setItem('client', JSON.stringify(client));
        }
    }, [client]);

    useEffect(() => {
        const token = Cookies.get('token');
        setIsLogged(!!token);
    }, []);

    return (
        <QueryClientProvider client={queryClient}>
            <Router>
                <Routes>
                    {appRoutes.map((route) => (
                        route.requiresAuth && !isLogged ? (
                            <Route key={route.path} path={route.path} element={<Navigate replace to="/login" />} />
                        ) : (
                            <Route key={route.path} path={route.path} element={<route.component isLogged={isLogged} newOrder={newOrder} setDraftOrder={setDraftOrder} setEnable={setEnable} setClient={setClient} disable={disable} setIsLogged={setIsLogged} detectTerminal={detectTerminal} setDetectTerminal={setDetectTerminal} client={client} />} />)
                    ))}
                </Routes>
            </Router>
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
};

export default AppRoutes;