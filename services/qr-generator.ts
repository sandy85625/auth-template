import QRCode from "qrcode";

type ImageClassColors = 
    'silver' | 'gold' | 'bronze' | 'platinum' | 'ruby' | 'emerald' | 'sapphire' | 'crystalline' | 'precious';

type ColorMapping = {
    [key in ImageClassColors]: string;
};

export async function generateQRCode(url: string, imageClass: string, logoImage: string): Promise<Blob> {

    const colorMapping: ColorMapping = {
        silver: '#C0C0C0',      // Silver color
        gold: '#FFD700',        // Gold color
        bronze: '#CD7F32',      // Bronze color
        platinum: '#E5E4E2',    // Platinum color
        ruby: '#9B111E',        // Ruby color (deep red)
        emerald: '#50C878',     // Emerald color (green)
        sapphire: '#0F52BA',    // Sapphire color (blue)
        crystalline: '#A7D8DE', // Crystalline color (light blue/cyan-ish)
        precious: '#D7DFE2'     // Precious color (silverish but lighter than platinum/silver for distinction)
    };

    const backgroundColor = colorMapping[imageClass.toLowerCase() as ImageClassColors] || '#FFFFFF';

    try {
        const qrCodeDataURL = await QRCode.toDataURL(url, {
            color: {
                dark: '#000000', // QR code color
                light: '#0000'   // Transparent background
            }
        });
    
        const image = new Image();
        image.src = qrCodeDataURL;
    
        return new Promise<Blob>((resolve, reject) => {
            image.onload = () => {
                // Load the logo
                const logoImgElement = new Image();
                logoImgElement.crossOrigin = "anonymous";
                logoImgElement.src = logoImage;
    
                logoImgElement.onload = () => {
                    const canvas = document.createElement('canvas');
                    canvas.width = image.width;
                    canvas.height = image.height;
                    const ctx = canvas.getContext('2d');
    
                    if (!ctx) {
                        reject(new Error('Failed to get 2D context from canvas'));
                        return;
                    }
    
                    // Draw the background
                    ctx.fillStyle = backgroundColor;
                    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
                    // Draw the QR code on top
                    ctx.drawImage(image, 0, 0);
    
                    // Draw the logo in the center of the QR code
                    const logoSize = Math.min(canvas.width, canvas.height) * 0.2; // 20% of the QR code's size
                    const logoX = (canvas.width - logoSize) / 2;
                    const logoY = (canvas.height - logoSize) / 2;
                    ctx.drawImage(logoImgElement, logoX, logoY, logoSize, logoSize);
    
                    canvas.toBlob(blob => {
                        if (blob) {
                            resolve(blob);
                        } else {
                            reject(new Error('Failed to create blob from canvas'));
                        }
                    });
                };
    
                logoImgElement.onerror = (err) => {
                    reject(new Error('Failed to load logo image: ' + err.toString()));
                };
            };
    
            image.onerror = (err) => {
                reject(new Error('Failed to load QR code image: ' + err.toString()));
            };
        });
    
    } catch (err) {
        console.error(err);
        throw new Error("An error occurred while generating the QR code");
    }
    
}    