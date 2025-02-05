import { useState } from "react";
import { Container, Text, toast, Toaster } from "@medusajs/ui";
import { ShoppingCartSolid } from "@medusajs/icons";

function ActiveCartElement(props: any) {
  const { price, id, quantity, first_name, last_name, email, handleClick, status } = props;
  const [isActive, setIsActive] = useState(false);

  return (
    <Container
      className={`flex flex-col justify-between gap-2 p-4 min-w-[300px] max-w-[380px] cursor-pointer box-border ${isActive ? "bg-ui-tag-blue-bg" : "text-ui-tag-neutral-text"}`}
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
      onClick={() => {
        if (status === "completed" || status === "paid") {
          toast.warning("Warning", {
            description: "The draft order is completed or paid, you can't select it.",
            duration: 3000,
          })
        } else {
          handleClick(id);
        }
      }}
    >
      <div className="flex flex-col gap-1">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 ">
            <ShoppingCartSolid
              className={`w-4 h-4 ${isActive ? "text-ui-tag-blue-text" : "text-ui-tag-neutral-text"}`}
            />
            <Text
              size="small"
              className={isActive ? "text-ui-tag-blue-text" : "text-ui-tag-neutral-text"}>
              Cart {id}
            </Text>
          </div>
          <Text size="small" weight="plus" className="text-ui-fg-muted">
            {quantity}
          </Text>
        </div>
      </div>
      <Toaster />
      <div className="flex flex-col gap-1">
        <Text size="base">
          {first_name} {last_name}
        </Text>
        <Text size="small" className="text-ui-fg-muted">
          {email}
        </Text>
        <Text size="small" className="text-ui-fg-muted">
          {status}
        </Text>
      </div>
      <div className="flex items-end mt-1">
        <Text size="base" className="leading-none">
          $ {price}
        </Text>
      </div>
    </Container>
  );
}

export default ActiveCartElement;
