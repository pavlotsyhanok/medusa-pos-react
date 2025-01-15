import { Container, Text, Badge } from "@medusajs/ui";
import React from "react";
import { ShoppingCartSolid } from "@medusajs/icons";

function ActiveCartElement({ isActive = false }: { isActive?: boolean }) {
  return (
    <Container
      className={`flex flex-col justify-between gap-2 p-4 min-w-[280px] ${isActive ? "bg-ui-tag-blue-bg" : ""}`}>
      <div className="flex flex-col gap-1">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <ShoppingCartSolid
              className={`w-4 h-4 ${isActive ? "text-ui-tag-blue-text" : ""}`}
            />
            <Text
              size="small"
              className={isActive ? "text-ui-tag-blue-text" : ""}>
              Cart #A78B2C
            </Text>
          </div>
          {isActive ? (
            <Badge size="small" color="blue" rounded="full">
              Selected
            </Badge>
          ) : (
            <Text size="small" className="text-ui-fg-muted">
              13 items
            </Text>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <Text size="base">
          John Smith
        </Text>
        <Text size="small" className="text-ui-fg-muted">
          john.smith@email.com
        </Text>
      </div>
      <div className="flex items-end mt-1">
        <Text size="base" className="leading-none">
          $12,099.00
        </Text>
      </div>
    </Container>
  );
}

export default ActiveCartElement;
