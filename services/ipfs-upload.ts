import FormData from 'form-data';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

export default async function uploadToIPFS(rawData: Blob, fileName: string) {
  try {
    const apiKey = process.env.NEXT_PUBLIC_INFURA_API_KEY;
    const apiKeySecret = process.env.NEXT_PUBLIC_INFURA_API_SECRET_KEY;

    if (!apiKey || !apiKeySecret) {
      throw new Error(`Infura Apikey not found!`);
    }

    // Create form data and append rawData
    const data = new FormData();
    data.append('file', rawData, { filename: fileName });

    // Axios config
    const config = {
      method: 'post',
      url: 'https://ipfs.infura.io:5001/api/v0/add?pin=true&cid-version=0&hash=sha2-256',
      headers: {
        'Authorization': 'Basic ' + Buffer.from(`${apiKey}:${apiKeySecret}`).toString('base64'),
        ...data.getHeaders(), // Add form data headers
      },
      data: data,
    };

    // Make the axios request
    const response = await axios(config);

    // Return the JSON response
    return await response.data;

  } catch (error: any) {
    throw new Error(`Error at IPFS upload: ${error.message}`)
  }
}
