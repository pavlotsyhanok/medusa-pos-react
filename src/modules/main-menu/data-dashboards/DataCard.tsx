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
    <Container
      className={`${bgColor} flex flex-col gap-2 sm:gap-4 justify-between p-4`}>
      <div className="flex flex-col gap-2 sm:gap-4 justify-between">
        <div className="flex justify-between items-center">
          <div className="scale-75 sm:scale-100">
            {variant === "sales" ? <CurrencyDollarSolid /> : <UsersSolid />}
          </div>
          <Text size="small" className="text-ui-fg-muted text-xs sm:text-sm">
            last 30 days
          </Text>
        </div>
        <div className="flex justify-between items-center">
          <Text
            size="small"
            className={`text-xs sm:text-sm ${variant === "sales"
                ? "text-ui-tag-green-text"
                : "text-ui-tag-blue-text"
              }`}>
            {variant === "sales" ? "My Sales" : "My New Accounts"}
          </Text>
          {/* <div className="scale-75 sm:scale-100">
            <ChevronRight />
          </div> */}
        </div>
      </div>
      <div className="flex justify-start items-end gap-1 sm:gap-2 mt-1 sm:mt-2">
        <Text size="xlarge" className="leading-none text-base sm:text-xl">
          $24,234{" "}
          {/* Change number depending on variant, if new accounts, show number of new accounts */}
        </Text>
        <div className="flex items-center">
          <ArrowUpRightMicro className="text-ui-tag-red-text scale-50 sm:scale-75 origin-center" />
          <Text
            size="small"
            className="leading-none text-ui-tag-red-text text-xs sm:text-sm">
            -25%
          </Text>
        </div>
      </div>
    </Container>
  );
}

export default DataCard;
