import "../styles/checkout.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { medusa } from "../lib/medusa-provider"

const Checkout = ({ client, setClient, newOrder }: { newOrder: boolean, setClient: (client: any) => void, client: any }) => {

  const [select, setSelecte] = useState(4);
  const navigate = useNavigate();

  const handleClick = (index: number) => {
    setSelecte(index);
  };

  const submitCheckout = async () => {
    if (select === 2) {
      if (newOrder) {
        // select to use the API-based draft order PUT request
        const regionsResponse = await medusa.admin.regions.list();
        const regions = regionsResponse.regions;
        console.log("Available regions:", regions);

        const items = client.customerOrder.map((product: any) => ({
          variant_id: product.variants[0].id,
          title: product.title,
          quantity: 1,
          unit_price: product.variants[0].prices[0].amount,
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
      } else {
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
            };
          });

          for (const item of itemsToAdd) {
            try {
              await medusa.admin.draftOrders.addLineItem(draftOrderId, {
                variant_id: item.product_id,
                title: item.title,
                unit_price: item.unit_price,
                quantity: item.quantity,
              }).then((response) => console.log(response));
              console.log(`Added item with variant ID: ${item.variant_id}`);
            } catch (error) {
              console.error(`Failed to add item with variant ID ${item.variant_id}:, error`);
            }
          }
          setClient(response.draft_order.cart);
          console.log('Draft order updated successfully.');
        } catch (error) {
          console.error('Error updating draft order:', error);
        }
      }

      // Navigate to Stripe 
      navigate("/main");
    } else if (select === 1) {
      if (newOrder) {
        // select to use the API-based draft order PUT request
        const regionsResponse = await medusa.admin.regions.list();
        const regions = regionsResponse.regions;
        console.log("Available regions:", regions);

        const items = client.customerOrder.map((product: any) => ({
          variant_id: product.variants[0].id,
          title: product.title,
          quantity: 1,
          unit_price: product.variants[0].prices[0].amount,
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
      } else {
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
            };
          });

          for (const item of itemsToAdd) {
            try {
              await medusa.admin.draftOrders.addLineItem(draftOrderId, {
                variant_id: item.product_id,
                title: item.title,
                unit_price: item.unit_price,
                quantity: item.quantity,
              }).then((response) => console.log(response));
              console.log(`Added item with variant ID: ${item.variant_id}`);
            } catch (error) {
              console.error(`Failed to add item with variant ID ${item.variant_id}:, error`);
            }
          }
          setClient(response.draft_order.cart);
          console.log('Draft order updated successfully.');
        } catch (error) {
          console.error('Error updating draft order:', error);
        }
      }

      // Navigate to Stripe 
      navigate("/credit-card");
    }
  }
  const alertMessage = () => {
    alert("Please select the payment method or save it as a Draft Order");
  }

  return (
    <div>
      <header>
        <h1 className='page-name'>Checkout</h1>
      </header>
      <nav className='back-menu'>
        <Link to={".."} onClick={() => {
          navigate(-1);
        }}>← Back to Catalog</Link>
      </nav>
      <nav className="checkout-options">
        <ul className="checkout-options">
          <li><button id="disable" className="btn-option"> Credit/Debit Card (Terminal)</button></li>
          {/* <li><button onClick={() => handleClick(0)} className={selecte === 0 ? "btn-option selected" : "btn-option"}> Credit/Debit Card (Terminal)</button></li> */}
          <li><button onClick={() => handleClick(1)} className={select === 1 ? "btn-option selected" : "btn-option"}>Credit/Debit Card (Digital)</button></li>
          <li><button onClick={() => handleClick(2)} className={select === 2 ? "btn-option selected" : "btn-option"}>Draft Order</button></li>
        </ul>
      </nav>
      <nav className="checkout-options">
        <ul className="checkout-options">
          <li><button className="btn-option" id={select === 4 ? "disable" : "continue"} onClick={select !== 4 ? submitCheckout : alertMessage}>{select === 2 ? "Save as a Draft Order" : "Continue"}</button></li>
        </ul>
      </nav>
    </div>
  );
};
export default Checkout;