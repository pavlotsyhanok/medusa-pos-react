import Main from '../modules/main-page/Main';
import Layout from '../modules/type-of-customers/template/TypeOfCustomer';
import Register from '../modules/registration/template/Registration';
import Checkout from '../modules/checkout/template/Checkout';
import Login from '../modules/login/Login';
import Terminal from "../modules/terminals/template/Terminal";
import SelectCustomer from "../modules/existing-customers/template/ExistingCustomer";
import NotFound from '../app/NotFound';
import ShoppingPanel from '../modules/shopping-pannel/template/ShoppingPannel';
import CreditCard from '../modules/credit-card/CreditCard';
import Success from '../modules/success/Success';
import CustomerOrderNote from '../modules/customer-order-notes/template/CustomerOrderNote';
import TestProduct from '../test/TestProduct';
import DraftOrders from '../modules/draft-orders/template/DraftOrders';
import DraftOrderNotes from '../modules/draft-orders-notes/template/DraftOrderNote';

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
        component: CustomerOrderNote,
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
        component: DraftOrderNotes,
        requiresAuth: true,
    }
]