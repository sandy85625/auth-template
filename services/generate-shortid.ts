import shortid from 'shortid';
import { BASE_URL } from '../constants';

/**
 * Function to generate a number of unique short IDs and append them to an external URL
 *
 * @param {number} numberOfNfts - Number of short IDs to be generated
 * 
 * @returns {Object} - Object containing arrays of URLs with appended short IDs and long URLs
 */
const generateShortIds = (numberOfNfts: number): string[] => {
    try {
        // Generate an array with the required length and fill it with URLs constructed from the BASE_URL and a unique short ID
        const urls = Array.from({ length: numberOfNfts }, () => `${BASE_URL}/nfts/${shortid.generate()}`);
  
        return urls;
    } catch (error) {
        throw new Error('Unable to generate short URLs due to an error');
    }
}

export default generateShortIds;
