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
