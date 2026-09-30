declare let encryptionServiceWorker: any;
export { encryptionServiceWorker };
export declare function generatePassword(clearTextPwd: string): Promise<IPassword>;
export declare function getPassword(clearTextPwd: string, config: IPassword): Promise<IPassword>;
export declare function generateEncryptionKey(clearTextPwd: string): Promise<{
    encryptionData: IEncryption;
    key: CryptoKey;
}>;
export declare function getEncryption(clearTextPwd: string, config: IEncryption): Promise<{
    encryptionData: IEncryption;
    key: CryptoKey;
}>;
export declare function setupCrypto(clearTextPwd: string, projectData: ICrypto): Promise<boolean>;
export declare function clearCrypto(): Promise<void>;
export declare function encryptData(data: string): Promise<string>;
export declare function decryptData(data: string): Promise<string>;
export interface IPassword {
    salt: string;
    password: string;
    iterations?: number;
    algorithm?: 'sha256' | 'pbkdf2';
}
export interface IEncryption {
    key: {
        salt: string;
        iterations?: number;
        algorithm?: 'pbkdf2';
    };
    algorithm?: 'AES-GCM';
    iv?: string;
    b64IV?: Buffer;
}
export interface ICrypto {
    password?: IPassword;
    encryption?: IEncryption;
}
