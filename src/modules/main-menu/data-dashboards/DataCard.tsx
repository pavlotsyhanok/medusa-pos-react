import {
  ArrowUpRightMicro,
  ChevronRight,
  CurrencyDollarSolid,
  UsersSolid,
} from "@medusajs/icons";
import { Container, Text } from "@medusajs/ui";
import React from "react";

type DataCardProps = {
  variant?: "sales" | "registrations";
};

function DataCard({ variant = "sales" }: DataCardProps) {
  const bgColor =
    variant === "sales" ? "bg-ui-tag-green-bg " : "bg-ui-tag-blue-bg ";

  return (
    <Container className={`${bgColor} flex flex-col gap-4`}>
      <div className="flex justify-between items-center">
        {variant === "sales" ? <CurrencyDollarSolid /> : <UsersSolid />}{" "}
        <Text size="small" className="text-ui-fg-muted">
          {" "}
          last 30 days
        </Text>
      </div>
      <div className="flex justify-between items-center">
        <Text
          size="small"
          className={
            variant === "sales"
              ? "text-ui-tag-green-text"
              : "text-ui-tag-blue-text"
          }>
          {variant === "sales" ? "My Sales" : "My New Accounts"}
        </Text>
        <div>
          <ChevronRight />
        </div>
      </div>
      <div className="flex justify-start items-end gap-2 mt-2">
        <Text size="xlarge" className="leading-none">
          $24,234{" "}
          {/* Change number depending on variant, if new accounts, show number of new accounts */}
        </Text>
        <div className="flex items-center">
          <ArrowUpRightMicro className="text-ui-tag-red-text scale-75 origin-center" />
          <Text size="small" className="leading-none text-ui-tag-red-text">
            -25%
          </Text>
        </div>
      </div>
    </Container>
  );
}

export default DataCard;
