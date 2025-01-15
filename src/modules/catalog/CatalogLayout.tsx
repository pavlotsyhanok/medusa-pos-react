import { useState, useEffect } from "react";
import NavigationRaw from "../../components/NavigationRaw";
import RightHandPane from "./components/RightHandPane";
import LeftHandPane from "./components/LeftHandPane";
import useCustomerQuery from "@/lib/hooks/customers/CustomerProvider";
import useProductQuery from "@/lib/hooks/products/ProductProvider";
import type { ClientState } from "@/components/types/ClientState";

function CatalogLayout() {

  const [client, setClient] = useState<ClientState>({
    isClientSet: false,
    clientData: null,
  });

  // Load client data from localStorage on component mount
  useEffect(() => {
    const storedClient = localStorage.getItem("client");
    if (storedClient) {
      setClient({
        isClientSet: true,
        clientData: JSON.parse(storedClient),
      });
    }
  }, []);

  const { customersList } = useCustomerQuery();
  const { productsList } = useProductQuery()

  const handleClickClient = (id: string) => {
    const clientFound = customersList?.find((c: any) => c.id === id);
    if (clientFound) {
      setClient({
        isClientSet: true,
        clientData: clientFound,
      });
      localStorage.setItem("client", JSON.stringify(clientFound));
    }
  };

  function selectProduct(productId: string) {
    const selectedProduct = productsList?.find((product: any) => product.id === productId);
    if (selectedProduct) {
      const updatedCart = client.clientData?.customerOrder ? [...client.clientData.customerOrder, selectedProduct] : [selectedProduct];
      const orderLength = updatedCart.length;
      updatedCart[updatedCart.length - 1] = { ...selectedProduct, uniqueId: orderLength };
      setClient({
        isClientSet: true,
        clientData: {
          ...client.clientData,
          customerOrder: updatedCart,
        },
      });
      localStorage.setItem("client", JSON.stringify({ ...client.clientData, customerOrder: updatedCart }));
    }
  }

  function deleteProduct(uniqueId: number) {
    const clientData = JSON.parse(localStorage.getItem("client") as string);
    const updatedOrder = clientData.customerOrder.filter((product: any) => product.uniqueId !== uniqueId);
    const updatedClientData = { ...clientData, customerOrder: updatedOrder };
    setClient({
      isClientSet: true,
      clientData: updatedClientData,
    });
    localStorage.setItem("client", JSON.stringify(updatedClientData));
  }
  return (
    <div className="w-full h-full">
      <NavigationRaw first={"Store →"} second={"Browse Catalog →"} />
      <main className="flex flex-row flex-nowrap align-content-start justify-around items-start gap-[0px] border-none h-full">
        <LeftHandPane
          isClientSet={client.isClientSet}
          clientData={client.clientData}
          selectProduct={selectProduct}
        />
        <RightHandPane
          isClientSet={client.isClientSet}
          clientData={client.clientData}
          handleClickClient={handleClickClient}
          deleteProduct={deleteProduct}
        />
      </main>
    </div>
  );
}

export default CatalogLayout;
