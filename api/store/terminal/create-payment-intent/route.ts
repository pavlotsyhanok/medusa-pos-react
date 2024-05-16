import Stripe from "stripe";
import type { MedusaRequest, MedusaResponse } from "@medusajs/medusa";

const stripe = new Stripe(process.env.STRIPE_API_KEY, {
    apiVersion: "2022-11-15",
});



interface PaymentIntentBody {
  amount: number;
  // include other properties that might be in the body
}

export async function POST(req: MedusaRequest, res: MedusaResponse) {
  const body = req.body as PaymentIntentBody;
  const intent = await stripe.paymentIntents.create({
    amount: body.amount,
    currency: 'cad',
    payment_method_types: [
      'card_present',
      'interac_present',
    ],
    capture_method: 'manual',
  });
  res.json(intent);
}
