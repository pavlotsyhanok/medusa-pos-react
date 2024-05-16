import Stripe from "stripe";
import type { MedusaRequest, MedusaResponse } from "@medusajs/medusa";

const stripe = new Stripe(process.env.STRIPE_API_KEY, {
    apiVersion: "2022-11-15",
});
  
export async function POST(req: MedusaRequest, res: MedusaResponse) {
    try {
      const connectionToken = await stripe.terminal.connectionTokens.create();
      res.status(200).json({ connection_token: connectionToken });
    } catch (error) {
      console.error('Error creating connection token:', error);
      res.status(500).json({ error: "Failed to create connection token" });
    }
}
