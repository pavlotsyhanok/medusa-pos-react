import { createFileRoute } from "@tanstack/react-router";
import CatalogLayout from "../../modules/catalog/CatalogLayout";

export const Route = createFileRoute("/_authenticated/catalog")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <CatalogLayout>
      <div>Hello "/_authenticated/catalog"!</div>
    </CatalogLayout>
  );
}
