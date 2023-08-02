import Razorpay from 'razorpay';
import { NextApiRequest, NextApiResponse } from 'next';

const instance = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_API_KEY!,
  key_secret: process.env.NEXT_PUBLIC_RAZORPAY_API_SECRET_KEY!
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const options = {
        amount: req.body.amount * 100,
        currency: "INR",
        receipt: `receipt_order_${Date.now()}`
      };

      const order = await instance.orders.create(options);
      if (!order) return res.status(500).send("Some error occurred");

      return res.status(200).json(order);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
};
