import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from '../pages/Main';
import Layout from '../pages/Layout';
import Register from '../pages/Register';
import Settings from '../pages/Settings';
import Checkout from '../pages/Checkout';

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/new-order" element={<Layout />} />
                <Route path="/register-customer" element={<Register />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/checkout" element={<Checkout />} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;
