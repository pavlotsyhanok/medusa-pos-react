import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { medusa } from "../../../lib/medusa-provider"
import { ArrowDownLeftMini } from "@medusajs/icons";
import { Button, RadioGroup, Label, Container } from "@medusajs/ui";
const Checkout = ({ client, setClient, newOrder, setEnable }: { newOrder: boolean, setClient: (client: any) => void, client: any, setEnable: (enable: boolean) => void }) => {

  const [isLoading, setIsLoading] = useState(false);
  const [select, setSelecte] = useState(4);
  const navigate = useNavigate();

  const handleClick = (index: number) => {
    setSelecte(index);
  };

  const submitCheckout = async () => {
    if (select === 2) {
      if (newOrder) {
        setIsLoading(true);
        // select to use the API-based draft order PUT request
        const regionsResponse = await medusa.admin.regions.list();
        const regions = regionsResponse.regions;
        console.log("Available regions:", regions);

        const items = client.customerOrder.map((product: any) => ({
          variant_id: product.variants[0].id,
          title: product.title,
          quantity: 1,
          unit_price: product.variants[0].prices[0].amount,
          metadata: {
            thumbnail: product.thumbnail,
          },
        }));

        const region_id = regions[0].id;

        const shippingOptionsResponse = await medusa.admin.shippingOptions.list({
          region_id: region_id,
        });
        const shippingOptions = shippingOptionsResponse.shipping_options

        const createDraftOrder = await medusa.admin.draftOrders.create({
          email: client.email,
          customer_id: client.id,
          billing_address: {
            first_name: client.first_name,
            last_name: client.last_name,
            address_1: "N/A",
            city: "N/A",
            country_code: "ca",
            postal_code: "00000"
          },
          region_id,
          items,
          shipping_address: {
            first_name: client.first_name,
            last_name: client.last_name,
            phone: "",
            company: "",
            address_1: "N/A",
            address_2: "N/A",
            city: "",
            country_code: "ca",
            province: "",
            postal_code: "00000",
            metadata: {}
          },
          shipping_methods: [
            {
              option_id: shippingOptions[0].id,
            },
          ],
        })
        setClient(createDraftOrder.draft_order.cart);
        setEnable(true);
        setClient("");
        localStorage.clear();
        setIsLoading(false);
      } else {
        setIsLoading(true);
        const draftOrderId = client.id;
        try {
          // Retrieve the current draft order
          const response = await medusa.admin.draftOrders.retrieve(draftOrderId);
          const currentItems = response.draft_order.cart.items;

          // Remove each existing line item
          for (const item of currentItems) {
            try {
              await medusa.admin.draftOrders.removeLineItem(draftOrderId, item.id);
              console.log(`Removed item with ID: ${item.id}`);
            } catch (error) {
              break
            }
          }

          const itemsToAdd = client.cart.items.map((product: any) => {
            let unitPrice;
            let thumbnail;
            if (product.thumbnail === null) {
              thumbnail = product.metadata.thumbnail;
            } else {
              thumbnail = product.thumbnail;
            }
            if (product.total) {
              unitPrice = product.total;
            } else if (product.variants[0]?.prices[0]?.amount) {
              unitPrice = product.variants[0].prices[0].amount;
            }
            return {
              variant_id: product.id,
              title: product.title,
              quantity: 1,
              unit_price: unitPrice,
              thumbnail: thumbnail,
            };
          });

          for (const item of itemsToAdd) {
            try {
              await medusa.admin.draftOrders.addLineItem(draftOrderId, {
                variant_id: item.product_id,
                title: item.title,
                unit_price: item.unit_price,
                quantity: item.quantity,
                metadata: {
                  thumbnail: item.thumbnail,
                }
              }).then((response) => console.log(response));
              console.log(`Added item with variant ID: ${item.variant_id}`);
            } catch (error) {
              console.error(`Failed to add item with variant ID ${item.variant_id}:, error`);
            }
          }
          console.log('Draft order updated successfully.');
        } catch (error) {
          console.error('Error updating draft order:', error);
        }
      }
      setEnable(true);
      setClient("");
      localStorage.clear();
      setIsLoading(false);
      // Navigate to Stripe 
      navigate("/main");
    } else if (select === 1) {
      if (newOrder) {
        setIsLoading(true);
        // select to use the API-based draft order PUT request
        const regionsResponse = await medusa.admin.regions.list();
        const regions = regionsResponse.regions;
        console.log("Available regions:", regions);

        const items = client.customerOrder.map((product: any) => ({
          variant_id: product.variants[0].id,
          title: product.title,
          quantity: 1,
          unit_price: product.variants[0].prices[0].amount,
          metadata: {
            thumbnail: product.thumbnail,
          },
        }));

        const region_id = regions[0].id;

        const shippingOptionsResponse = await medusa.admin.shippingOptions.list({
          region_id: region_id,
        });
        const shippingOptions = shippingOptionsResponse.shipping_options

        const createDraftOrder = await medusa.admin.draftOrders.create({
          email: client.email,
          customer_id: client.id,
          billing_address: {
            first_name: client.first_name,
            last_name: client.last_name,
            address_1: "N/A",
            city: "N/A",
            country_code: "ca",
            postal_code: "00000"
          },
          region_id,
          items,
          shipping_address: {
            first_name: client.first_name,
            last_name: client.last_name,
            phone: "",
            company: "",
            address_1: "N/A",
            address_2: "N/A",
            city: "",
            country_code: "ca",
            province: "",
            postal_code: "00000",
            metadata: {}
          },
          shipping_methods: [
            {
              option_id: shippingOptions[0].id,
            },
          ],
        })
        setClient(createDraftOrder.draft_order.cart);
        setIsLoading(false);
      } else {
        const draftOrderId = client.id;
        setIsLoading(true);
        try {
          // Retrieve the current draft order
          const response = await medusa.admin.draftOrders.retrieve(draftOrderId);
          const currentItems = response.draft_order.cart.items;

          // Remove each existing line item
          for (const item of currentItems) {
            try {
              await medusa.admin.draftOrders.removeLineItem(draftOrderId, item.id);
              console.log(`Removed item with ID: ${item.id}`);
            } catch (error) {
              break
            }
          }

          const itemsToAdd = client.cart.items.map((product: any) => {
            let unitPrice;
            let thumbnail;
            if (product.thumbnail === null) {
              thumbnail = product.metadata.thumbnail;
            } else {
              thumbnail = product.thumbnail;
            }
            if (product.total) {
              unitPrice = product.total;
            } else if (product.variants[0]?.prices[0]?.amount) {
              unitPrice = product.variants[0].prices[0].amount;
            }
            return {
              variant_id: product.id,
              title: product.title,
              quantity: 1,
              unit_price: unitPrice,
              thumbnail: thumbnail,
            };
          });

          for (const item of itemsToAdd) {
            try {
              await medusa.admin.draftOrders.addLineItem(draftOrderId, {
                variant_id: item.product_id,
                title: item.title,
                unit_price: item.unit_price,
                quantity: item.quantity,
                metadata: {
                  thumbnail: item.thumbnail,
                }
              }).then((response) => console.log(response));
              console.log(`Added item with variant ID: ${item.variant_id}`);
            } catch (error) {
              console.error(`Failed to add item with variant ID ${item.variant_id}:, error`);
            }
          }
          setClient(response.draft_order.cart);
          console.log('Draft order updated successfully.');
          setIsLoading(false);
        } catch (error) {
          console.error('Error updating draft order:', error);
          setIsLoading(false);
        }
      }

      // Navigate to Stripe 
      navigate("/credit-card");
    }
  }

  return (
    <div>
      <nav className="w-full px-[25px] h-[80px] flex flex-row flex-nowrap justify-between items-center border">
        <Link className="flex flex-row flex-nowrap justify-center items-center text-black text-[14px]" to={".."} onClick={() => navigate(-1)}>
          <ArrowDownLeftMini className="mr-[5px]" /> Go Back
        </Link>
      </nav>
      <header className="p-[15px] self-start border-b border-b-[rgba(206,206,206,1)]">
        <p className="text-[15px] text-gray-400">Checkout section</p>
      </header>
      <nav className="flex flex-col flex-nowrap justify-center items-center gap-[40px]">
        <RadioGroup className="flex flex-col flex-nowrap justify-start items-center gap-y-[10px] w-[300px] h-[200px] mt-[25px]">
          <Container className="flex items-center gap-x-3 mb-[10px] h-[60px] w-[370px]">
            <RadioGroup.Item value="3" id="radio_3_disabled" disabled={true} />
            <Label className=" cursor-not-allowed text-gray-400 text-[18px]" htmlFor="radio_3_disabled" weight="plus">
              Credit/Debit Card (Terminal)
            </Label>
          </Container>
          <Container className="flex items-center gap-x-3 mb-[10px] h-[60px] w-[370px]">
            <RadioGroup.Item value="1" id="radio_1_disabled" onClick={() => handleClick(1)} />
            <Label className="cursor-pointer text-black text-[18px]" htmlFor="radio_1_disabled" weight="plus" onClick={() => handleClick(1)}>
              Credit/Debit Card (Digital)
            </Label>
          </Container>
          <Container className="flex items-center gap-x-3 mb-[10px] h-[60px] w-[370px]">
            <RadioGroup.Item value="2" id="radio_2_disabled" onClick={() => handleClick(2)} />
            <Label className="cursor-pointer text-black text-[18px]" htmlFor="radio_2_disabled" weight="plus" onClick={() => handleClick(2)}>
              {newOrder ? "Draft Order" : "Update the Draft Order"}
            </Label>
          </Container>
        </RadioGroup>
        <Button isLoading={isLoading} className=" h-[60px] w-[370px] text-[16px] transition-all duration-900" disabled={select === 4 ? true : false} onClick={submitCheckout}>{select === 2 ? "Save as a Draft Order" : "Continue"}</Button>
      </nav>
    </div>
  );
};

export default Checkout;