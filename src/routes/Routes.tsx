import Main from '../pages/Main';
import Layout from '../pages/Layout';
import Register from '../pages/Registration';
import Checkout from '../pages/Checkout';
import Login from '../pages/Login';
import Terminal from "../pages/Terminal";
import SelectCustomer from "../pages/SelectCustomer";
import NotFound from '../components/NotFound';
import ShoppingPanel from '../pages/ShoppingPannel';
import CreditCard from '../pages/CreditCard';
import Success from '../pages/Success';
import OrderNote from '../pages/CustomerOrderNote';
import TestProduct from '../test/TestProduct';
import DraftOrders from '../pages/DraftOrders';
import DraftOrderNote from '../pages/DraftOrderNote';

export const appRoutes = [
    {
        path: "/main",
        component: Main,
        requiresAuth: true,
    },
    {
        path: "/new-order",
        component: Layout,
        requiresAuth: true,
    },
    {
        path: "/register-customer",
        component: Register,
        requiresAuth: true,
    },
    {
        path: "/checkout",
        component: Checkout,
        requiresAuth: true,
    },
    {
        path: "/terminal",
        component: Terminal,
        requiresAuth: true,
    },
    {
        path: "/select-customer",
        component: SelectCustomer,
        requiresAuth: true,
    },
    {
        path: "/*",
        component: NotFound,
        requiresAuth: false,
    },
    {
        path: "/login",
        component: Login,
        requiresAuth: false,
    },
    {
        path: "/shopping-panel",
        component: ShoppingPanel,
        requiresAuth: true,
    },
    {
        path: "/credit-card",
        component: CreditCard,
        requiresAuth: true,
    },
    {
        path: "/success",
        component: Success,
        requiresAuth: true,
    },
    {
        path: "/customer-order-note",
        component: OrderNote,
        requiresAuth: true,
    },
    {
        path: "/test-product",
        component: TestProduct,
        requiresAuth: false,
    },
    {
        path: "/draft-orders",
        component: DraftOrders,
        requiresAuth: true,
    },
    {
        path: "/draft-order-note",
        component: DraftOrderNote,
        requiresAuth: true,
    }
]