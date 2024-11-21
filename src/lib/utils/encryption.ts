import Cryptr from "cryptr";

export function encrypt(text: string){
    const secretKey = process.env.NEXTAUTH_SECRET;
    const cryptr = new Cryptr(secretKey??"");

    const encryptedString = cryptr.encrypt(text as string);
    return encryptedString;
}

export function decrypt(encryptedString: string | undefined){
    const secretKey = process.env.NEXTAUTH_SECRET;
    const cryptr = new Cryptr(secretKey??"");
    
    const text = cryptr.decrypt(encryptedString as string);
    return text;
}