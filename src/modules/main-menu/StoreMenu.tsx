import { Button } from "@medusajs/ui";
import {
  PlusMini,
  ShoppingBag,
  User,
  OpenRectArrowOut,
  Stripe,
  Adjustments,
  BuildingStorefront,
} from "@medusajs/icons";
import { useAuthQuery } from "@/lib/hooks/auth/AuthProvider";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";

type MenuItem = {
  label: string;
  icon: JSX.Element;
  variant: "primary" | "danger" | "transparent" | "secondary";
};

const menuItems: MenuItem[] = [
  { label: "New Order", icon: <PlusMini />, variant: "secondary" },
  { label: "Register New Customer", icon: <User />, variant: "secondary" },
  { label: "Browse Catalog", icon: <BuildingStorefront />, variant: "secondary" },
  { label: "Settings", icon: <Adjustments />, variant: "secondary" },
  { label: "Connect Terminal", icon: <Stripe />, variant: "secondary" },
];

function StoreMenu() {
  const { logout } = useAuthQuery();
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    if (isLoggingOut) return; // Prevent double-clicks
    
    setIsLoggingOut(true);
    try {
      await logout({
        onSuccess: () => {
          navigate({ to: "/" });
        },
        onError: (error) => {
          console.error("Logout failed:", error);
          setIsLoggingOut(false);
        },
        onSettled: () => {
          setIsLoggingOut(false);
        }
      });
    } catch (error) {
      console.error("Logout failed:", error);
      setIsLoggingOut(false);
    }
  };

  return (
    <div className="flex flex-col gap-2 lg:min-w-[300px] lg:w-fit w-full">
      <div className="relative">
        <div className="absolute -top-3 -right-3 h-5 w-5 flex items-center justify-center text-xs text-white font-medium rounded-full bg-ui-button-danger  z-10">
          3
        </div>
        <Button
          size="large"
          variant="secondary"
          className="w-full justify-between items-center">
          Continue Order <ShoppingBag />
        </Button>
      </div>
      {menuItems.map((item) => (
        <Button
          key={item.label}
          size="large"
          variant={item.variant}
          className="w-full justify-between items-center">
          {item.label} {item.icon}
        </Button>
      ))}
      <div className="w-full border-t border-ui-border-muted my-4"></div>
      <Button
        size="large"
        variant="danger"
        className="w-full justify-between items-center"
        onClick={handleLogout}
        isLoading={isLoggingOut}
        disabled={isLoggingOut}>
        Logout <OpenRectArrowOut />
      </Button>
    </div>
  );
}

export default StoreMenu;
