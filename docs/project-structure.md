# 🗄️ Project Structure

## 📌 Overview  

This project is a React-based POS system built with TypeScript and Vite. It integrates with **MedusaJS** for backend e-commerce operations and **Stripe** for payment processing. The application is deployed using **Railway** for seamless CI/CD. The modular folder structure ensures scalability and maintainability.  

---

## 📂 Folder Description

```sh
medusa-pos-react/
├── src/
│   ├── app/
│   │   ├── NotFound.tsx           # Handles 404 routes or unmatched paths.
│   │
│   ├── components/
│   │   ├── Customer.tsx           # Component for managing customer information.
│   │   ├── Notes.tsx              # Component for managing customer notes.
│   │
│   ├── lib/
│   │   ├── medusa-provider.ts     # Provides Medusa-related utilities and hooks.
│   │
│   ├── modules/
│   │   ├── checkout/
│   │   │   ├── components/
│   │   │   │   ├── CheckoutForm.tsx     # Form for collecting checkout details.
│   │   │   ├── template/
│   │   │   │   ├── Checkout.tsx         # Main checkout page template.
│   │   │   ├── routes/
│   │   │   │   ├── Routes.tsx           # Defines routes related to the checkout process.
│   │   │
│   │   ├── credit-card/
│   │   │   ├── template/
│   │   │   │   ├── CreditCard.tsx       # Template for managing credit card inputs and details.
│   │   │
│   │   ├── customer-order-notes/
│   │   │   ├── template/
│   │   │   │   ├── CustomerOrderNote.tsx # Template for displaying customer order notes.
│   │   │
│   │   ├── draft-orders/
│   │   │   ├── component/
│   │   │   │   ├── DraftOrderCard.tsx    # Component for displaying a single draft order card.
│   │   │   ├── template/
│   │   │   │   ├── DraftOrder.tsx        # Template for managing and viewing draft orders.
│   │   │
│   │   ├── draft-order-notes/
│   │   │   ├── template/
│   │   │   │   ├── DraftOrderNote.tsx    # Template for displaying draft order notes.
│   │   │
│   │   ├── existing-customer/
│   │   │   ├── template/
│   │   │   │   ├── ExistingCustomer.tsx  # Template for handling existing customer details.
│   │   │
│   │   ├── login/
│   │   │   ├── template/
│   │   │   │   ├── Login.tsx             # Template for login page and authentication.
│   │   │
│   │   ├── main-page/
│   │   │   ├── template/
│   │   │   │   ├── Main.tsx              # Template for the main application page.
│   │   │
│   │   ├── registration/
│   │   │   ├── template/
│   │   │   │   ├── Registration.tsx      # Template for the user registration page.
│   │   │
│   │   ├── shopping-pannel/
│   │   │   ├── component/
│   │   │   │   ├── Product.tsx           # Component for displaying a single product.
│   │   │   ├── template/
│   │   │   │   ├── ShoppingPannel.tsx    # Template for the shopping panel interface.
│   │   │
│   │   ├── success/
│   │   │   ├── Success.tsx               # Page displayed after a successful operation (e.g., checkout).
│   │   │
│   │   ├── terminals/
│   │   │   ├── component/
│   │   │   │   ├── StripeTerminals.tsx   # Component for managing Stripe terminal operations.
│   │   │   ├── data/
│   │   │   │   ├── stripeTerminals.tsx   # Static data related to Stripe terminals.
│   │   │   ├── template/
│   │   │   │   ├── Terminal.tsx          # Template for viewing terminal details.
│   │   │
│   │   ├── type-of-customers/
│   │   │   ├── template/
│   │   │   │   ├── TypeOfCustomer.tsx    # Template for displaying different customer types.
│   │
│   ├── routes/
│   │   ├── AppRoutes.tsx          # Centralized routing for the app.
│   │   ├── Routes.tsx             # Additional routing configurations.
│   │
│   ├── styles/
│   │   ├── index.css              # Global styles for the application.
│   │
│   ├── test/
│   │   ├── component/
│   │   │   ├── Form.tsx           # Component for testing form functionality.
│   │   ├── TestProduct.tsx        # Test component for product-related logic.
│
├── public/                        # Public assets served directly (e.g., images, icons).
```
This outlines the modular folder structure of the project for scalability and maintainability


---

## 🔧 File Naming Conventions

- `PascalCase` for components: `CheckoutForm.tsx`
- `kebab-case` for styles: `shopping-panel.css`
- `camelCase` for utility functions: `fetchCustomerData.ts`

---

## 🔗 Key Dependencies

- **React Router Dom**: Handles client-side routing and navigation.  
- **TailwindCSS**: Utility-first CSS framework for rapid UI development.  
- **MedusaJS**: Backend system for e-commerce management.  
- **Stripe**: Manages secure and flexible payment processing.  
- **Vite**: A fast build tool and development server optimized for modern web development.  
- **Railway**: Deployment platform offering CI/CD for a smooth deployment workflow.  

---

## 📚 Data Guidelines

- Static data objects reside in `data/` folders inside modules.
- Ensure data consistency using TypeScript definitions.

---

## 🚀 Build & Deployment

### Build Instructions

1. Install dependencies: `npm install`.
2. Create a production build: `npm run build`.

### Deployment with Railway

1. Ensure the Medusa backend is running and configured with Railway.
2. Set the `RAILWAY_ENVIRONMENT` variable for Vite.
3. Deploy the frontend by linking the repository to Railway.

### Stripe Configuration

1. Add `STRIPE_API_KEY` to the environment variables on Railway.
2. Ensure webhook endpoints are configured for real-time updates.


This updated version accommodates your **React TypeScript Vite**, **Railway**, and **Stripe** stack, providing clarity on the tech stack, folder usage, and deployment workflows. Let me know if you need further adjustments!


