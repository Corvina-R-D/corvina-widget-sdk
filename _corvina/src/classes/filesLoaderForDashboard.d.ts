export declare function readFile(file: File, options?: {
    type: "text" | "binary";
}): Promise<string>;
export declare function loadRemoteFile(url: string): Promise<any>;
