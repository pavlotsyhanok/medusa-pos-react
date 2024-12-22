import { Text } from "@medusajs/ui";
import { useAuthQuery } from "@/lib/hooks/auth/AuthProvider";
import HeaderAvatar from "./components/HeaderAvatar";

function HeaderLayout() {
  const { user, userLoading } = useAuthQuery();

  if (userLoading) {
    return <div />;
  }

  if (!user) {
    return null;
  }

  return (
    <div className="flex justify-between items-center">
      <HeaderAvatar user={user} />
      <div className="flex items-center gap-2">
        <Text size="large">Menu</Text>
      </div>
    </div>
  );
}

export default HeaderLayout;
