import { CompletionArgs, CompletionResponse } from "./types";
export declare const getCompletion: ({ apiKey, imagePath, maintainFormat, priorPage, }: CompletionArgs) => Promise<CompletionResponse>;
