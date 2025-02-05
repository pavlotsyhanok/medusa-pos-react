import { Button } from "@medusajs/ui";
import { PlusMini, ShoppingBag, User, OpenRectArrowOut, Stripe, Adjustments, BuildingStorefront, ShoppingCart } from "@medusajs/icons";
import { useAuthQuery } from "@/lib/hooks/auth/AuthProvider";
import { useNavigate, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";

type MenuItem = {
  label: string;
  icon: JSX.Element;
  to: string;
  variant: "primary" | "danger" | "transparent" | "secondary";
};

const menuItems: MenuItem[] = [
  {
    label: "New Order",
    icon: <PlusMini />,
    to: "/customers",
    variant: "secondary",
  },
  {
    label: "Register New Customer",
    icon: <User />,
    to: "/new-customer",
    variant: "secondary",
  },
  {
    label: "Browse Catalog",
    icon: <BuildingStorefront />,
    to: "/catalog",
    variant: "secondary",
  },
  {
    label: "Orders",
    icon: <ShoppingCart />,
    to: "/orders",
    variant: "secondary",
  },
  {
    label: "Settings",
    icon: <Adjustments />,
    to: "/_authenticated/_layout/store/settings",
    variant: "secondary",
  },
  {
    label: "Connect Terminal",
    icon: <Stripe />,
    to: "/stripe-terminals",
    variant: "secondary",
  },
];

function StoreMenu() {
  const { logout } = useAuthQuery();
  const navigate = useNavigate();

  const [disable, setDisable] = useState({
    disable: true,
    quantity: 0
  });

  useEffect(() => {
    const storedClient = localStorage.getItem("client");
    const storedDraft = localStorage.getItem("draftOrder");
    if (storedClient) {
      const client = JSON.parse(storedClient);
      setDisable({
        disable: false,
        quantity: (client?.customerOrder?.length) || 0
      });
    } else if (storedDraft) {
      const client = JSON.parse(storedDraft);
      setDisable({
        disable: false,
        quantity: (client?.items?.length) || 0
      });
    }
  }, []);

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
            {disable.quantity}
          </div>
          <Link to="/catalog">
            <Button
              size="large"
              variant="secondary"
              disabled={disable.disable}
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
