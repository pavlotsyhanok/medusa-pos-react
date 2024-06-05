import Catalog from "../components/Catalog";
import Cart from "../components/Cart";
import CartTotals from "../components/CartTotals";

const Layout = () => {
  return (
    <div>
      <Catalog />
      <Cart />
      <CartTotals />
    </div>
  );
};

export default Layout;
