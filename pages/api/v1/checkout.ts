import { NextApiRequest, NextApiResponse } from "next";
import { stripe } from "../../../utils/stripe";
import { BASE_URL } from "../../../constants";
import { NFTMetadata } from "../../../interfaces/nft-forms";

interface RequestBody {
    nft: NFTMetadata;
    email: string;
  }

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if(req.method == 'POST'){
            const { nft, email } = req.body as RequestBody;
            const modifiedItem = {
                quantity: 1,
                price_data: {
                    currency: "inr",
                    unit_amount: nft.basePrice * 100,
                    product_data: {
                        name: nft.name,
                        description: nft.description,
                        images: [nft.image]
                    }
                }
            }

            const session = await stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                shipping_address_collection: {
                    allowed_countries: ["IN"]
                },
                line_items: [modifiedItem],
                mode: 'payment',
                success_url: `${BASE_URL}/checkout/success`,
                cancel_url: `${BASE_URL}/checkout/cancel`,
                metadata: {
                    email: email
                }
            })

            res.status(200).json({
                id: session.id
            })
        }  
    } catch (error) {
        res.status(500).json({error: error})
    }

}