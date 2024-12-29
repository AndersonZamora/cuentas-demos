import crypto from 'crypto';
const algorithm = 'aes-256-cbc';

export const decryptPasswordAsync = async (encryptedData: string, iv: string): Promise<{ decryptedData: string }> => {

    const secretKey = process.env.NEXT_PUBLIC_SECRET_KEY;

    if (!secretKey || secretKey.length !== 32) {
        throw new Error('Error 8990 no controlado - contacte al administrador');
    }

    try {
        const originData = Buffer.from(iv, 'base64');
        const deciper = crypto.createDecipheriv(algorithm, secretKey, originData);
        let decryptedData = deciper.update(encryptedData, 'hex', 'utf-8');
        decryptedData += deciper.final('utf-8');
        return {
            decryptedData
        };
    } catch (error) {
        throw new Error('No se pudo desifrar el password');
    }
};
