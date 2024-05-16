import Stripe from "stripe";
import type { MedusaRequest, MedusaResponse } from "@medusajs/medusa";

const stripe = new Stripe(process.env.STRIPE_API_KEY, {
    apiVersion: "2022-11-15",
});
  
export async function POST(req: MedusaRequest, res: MedusaResponse) {
  if (req.body && typeof req.body === 'object' && 'payment_intent_id' in req.body && typeof req.body.payment_intent_id === 'string') {
    const intent = await stripe.paymentIntents.capture(req.body.payment_intent_id);
    res.send(intent);
  } else {
    res.status(400).send({ error: 'Invalid request body' });
  }
}
