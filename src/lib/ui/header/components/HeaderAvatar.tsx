import { Text } from "@medusajs/ui";
import { Avatar } from "@medusajs/ui";
import type { User } from "@/lib/hooks/auth/types/User";

interface HeaderAvatarProps {
  user: User;
}

function HeaderAvatar({ user }: HeaderAvatarProps) {
  return (
    <div className="flex items-center gap-2">
      <Avatar
        fallback={
          user.first_name?.[0] || user.email?.[0]?.toUpperCase() || "?"
        }
      />
      <Text size="base">
        {`${user.first_name} ${user.last_name}` || user.email}
      </Text>
    </div>
  );
}

export default HeaderAvatar;