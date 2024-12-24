import { Button } from "@medusajs/ui";
import {
  PlusMini,
  ShoppingBag,
  User,
  OpenRectArrowOut,
  Stripe,
  Adjustments,
  BuildingStorefront,
  ShoppingCart,
} from "@medusajs/icons";
import { useAuthQuery } from "@/lib/hooks/auth/AuthProvider";
import { useNavigate, Link } from "@tanstack/react-router";

type MenuItem = {
  label: string;
  icon: JSX.Element;
  to: string;
  variant: "primary" | "danger" | "transparent" | "secondary";
};

const menuItems: MenuItem[] = [
  { label: "New Order", icon: <PlusMini />, to: "/_authenticated/_layout/store/new", variant: "secondary" },
  { label: "Register New Customer", icon: <User />, to: "/_authenticated/_layout/store/customers/new", variant: "secondary" },
  { label: "Browse Catalog", icon: <BuildingStorefront />, to: "/_authenticated/_layout/catalog", variant: "secondary" },
  { label: "Orders", icon: <ShoppingCart />, to: "/_authenticated/_layout/store/orders", variant: "secondary" },
  { label: "Settings", icon: <Adjustments />, to: "/_authenticated/_layout/store/settings", variant: "secondary" },
  { label: "Connect Terminal", icon: <Stripe />, to: "/_authenticated/_layout/store/terminal", variant: "secondary" },
];

function StoreMenu() {
  const { logout } = useAuthQuery();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate({ to: "/" });
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="flex flex-col gap-2 lg:w-full w-full justify-start h-full flex-1 pb-1">
      <div className="flex flex-col gap-2 relative">
        <div className="relative">
          <div className="absolute -top-3 -right-3 h-5 w-5 flex items-center justify-center text-xs text-white font-medium rounded-full bg-ui-button-danger z-10">
            3
          </div>
          <Link to="/catalog">
            <Button
              size="large"
              variant="secondary"
              className="w-full justify-between items-center">
              Continue Order <ShoppingBag />
            </Button>
          </Link>
        </div>
        {menuItems.map((item) => (
          <Link key={item.label} to={item.to}>
            <Button
              size="large"
              variant={item.variant}
              className="w-full justify-between items-center">
              {item.label} {item.icon}
            </Button>
          </Link>
        ))}
      </div>
      <div className="w-full border-t border-ui-border-muted my-4"></div>
      <Button
        size="large"
        variant="danger"
        className="w-full justify-between items-center"
        onClick={handleLogout}>
        Logout <OpenRectArrowOut />
      </Button>
    </div>
  );
}

export default StoreMenu;
