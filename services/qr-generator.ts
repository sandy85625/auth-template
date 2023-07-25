import QRCode from "qrcode";

function dataURLtoBlob(dataurl: string) {
    const arr = dataurl.split(',');
    const match = arr[0].match(/:(.*?);/);
    if (!match) {
        throw new Error('Invalid data URL');
    }
    const mime = match[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], {type: mime});
}

export async function generateQRCode(url: string, imageClass: string, logoImage: string) {
    try {
        const qrCodeDataURL = await QRCode.toDataURL(url);
        return dataURLtoBlob(qrCodeDataURL);
    } catch (err) {
        console.error(err);
        throw new Error("An error occurred while generating the QR code");
    }
}