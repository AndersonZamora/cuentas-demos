import crypto from 'crypto';
const algorithm = 'aes-256-cbc';
const iv = crypto.randomBytes(16);

interface ICiph {
    iv: string;
    newPass: string;
}

export const encryptPasswordAsync = async (password: string): Promise<ICiph> => {

    const key = process.env.NEXT_PUBLIC_SECRET_KEY;

    if (!key || key.length !== 32) {
        throw new Error('Error 8989 no controlado - contacte al administrador');
    }

    const cipher = crypto.createCipheriv(algorithm, key, iv);
    let encryptedData = cipher.update(password, 'utf-8', 'hex');
    encryptedData += cipher.final('hex');
    const base64data = Buffer.from(iv).toString('base64')

    return {
        iv: base64data,
        newPass: encryptedData
    };
};
