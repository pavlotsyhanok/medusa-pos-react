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
    draftOrder: false,
  });

  // Load client data from localStorage on component mount
  useEffect(() => {
    const storedClient = localStorage.getItem("client");
    const draftOrder = localStorage.getItem("draftOrder");

    if (storedClient) {
      setClient({
        isClientSet: true,
        clientData: JSON.parse(storedClient),
        draftOrder: false,
      });
    } else if (draftOrder) {
      setClient({
        isClientSet: true,
        clientData: null,
        draftOrder: JSON.parse(draftOrder),
      });
    }
  }, []);

  const { customersList } = useCustomerQuery();
  const { productsList } = useProductQuery()


  const amountClick = (operation: number, productId: string) => {
    if (client.clientData) {
      const updatedCart = client.clientData.customerOrder.map((product: any) => {
        if (product.id === productId) {
          if (operation === 1) {
            return { ...product, quantity: Math.max(1, (product.quantity || 1) - 1) };
          }
          if (operation === 2) {
            return { ...product, quantity: (product.quantity || 1) + 1 };
          }
        }
        return product;
      });

      // Update the client state with the updated cart.
      setClient({
        ...client,
        clientData: {
          ...client.clientData,
          customerOrder: updatedCart,
        },
      });

      // update the localStorage.
      localStorage.setItem(
        "client",
        JSON.stringify({
          ...client.clientData,
          customerOrder: updatedCart,
        })
      );
    } else {
      const updatedCart = client.draftOrder.items.map((product: any) => {
        if (product.id === productId) {
          if (operation === 1) {
            return { ...product, quantity: Math.max(1, (product.quantity || 1) - 1) };
          }
          if (operation === 2) {
            return { ...product, quantity: (product.quantity || 1) + 1 };
          }
        }
        return product;
      });

      // Update the client state with the updated cart.
      setClient({
        ...client,
        draftOrder: {
          ...client.draftOrder,
          items: updatedCart,
        },
      });

      // update the localStorage.
      localStorage.setItem(
        "draftOrder",
        JSON.stringify({
          ...client.draftOrder,
          items: updatedCart,
        })
      );
    }
  }

  const handleClickClient = (id: string) => {
    const clientFound = customersList?.find((c: any) => c.id === id);
    if (clientFound) {
      setClient({
        isClientSet: true,
        clientData: clientFound,
        draftOrder: false,
      });
      localStorage.setItem("client", JSON.stringify(clientFound));
    }
  };
  console.log(client)

  function selectProduct(productId: string) {
    const selectedProduct = productsList?.find((product: any) => product.id === productId);
    if (!selectedProduct) return;

    if (!client.draftOrder) {
      if (client.clientData?.customerOrder) {
        const productIndex = client.clientData.customerOrder.findIndex(
          (product: any) => product.id === selectedProduct.id
        );

        if (productIndex > -1) {
          const updatedCart = [...client.clientData.customerOrder];
          updatedCart[productIndex] = {
            ...updatedCart[productIndex],
            quantity: (updatedCart[productIndex].quantity || 1) + 1,
          };

          setClient({
            isClientSet: true,
            clientData: {
              ...client.clientData,
              customerOrder: updatedCart,
            },
            draftOrder: false,
          });
          localStorage.setItem(
            "client",
            JSON.stringify({ ...client.clientData, customerOrder: updatedCart })
          );
        } else {
          const updatedCart = [
            ...client.clientData.customerOrder,
            { ...selectedProduct, quantity: 1 },
          ];
          const orderLength = updatedCart.length;
          updatedCart[updatedCart.length - 1] = {
            ...updatedCart[updatedCart.length - 1],
            uniqueId: orderLength,
          };

          setClient({
            isClientSet: true,
            clientData: {
              ...client.clientData,
              customerOrder: updatedCart,
            },
            draftOrder: false,
          });

          localStorage.setItem(
            "client",
            JSON.stringify({ ...client.clientData, customerOrder: updatedCart })
          );
        }
      } else {
        const updatedCart = [{ ...selectedProduct, quantity: 1, uniqueId: 1 }];
        setClient({
          isClientSet: true,
          clientData: {
            ...client.clientData,
            customerOrder: updatedCart,
          },
          draftOrder: false,
        });

        localStorage.setItem(
          "client",
          JSON.stringify({ ...client.clientData, customerOrder: updatedCart })
        );
      }
    } else {
      // Handle case when a draft order exists
      const currentItems = client.draftOrder.items || [];
      const productIndex = currentItems.findIndex((product: any) => product.id === selectedProduct.id);
      let updatedCart;
      if (productIndex > -1) {
        // If the product is already in the draft order, increment its quantity.
        updatedCart = [...currentItems];
        updatedCart[productIndex] = {
          ...updatedCart[productIndex],
          quantity: (updatedCart[productIndex].quantity || 1) + 1,
        };
      } else {
        // Otherwise, add the product with quantity 1 and assign a uniqueId.
        updatedCart = [...currentItems, { ...selectedProduct, quantity: 1 }];
        const orderLength = updatedCart.length;
        updatedCart[updatedCart.length - 1] = {
          ...updatedCart[updatedCart.length - 1],
          uniqueId: orderLength,
        };
      }

      setClient((prevState) => ({
        ...prevState,
        draftOrder: {
          ...prevState.draftOrder,
          items: updatedCart,
        },
      }));
      localStorage.setItem(
        "draftOrder",
        JSON.stringify({ ...client.draftOrder, items: updatedCart })
      );
    }
  }

  function deleteProduct(uniqueId: number) {
    if (client.draftOrder) {
      const clientData = JSON.parse(localStorage.getItem("draftOrder") as string);
      const updatedOrder = clientData.items.filter((product: any) => product.uniqueId !== uniqueId && product.id !== uniqueId);
      const updatedClientData = { ...clientData, items: updatedOrder };

      setClient((prevV: any) => ({
        ...prevV,
        draftOrder: updatedClientData
      }));

      localStorage.setItem("draftOrder", JSON.stringify(updatedClientData));

    } else {

      const clientData = JSON.parse(localStorage.getItem("client") as string);
      const updatedOrder = clientData.customerOrder.filter((product: any) => product.uniqueId !== uniqueId);
      const updatedClientData = { ...clientData, customerOrder: updatedOrder };

      setClient({
        isClientSet: true,
        clientData: updatedClientData,
        draftOrder: false
      });
      localStorage.setItem("client", JSON.stringify(updatedClientData));
    }
  }

  return (
    <div className="w-full h-full">
      <NavigationRaw first={"Store →"} second={"Browse Catalog →"} />
      <main className="flex flex-row flex-nowrap align-content-start justify-around items-start gap-[0px] border-none h-full">
        <LeftHandPane
          isClientSet={client.isClientSet}
          selectProduct={selectProduct}
        />
        <RightHandPane
          draftOrder={client.draftOrder}
          isClientSet={client.isClientSet}
          clientData={client.clientData}
          handleClickClient={handleClickClient}
          deleteProduct={deleteProduct}
          amountClick={amountClick}
        />
      </main>
    </div>
  );
}

export default CatalogLayout;
