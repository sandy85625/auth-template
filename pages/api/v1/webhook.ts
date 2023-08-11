import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
import { updateNFTWalletId } from '../../../api/nft';
import { stripe } from '../../../utils/stripe';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const sig = req.headers['stripe-signature'];

    let event: Stripe.Event;

    const rawBody = await getRawBody(req);

    try {
      event = stripe.webhooks.constructEvent(rawBody, sig!, process.env.NEXT_PUBLIC_STRIPE_WEBHOOK_SECRET!);
    } catch (err: any) {
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === 'checkout.session.completed') {
      
        const session = event.data.object as Stripe.Checkout.Session;
      
        if(session && session.payment_status === 'paid' && session.metadata) {
          
            const collectionId = session.metadata.collectionId;
            const nftId = session.metadata.nftId;
            const walletID = session.metadata.walletID;

            try {
                await updateNFTWalletId(collectionId, nftId, walletID);
            } catch (error) {
                console.error("Failed to update NFT Wallet ID:", error);
            }
        }
    }

    // Return a response to acknowledge the event has been processed
    return res.json({ received: true });

  } else {
    // Handle other HTTP methods
    return res.setHeader('Allow', 'POST')
      .status(405)
      .end('Method Not Allowed');
  }
}

function getRawBody(req: NextApiRequest): Promise<string> {
  return new Promise((resolve, reject) => {
    let data = '';
    req.on('data', (chunk) => {
      data += chunk;
    });
    req.on('end', () => {
      resolve(data);
    });
  });
}
