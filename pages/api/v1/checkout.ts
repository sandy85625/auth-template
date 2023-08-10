import { NextApiRequest, NextApiResponse } from "next";
import { stripe } from "../../../utils/stripe";
import { BASE_URL } from "../../../constants";
import { NFTMetadata } from "../../../interfaces/nft-forms";

interface RequestBody {
    nft: NFTMetadata;
    email: string;
    walletID: string
  }

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if(req.method == 'POST'){
            const { nft, email, walletID } = req.body as RequestBody;
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

            if (!nft.id) {
                return res.status(400).json({ error: "NFT ID is missing" });
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
                    email: email,
                    collectionId: nft.collectionId,
                    nftId: nft.id,
                    walletID: walletID

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