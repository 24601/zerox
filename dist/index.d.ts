import { ZeroxArgs, ZeroxOutput } from "./types";
export declare const zerox: ({ cleanup, concurrency, filePath, maintainFormat, openaiAPIKey, outputDir, tempDir, }: ZeroxArgs) => Promise<ZeroxOutput>;
