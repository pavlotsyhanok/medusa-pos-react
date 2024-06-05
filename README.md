# MedusaJS Point of Sale (POS) Application

![POS Application Interface](./public/coming-soon/thumbnail-image.jpg)

This Point of Sale (POS) application, built using React, is designed to support B2B flows and integrates seamlessly with the Medusa backend through API interfaces. It supports Stripe POS devices for efficient payment processing, catering to both mobile and desktop platforms as a Progressive Web App (PWA).

## ⚠️ Branching Information

Please note that the latest production build is being built in the `pos/develop` branch.

If you wish to run the legacy version of the non-production application, please check out the `pos/legacy` branch.

Each branch contains instructions in its respective `readme.md` file.

### Branches

- **`pos/develop`** - Current POS application development.
- **`medusa/api`** - Necessary routes for your Medusa server.
- **`medusa/legacy`** - Legacy version of the application designed for testing routes and Stripe terminal integration.
- **`pos/architecture`** - Visual architecture reference and design of the application.

This is a Next.js project bootstrapped with [`create-plasmic-app`](https://www.npmjs.com/package/create-plasmic-app).

## How to Start

1. Clone the repository:

```bash
git clone https://github.com/pavlotsyhanok/medusa-pos-react.git
```
2. Install dependencies:

```bash
npm install
```
3. Run the development server:

```bash
npm run dev
```

## Key Features

- **Customer Onboarding:** Facilitate in-store new customer registration and securely store payment methods via Stripe.
- **B2B Optimized Flows:** Full support for unique customer group properties and tailored price lists.
- **Pre-orders and Backorders:** Authenticate funds and securely store payment methods for future charges.
- **Order Management:** Supports draft orders and provides shipping quotes based on the Medusa backend configuration.
- **Sales Rep Analytics:** Track sales performance and establish goals through configurable events.

## Tech Stack

- **Platforms:** Mobile, Tablet, Desktop (PWA)
- **Frameworks:** React for UI, CapacitorJS for device API interactions
- **Future Development:** Plans to incorporate React Native

![POS Flows](./public/coming-soon/pos-layout.png)

## Project Status

**Current Phase:** In Development

![POS Flows](./public/coming-soon/preview.png)

### Completed Workflows

- **Security:** Authentication and route protection, including admin login.
- **Checkout Processes:** Integration with Medusa checkout flows and Stripe POS terminal.
- **Customer Handling:** Supports both guest and B2B checkout flows with applied price lists.
- **Promotions:** Implementation of manual discounts and coupon applications.
- **Operational Tools:** Features like order tracking, barcode scanning, and product search.

![POS Flows](./public/coming-soon/pos-flows.png)

## To-Do

- **Performance Metrics:** Implement scoring systems for sales representatives.
- **Payment Expansion:** Integration with Square POS functionalities.

## Coming Soon

This repository will soon be updated with the full project under the "Coming Soon" folder. Stay tuned for the release!

## Stay Tuned

Stay tuned for further updates as we progress towards general availability, aiming to enhance the retail experience with innovative technology solutions.
