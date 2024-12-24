import { Button } from "@medusajs/ui";
import {
  PlusMini,
  ShoppingCart,
  BuildingStorefront,
  User,
} from "@medusajs/icons";
import { Link } from "@tanstack/react-router";

function ControlsLayout() {
  const controls = [
    {
      to: "/_authenticated/_layout/store/new",
      icon: PlusMini,
      label: "New",
    },
    {
      to: "/_authenticated/_layout/store/orders",
      icon: ShoppingCart,
      label: "Orders",
    },
    {
      to: "/_authenticated/_layout/catalog",
      icon: BuildingStorefront,
      label: "Catalog",
    },
    {
      to: "/_authenticated/_layout/store/customers/new",
      icon: User,
      label: "Customer",
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 border-t border-ui-border-muted bg-ui-bg-base z-[999]">
      <div className="flex justify-between items-center p-2">
        {controls.map(({ to, icon: Icon, label }) => (
          <Link key={to} to={to}>
            <Button
              variant="transparent"
              className="flex flex-col items-center gap-1">
              <Icon />
              <span className="text-xs">{label}</span>
            </Button>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default ControlsLayout;
