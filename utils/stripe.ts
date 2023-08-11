import Stripe from "stripe";
import dotenv from 'dotenv';

dotenv.config()

const stripeKey = process.env.NEXT_PUBLIC_STRIPE_TEST_API_KEY

export const stripe = new Stripe(stripeKey!, {
    apiVersion: "2022-11-15",
    typescript: true
})