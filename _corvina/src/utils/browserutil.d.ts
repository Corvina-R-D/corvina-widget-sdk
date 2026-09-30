export declare function createDownloadFile(fileName: string, data: any, type?: string): void;
export declare function connectFetchRequestToWritableFileStream(fetchRequest: Promise<Response>, fileName: string, type?: string): Promise<void>;
export declare function importFont(document: Document, fontname: string, fonts: Array<{
    url: string;
    format?: string;
}>): void;
export declare function convertToBase64(file: File): Promise<string | ArrayBuffer>;
export declare function fixRtl(text: string): string;
export declare const sanitizeLrmCopy: {
    bind: (el: any) => void;
};
export declare function calculateTotalScrollTop(element: HTMLElement): number;
