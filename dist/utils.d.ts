export declare const encodeImageToBase64: (imagePath: string) => Promise<string>;
export declare const formatMarkdown: (text: string) => string;
export declare const isString: (value: string | null) => value is string;
export declare const isValidUrl: (string: string) => boolean;
export declare const downloadFile: ({ filePath, tempDir, }: {
    filePath: string;
    tempDir: string;
}) => Promise<string | void>;
export declare const convertPdfToImages: ({ localPath, tempDir, }: {
    localPath: string;
    tempDir: string;
}) => Promise<import("pdf2pic/dist/types/convertResponse").BufferResponse[] | undefined>;
