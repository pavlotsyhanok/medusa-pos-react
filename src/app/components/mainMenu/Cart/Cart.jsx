"use client"

import styles from "./Cart.module.css"
import headerStyles from "@/app/components/header/Header.module.css"
import { Drawer, Button, IconBadge, Textarea, Input, Prompt, RadioGroup, Label, Heading, Select, Switch } from "@medusajs/ui"
import { User } from "@medusajs/icons"
import CartItem from "./CartItem"
// import testData from "../ProductSelector/testData.json"
import { useAdminCreateDraftOrder, useUpdateLineItem, useDeleteLineItem, useUpdateCart, useCompleteCart, useAdminShippingOptions, useAdminRegion } from "medusa-react"
import Customer from "./Customer"
import Medusa from "@medusajs/medusa-js"
import { useContext, useEffect, useState } from "react"
import { collectPayment } from "@/app/teminal"
import { ToasterContext } from "@/app/(root)/page"
import { BaseUrlContext } from "@/app/(root)/layout"
import Customers from "./Customers"

export default function Cart({
                            cart, 
                            updateCart, 
                            setPriceList, 
                            priceList, 
                            terminal, 
                            clearCart, 
                            regionId,
                            activeCustomer,
                            setActiveCustomer
                        }) {

    const [discountCode, setDiscountCode] = useState('')
    const [discountPercentage, setDiscountPercentage] = useState()
    const [discountAmount, setDiscountAmount] = useState()
    const [cardPromptOpen, setCardPromptOpen] = useState(false)
    const [customersDrawerOpen, setCustomersDrawerOpen] = useState(false)
    const [shippingOptionsScreenOpen, setShippingOptionsScreenOpen] = useState(false)
    const [additionalInfoPromptOpen, setAdditionalInfoPromptOpen] = useState(false)
    const [billingIsShipping, setBillingIsShipping] = useState(false)
    const [customerRegistrationFormOpen, setCustomerRegistrationFormOpen] = useState(false)
    const [customerRegistrationForm, setCustomerRegistrationForm] = useState({
        email:'',
        first_name:'',
        last_name:'',
        password:'',
        phone:''
    })
    const [additionalCartInfo, setAdditionalCartInfo] = useState({
        customerEmail:'',
        note:'',
        billing_address:{
            first_name:'',
            last_name:'',
            phone:'',
            company:'',
            address_1:'',
            address_2:'',
            city:'',
            country_code:'',
            province:'',
            postal_code:''
        },
        shipping_address:{
            first_name:'',
            last_name:'',
            phone:'',
            company:'',
            address_1:'',
            address_2:'',
            city:'',
            country_code:'',
            province:'',
            postal_code:''
        }
    })
    const {toast} = useContext(ToasterContext)
    
    const createDraftOrder = useAdminCreateDraftOrder()
    const { region } = useAdminRegion(regionId)

    const {shipping_options, shipping_optionsLoading} = useAdminShippingOptions({is_return:false, region_id:regionId})
    
    const updateLineItem  = useUpdateLineItem(cart ? cart.id : '')
    const {BASE_URL} = useContext(BaseUrlContext)
    const medusa = new Medusa({ baseUrl: BASE_URL, maxRetries: 3 });    

    function updateCartItem(lineItemId, quantity) {
        
        updateLineItem.mutate({
            lineId: lineItemId,
          quantity: quantity,
        }, {
          onSuccess: ({ cart }) => {
            updateCart(cart)
          }
        })
    }

    const deleteLineItem  = useDeleteLineItem(cart ? cart.id : '')

    function deleteCartItem(lineItemId) {
        
        deleteLineItem.mutate({
            lineId: lineItemId,
        }, {
          onSuccess: ({ cart }) => {
            updateCart(cart)
          }
        })
    }

    const updateCartHook = useUpdateCart(cart ? cart.id : '')

    function addDiscountCode(code) {        
        updateCartHook.mutate({
          discounts:[{code:code}]
        }, {
          onSuccess: ({ cart }) => {
            updateCart(cart)
            toast({ 
              title: "Discount",
              description: "Discount added",
            })
          },
          onError: (e) => {
            const error = e.response.data
            toast({
                title: "Discount failed",
                description: error.message,
            })
          },
        })
    }
    
    function updateCartInfo() {
        console.log(additionalCartInfo.customerEmail)
        updateCartHook.mutate({
            email:additionalCartInfo.customerEmail,
            shipping_address:additionalCartInfo.shipping_address,
            billing_address:additionalCartInfo.billing_address
        }, {
          onSuccess: ({ cart }) => {
            updateCart(cart)
          },
          onError: (e) => {
            const error = e.response.data
            toast({
                title: "Error",
                description: error.message,
            })
          },
        })

    }

    async function finalizeCart() {
        if (!cart.email || !cart.shipping_address || !cart.billing_address) {
            setAdditionalInfoPromptOpen(true)
            return
        } else if (!cart.shipping_methods.length) {
            setShippingOptionsScreenOpen(true)
            return
        } else if (terminal.paymentStatus !== "ready") {
            toast({ 
                title: "Terminal not connected",
                description: "Please connect to the terminal first.",
            })
            return
        }
        setCardPromptOpen(true)
        const response = await collectPayment(terminal, parseInt(cart.total - (discountAmount ? discountAmount : 0 * 100) - parseInt(cart.total * (discountPercentage ? discountPercentage : 0 / 100))))
        console.log(response)
        setCardPromptOpen(false)

        console.log(cart)
        console.log(region.countries)
        const order = {
            email:cart.email,
            region_id:cart.region_id,
            shipping_methods:[{
                option_id:cart.shipping_methods[0].shipping_option_id, 
                price:cart.shipping_methods[0].total
            }],
            // cart.shipping_methods.map(method => ({option_id:method.shipping_option_id, price:method.total})),
            status:"completed",
            billing_address:{
                first_name:cart.billing_address.first_name,
                last_name:cart.billing_address.last_name,
                phone:cart.billing_address.phone,
                address_1:cart.billing_address.address_1,
                address_2:cart.billing_address.address_2,
                city:cart.billing_address.city,
                country_code:cart.billing_address.country_code,
                province:cart.billing_address.province,
                postal_code:cart.billing_address.postal_code,
                company:cart.billing_address.company
            },
            shipping_address:{
                first_name:cart.shipping_address.first_name,
                last_name:cart.shipping_address.last_name,
                phone:cart.shipping_address.phone,
                address_1:cart.shipping_address.address_1,
                address_2:cart.shipping_address.address_2,
                city:cart.shipping_address.city,
                country_code:cart.shipping_address.country_code,
                province:cart.shipping_address.province,
                postal_code:cart.shipping_address.postal_code,
                company:cart.shipping_address.company
            },
            items:cart.items.map(item => ({quantity:item.quantity, variant_id:item.variant_id, unit_price:item.unit_price, title:item.title, metadata:item.metadata})),
            customer_id:cart.customer_id,
            discounts:cart.discounts.map(discount => ({code:discount.code})),
            metadata:{...cart.metadata, note:additionalCartInfo.note}
        }
        createDraftOrder.mutate(order, {
            onSuccess: ({ draft_order }) => {
                console.log(draft_order.id)
                if (response.error) {
                    toast({ 
                        title: codeToReadable(response.response.code),
                        description: response.response.message,
                    })
                } else {
                    toast({ 
                        title: "Transaction successful",
                        description: "Everything is good!",
                    })
                    medusa?.admin.draftOrders.markPaid(draft_order.id)
                    .then(({ order }) => {
                        if (additionalCartInfo.note) {
                            medusa.admin.notes.create({
                                resource_id : order.id,
                                resource_type: "order",
                                value: additionalCartInfo.note
                            })
                        }
                        setAdditionalCartInfo({
                            customerEmail:'',
                            note:'',
                            billing_address:{
                                first_name:'',
                                last_name:'',
                                phone:'',
                                company:'',
                                address_1:'',
                                address_2:'',
                                city:'',
                                country_code:'',
                                province:'',
                                postal_code:''
                            },
                            shipping_address:{
                                first_name:'',
                                last_name:'',
                                phone:'',
                                company:'',
                                address_1:'',
                                address_2:'',
                                city:'',
                                country_code:'',
                                province:'',
                                postal_code:''
                            }
                        })
                        setBillingIsShipping(false)
                        console.log(order.id);
                        clearCart()
                    })
                }
            }
        })
    }

    function codeToReadable(input) {
        // Split the string into an array of words
        const words = input.split('_');

        // Capitalize the first letter of the first word
        words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);

        // Join the words with a space and return the result
        return words.join(' ');
    }

    useEffect(() => {
        if (cart) {
            if (!activeCustomer) {
                location.reload()
            }
            // console.log(activeCustomer ? activeCustomer.id : null)
            // console.log(cart.id)
            medusa.admin.customers.retrieve(activeCustomer.id)
            .then(({ customer }) => {
                console.log(customer)
                setAdditionalCartInfo({
                    ...additionalCartInfo,
                    customerEmail:customer.email,
                    billing_address:{
                        first_name:customer.billing_address?.first_name,
                        last_name:customer.billing_address?.last_name,
                        phone:customer.billing_address?.phone,
                        company:customer.billing_address?.company,
                        address_1:customer.billing_address?.address_1,
                        address_2:customer.billing_address?.address_2,
                        city:customer.billing_address?.city,
                        country_code:customer.billing_address?.country.iso_2,
                        province:customer.billing_address?.province,
                        postal_code:customer.billing_address?.postal_code,
                    },
                    shipping_address:{
                        first_name:customer.shipping_addresses[0]?.first_name,
                        last_name:customer.shipping_addresses[0]?.last_name,
                        phone:customer.shipping_addresses[0]?.phone,
                        company:customer.shipping_addresses[0]?.company,
                        address_1:customer.shipping_addresses[0]?.address_1,
                        address_2:customer.shipping_addresses[0]?.address_2,
                        city:customer.shipping_addresses[0]?.city,
                        country_code:customer.shipping_addresses[0]?.country.iso_2,
                        province:customer.shipping_addresses[0]?.province,
                        postal_code:customer.shipping_addresses[0]?.postal_code,
                    },
                })
            })
            // console.log(activeCustomer)
            medusa?.carts.update(cart.id, {
                customer_id: activeCustomer ? activeCustomer.id : null, // This should reset the customer in cart when the client has no activeCustomer but it for some reason doesn't, so there's a workaround a few lines above.
            })
            .then(({ cart }) => {
                updateCart(cart)
                console.log(cart);
            })
        }
    }, [activeCustomer])

    function copyBillingToShipping() {
        console.log(additionalCartInfo)
        setAdditionalCartInfo({...additionalCartInfo, shipping_address:additionalCartInfo.billing_address})
    }

    return (
        <div className={styles.main}>
            <Drawer open={customersDrawerOpen} onOpenChange={setCustomersDrawerOpen}>
                <div className={styles.customerSelector}>
                    <span className={styles.customerName}><IconBadge><User/></IconBadge>{activeCustomer ? 
                                                                                        (activeCustomer.first_name || activeCustomer.last_name) ? `${activeCustomer.first_name} ${activeCustomer.last_name}` : activeCustomer.email
                                                                                        : "No customer selected"}</span>
                    <div className={styles.buttons}>
                        {activeCustomer ? <Button onClick={() => {setActiveCustomer(undefined)}}>Clear</Button> : <Drawer.Trigger asChild><Button>Select</Button></Drawer.Trigger>}
                        <Button onClick={() => {setCustomerRegistrationFormOpen(true)}}>Register</Button>
                    </div>
                </div>
                <Drawer.Content>
                    <Drawer.Header>
                    <Drawer.Title>Select a customer</Drawer.Title>
                    </Drawer.Header>
                    <Drawer.Body>
                        <Customers cart={cart} setActiveCustomer={setActiveCustomer} setPriceList={setPriceList} toggleDrawer={setCustomersDrawerOpen}/>
                    </Drawer.Body>
                    <Drawer.Footer>Footer</Drawer.Footer>
                </Drawer.Content>
            </Drawer>
            <Drawer open={customerRegistrationFormOpen} onOpenChange={setCustomerRegistrationFormOpen}>
                <Drawer.Content>
                    <Drawer.Header>
                    <Drawer.Title>Register a customer</Drawer.Title>
                    </Drawer.Header>
                    <Drawer.Body>
                        <div style={{display:"grid", gap:"1rem"}}>
                            <Input autoComplete="off" required value={customerRegistrationForm.email} onChange={e => {setCustomerRegistrationForm({...customerRegistrationForm, email:e.currentTarget.value})}} type="email" placeholder="Email"/>
                            <Input autoComplete="off" required value={customerRegistrationForm.password} onChange={e => {setCustomerRegistrationForm({...customerRegistrationForm, password:e.currentTarget.value})}} type="password" placeholder="Password"/>
                            <Input autoComplete="off" required value={customerRegistrationForm.first_name} onChange={e => {setCustomerRegistrationForm({...customerRegistrationForm, first_name:e.currentTarget.value})}} type="text" placeholder="First name"/>
                            <Input autoComplete="off" required value={customerRegistrationForm.last_name} onChange={e => {setCustomerRegistrationForm({...customerRegistrationForm, last_name:e.currentTarget.value})}} type="text" placeholder="Last name"/>
                            <Input autoComplete="off" value={customerRegistrationForm.phone} onChange={e => {setCustomerRegistrationForm({...customerRegistrationForm, phone:e.currentTarget.value})}} type="tel" placeholder="Phone number"/>
                        </div>
                    </Drawer.Body>
                    <Drawer.Footer><Button 
                                        onClick={() => {
                                            medusa.admin.customers.create(customerRegistrationForm)
                                            .then(({ customer }) => {
                                                console.log(customer);
                                                toast({ 
                                                    title: "Customer created",
                                                    description: `Welcome ${customer.first_name}!`,
                                                })
                                                setCustomerRegistrationFormOpen(false)
                                            })
                                            .catch(response => {
                                                const error = response.response.data
                                                toast({ 
                                                    title: codeToReadable(error.type),
                                                    description: error.message,
                                                })
                                            })
                                        }} 
                                        className={styles.fakeButton}
                                    >Register</Button></Drawer.Footer>
                </Drawer.Content>
            </Drawer>
            <div className={styles.cart}>
                {cart && cart.items.map(item => <CartItem priceList={priceList} key={item.id} item={item} updateCartItem={updateCartItem} deleteCartItem={deleteCartItem}/>)}
            </div>
            <div className={styles.summary}>
                <div className={styles.text}>
                    <span>Subtotal:</span>
                    <span>${cart && cart.subtotal/100}</span>
                    <span>Tax:</span>
                    <span>${cart && cart.tax_total/100}</span>
                    <span>Shipping:</span>
                    <span>${cart && cart.shipping_total/100}</span>
                </div>
                <div className={styles.controls}>
                    <Drawer 
                        open={shippingOptionsScreenOpen}
                        onOpenChange={setShippingOptionsScreenOpen}
                    >
                    <Drawer.Trigger>Shipping</Drawer.Trigger>
                    <Drawer.Content>
                        <Drawer.Header>
                        <Drawer.Title>Shipping</Drawer.Title>
                        </Drawer.Header>
                        <Drawer.Body>
                            <RadioGroup>
                                {shipping_options?.map(option => {
                                    function applyShippingOption(e) {
                                        e.stopPropagation();
                                        console.log(option)
                                        medusa.carts.addShippingMethod(cart.id, {
                                            option_id:option.id
                                        })
                                        .then(({ cart }) => {
                                            updateCart(cart)
                                            console.log(cart);
                                        })
                                    }
                                    return <div onClick={applyShippingOption} className={styles.shippingOption}>
                                        <RadioGroup.Item value={option.id} id={option.id} />
                                        <Label htmlFor={option.id} weight="plus">
                                            {option.name}
                                        </Label>
                                    </div>
                                })}
                            </RadioGroup>
                        </Drawer.Body>
                        <Drawer.Footer><Drawer.Close className={styles.fakeButton}>Apply</Drawer.Close></Drawer.Footer>
                    </Drawer.Content>
                    </Drawer>

                    <Drawer>
                    <Drawer.Trigger>Coupon</Drawer.Trigger>
                    <Drawer.Content>
                        <Drawer.Header>
                        <Drawer.Title>Coupon</Drawer.Title>
                        </Drawer.Header>
                        <Drawer.Body>
                            <Input placeholder="Discount code" value={discountCode} style={{marginBottom:"1rem"}} onChange={e => {setDiscountCode(e.currentTarget.value)}} id="discount-code" />
                            <Button className={styles.fakeButton} onClick={() => {addDiscountCode(discountCode)}}>Apply</Button>
                        </Drawer.Body>
                        <Drawer.Footer></Drawer.Footer>
                    </Drawer.Content>
                    </Drawer>

                    <Drawer>
                    <Drawer.Trigger>Note</Drawer.Trigger>
                    <Drawer.Content>
                        <Drawer.Header>
                        <Drawer.Title>Note</Drawer.Title>
                        </Drawer.Header>
                        <Drawer.Body>
                            <Textarea value={additionalCartInfo.note} onChange={e => {setAdditionalCartInfo({...additionalCartInfo, note:e.currentTarget.value})}} placeholder="Add a note"/>
                        </Drawer.Body>
                        <Drawer.Footer><Drawer.Close className={styles.fakeButton}>Apply</Drawer.Close></Drawer.Footer>
                    </Drawer.Content>
                    </Drawer>

                    <Drawer>
                    <Drawer.Trigger>Discount</Drawer.Trigger>
                    <Drawer.Content>
                        <Drawer.Header>
                        <Drawer.Title>Discount</Drawer.Title>
                        </Drawer.Header>
                        <Drawer.Body>
                            <Input 
                                placeholder="Discount %" 
                                value={discountPercentage} 
                                style={{marginBottom:"1rem"}} 
                                type="number"
                                min={0}
                                max={100}
                                onChange={e => {
                                    setDiscountPercentage(parseInt(e.currentTarget.value))
                                    setDiscountAmount('')
                                }} 
                                id="discount-percentage" 
                            />
                            <span style={{marginBottom:"1rem"}}>or</span>
                            <Input 
                                placeholder="Discount $" 
                                value={discountAmount} 
                                style={{marginBottom:"1rem"}} 
                                type="number"
                                min={0}
                                onChange={e => {
                                    setDiscountAmount(parseInt(e.currentTarget.value))
                                    setDiscountPercentage('')
                                }} 
                                id="discount-amount" 
                            />
                            <Drawer.Close asChild>
                                <Button className={styles.fakeButton}>Apply</Button>
                            </Drawer.Close>
                        </Drawer.Body>
                        <Drawer.Footer>This applies as a whole order discount</Drawer.Footer>
                    </Drawer.Content>
                    </Drawer>
                </div>
            </div>
            <div onClick={finalizeCart} className={styles.total}>
                Total: ${cart && (discountAmount || discountPercentage ? <><span className={styles.crossed}>{cart.total/100}</span> {((cart.total/100) - discountAmount - parseFloat((cart.total / 100) * (discountPercentage / 100))).toFixed(2)}</> : cart.total / 100)}
            </div>
            <Prompt
                open={cardPromptOpen}
                onOpenChange={setCardPromptOpen}
            >
                <Prompt.Content>
                    <Prompt.Header>
                    <Prompt.Title>Payment</Prompt.Title>
                    <Prompt.Description>Ask customer to present payment.</Prompt.Description>
                    </Prompt.Header>
                    <Prompt.Footer>
                        <Prompt.Cancel>Close</Prompt.Cancel>
                    </Prompt.Footer>
                </Prompt.Content>
            </Prompt>
            <Prompt
                open={additionalInfoPromptOpen}
                onOpenChange={setAdditionalInfoPromptOpen}
                variant="confirmation"
            >
                <Prompt.Content className={styles.moreInfoPrompt}>
                    <Prompt.Header>
                    <Prompt.Title style={{textAlign:"center", marginBottom:"1rem"}}>More info needed</Prompt.Title>
                    <Prompt.Description>
                        <div>
                            <Input value={additionalCartInfo.customerEmail} required type="email" onChange={e => {setAdditionalCartInfo({...additionalCartInfo, customerEmail:e.currentTarget.value})}} placeholder="Customer email" id="customer-email" />
                            <Heading>Billing info</Heading>
                            <Input value={additionalCartInfo.billing_address.first_name} required type="text" onChange={e => {setAdditionalCartInfo({...additionalCartInfo, billing_address:{...additionalCartInfo.billing_address, first_name:e.currentTarget.value}})}} placeholder="First name" id="first_name" />
                            <Input value={additionalCartInfo.billing_address.last_name} required type="text" onChange={e => {setAdditionalCartInfo({...additionalCartInfo, billing_address:{...additionalCartInfo.billing_address, last_name:e.currentTarget.value}})}} placeholder="Last name" id="last_name" />
                            <Input value={additionalCartInfo.billing_address.phone} type="tel" onChange={e => {setAdditionalCartInfo({...additionalCartInfo, billing_address:{...additionalCartInfo.billing_address, phone:e.currentTarget.value}})}} placeholder="Phone number" id="phone" />
                            <Input value={additionalCartInfo.billing_address.company} type="text" onChange={e => {setAdditionalCartInfo({...additionalCartInfo, billing_address:{...additionalCartInfo.billing_address, company:e.currentTarget.value}})}} placeholder="Company name" id="company" />
                            <Input value={additionalCartInfo.billing_address.address_1} required type="text" onChange={e => {setAdditionalCartInfo({...additionalCartInfo, billing_address:{...additionalCartInfo.billing_address, address_1:e.currentTarget.value}})}} placeholder="Address line 1" id="address_1" />
                            <Input value={additionalCartInfo.billing_address.address_2} type="text" onChange={e => {setAdditionalCartInfo({...additionalCartInfo, billing_address:{...additionalCartInfo.billing_address, address_2:e.currentTarget.value}})}} placeholder="Address line 2" id="address_2" />
                            <Input value={additionalCartInfo.billing_address.city} required type="text" onChange={e => {setAdditionalCartInfo({...additionalCartInfo, billing_address:{...additionalCartInfo.billing_address, city:e.currentTarget.value}})}} placeholder="City" id="city" />
                            <Select value={additionalCartInfo.billing_address.country_code} onValueChange={e => {setAdditionalCartInfo({...additionalCartInfo, billing_address:{...additionalCartInfo.billing_address, country_code:e}})}}>
                                <Select.Trigger>
                                    <Select.Value placeholder="Country" />
                                </Select.Trigger>
                                <Select.Content>
                                    {region?.countries.map((country) => (
                                        <Select.Item key={country.id} value={country.iso_2}>
                                            {country.display_name}
                                        </Select.Item>
                                    ))}
                                </Select.Content>
                            </Select>
                            <Input value={additionalCartInfo.billing_address.province} required type="text" onChange={e => {setAdditionalCartInfo({...additionalCartInfo, billing_address:{...additionalCartInfo.billing_address, province:e.currentTarget.value}})}} placeholder="Province" id="province" />
                            <Input value={additionalCartInfo.billing_address.postal_code} required type="text" onChange={e => {setAdditionalCartInfo({...additionalCartInfo, billing_address:{...additionalCartInfo.billing_address, postal_code:e.currentTarget.value}})}} placeholder="Postal code" id="postal_code" />
                            <div className="flex items-center gap-x-2">
                                <Switch checked={billingIsShipping} onCheckedChange={e => {setBillingIsShipping(e); copyBillingToShipping()}} value={billingIsShipping} id="billingIsShipping" />
                                <Label htmlFor="billingIsShipping">Billing address same as shipping address</Label>
                            </div>
                        </div>
                        {!billingIsShipping&&
                            <div>
                                <Heading>Shipping info</Heading>
                                <Input value={additionalCartInfo.shipping_address.first_name} required type="text" onChange={e => {setAdditionalCartInfo({...additionalCartInfo, billing_address:{...additionalCartInfo.billing_address, first_name:e.currentTarget.value}})}} placeholder="First name" id="first_name" />
                                <Input value={additionalCartInfo.shipping_address.last_name} required type="text" onChange={e => {setAdditionalCartInfo({...additionalCartInfo, billing_address:{...additionalCartInfo.billing_address, last_name:e.currentTarget.value}})}} placeholder="Last name" id="last_name" />
                                <Input value={additionalCartInfo.shipping_address.phone} type="tel" onChange={e => {setAdditionalCartInfo({...additionalCartInfo, billing_address:{...additionalCartInfo.billing_address, phone:e.currentTarget.value}})}} placeholder="Phone number" id="phone" />
                                <Input value={additionalCartInfo.shipping_address.company} type="text" onChange={e => {setAdditionalCartInfo({...additionalCartInfo, billing_address:{...additionalCartInfo.billing_address, company:e.currentTarget.value}})}} placeholder="Company name" id="company" />
                                <Input value={additionalCartInfo.shipping_address.address_1} required type="text" onChange={e => {setAdditionalCartInfo({...additionalCartInfo, billing_address:{...additionalCartInfo.billing_address, address_1:e.currentTarget.value}})}} placeholder="Address line 1" id="address_1" />
                                <Input value={additionalCartInfo.shipping_address.address_2} type="text" onChange={e => {setAdditionalCartInfo({...additionalCartInfo, billing_address:{...additionalCartInfo.billing_address, address_2:e.currentTarget.value}})}} placeholder="Address line 2" id="address_2" />
                                <Input value={additionalCartInfo.shipping_address.city} required type="text" onChange={e => {setAdditionalCartInfo({...additionalCartInfo, billing_address:{...additionalCartInfo.billing_address, city:e.currentTarget.value}})}} placeholder="City" id="city" />
                                <Select value={additionalCartInfo.shipping_address.country_code} onValueChange={e => {setAdditionalCartInfo({...additionalCartInfo, billing_address:{...additionalCartInfo.billing_address, country_code:e}})}} className={styles.flex}>
                                    <Select.Trigger>
                                        <Select.Value placeholder="Country" />
                                    </Select.Trigger>
                                    <Select.Content>
                                        {region?.countries.map((country) => (
                                        <Select.Item key={country.id} value={country.iso_2}>
                                            {country.display_name}
                                        </Select.Item>
                                        ))}
                                    </Select.Content>
                                </Select>
                                <Input value={additionalCartInfo.shipping_address.province} required type="text" onChange={e => {setAdditionalCartInfo({...additionalCartInfo, billing_address:{...additionalCartInfo.billing_address, province:e.currentTarget.value}})}} placeholder="Province" id="province" />
                                <Input value={additionalCartInfo.shipping_address.postal_code} required type="text" onChange={e => {setAdditionalCartInfo({...additionalCartInfo, billing_address:{...additionalCartInfo.billing_address, postal_code:e.currentTarget.value}})}} placeholder="Postal code" id="postal_code" />
                            </div>
                        }
                    </Prompt.Description>
                    </Prompt.Header>
                    <Prompt.Footer>
                        <Prompt.Cancel>Close</Prompt.Cancel>
                        <Prompt.Action onClick={updateCartInfo}>Update</Prompt.Action>
                    </Prompt.Footer>
                </Prompt.Content>
            </Prompt>
        </div>
    )
}