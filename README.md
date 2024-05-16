## Install Stripe Plugin to your Medusa backend:

Once you have set up your Medusa server, navigate to your Medusa backend (server):

`cd my-medusa`

Install official Stripe plug-in:

`npm install medusa-payment-stripe`

You can follow directions here: [https://medusajs.com/plugins/medusa-payment-stripe/](https://medusajs.com/plugins/medusa-payment-stripe/)

## Add routes to your Medusa server (backend):

This repository contains backend routes for integrating Stripe terminal functionality into a Medusa server. To set up these routes, follow the instructions below:

1. Navigate to your Medusa server backend directory, typically found at `/path/to/your/medusa/server`.
2. Within the backend directory, locate or create the `/api` directory.
3. Inside the `/api` directory, check if there is an existing `/store` directory. If it exists, proceed to the next step. If not, create the `/store` directory.
4. Within the `/store` directory, create a new directory named `/terminal`.
5. Copy the following files from the `medusa-pos-react/api/store/terminal` directory into the newly created `/terminal` directory in your Medusa server backend:

   - `connection-token/route.ts`
   - `locations.js`
   - `capture-payment-intent/route.ts`
   - `create-payment-intent/route.ts`
6. Ensure that you have set the `STRIPE_API_KEY` in your Medusa server's `.env` file. This key is necessary for the Stripe integration to function correctly.
7. After copying the files and setting the environment variable, restart your Medusa server to apply the changes.

## Configure your Medusa Server CORS:

Ensure that the CORS configuration and API keys are correctly set in your Medusa server's `.env` file. The settings should be as follows:

- `STORE_CORS` should include the URL where your POS will run. For example, it can be set to "http://localhost:3000".
- `ADMIN_CORS` should include the URL where your POS will run. For example, it can be set to "http://localhost:3000".
- `STRIPE_API_KEY` should be set to your Stripe secret key.

The example is in `.env.template` file

By following these steps, you will have successfully added Stripe terminal routes to your Medusa server backend, allowing for payment processing through Stripe's terminal devices.
