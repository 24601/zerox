"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCompletion = void 0;
var axios_1 = __importDefault(require("axios"));
var utils_1 = require("./utils");
var getCompletion = function (_a) { return __awaiter(void 0, [_a], void 0, function (_b) {
    var systemPrompt, messages, base64Image, response, data, err_1;
    var apiKey = _b.apiKey, imagePath = _b.imagePath, maintainFormat = _b.maintainFormat, priorPage = _b.priorPage;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                systemPrompt = "\n    Convert the following PDF page to markdown.\n    Return only the markdown with no explanation text.\n    Do not exclude any content from the page.\n    Since this is a PDF, it may have embedded images, if you find any images or anything that looks like an image or picture, create a placeholder for it in the markdown and generate a very descriptive caption that is a detailed description of the image.\n  ";
                messages = [{ role: "system", content: systemPrompt }];
                // If content has already been generated, add it to context.
                // This helps maintain the same format across pages
                if (maintainFormat && priorPage && priorPage.length) {
                    messages.push({
                        role: "system",
                        content: "Markdown must maintain consistent formatting with the following page: \n\n \"\"\"".concat(priorPage, "\"\"\""),
                    });
                }
                return [4 /*yield*/, (0, utils_1.encodeImageToBase64)(imagePath)];
            case 1:
                base64Image = _c.sent();
                messages.push({
                    role: "user",
                    content: [
                        {
                            type: "image_url",
                            image_url: { url: "data:image/png;base64,".concat(base64Image) },
                        },
                    ],
                });
                _c.label = 2;
            case 2:
                _c.trys.push([2, 4, , 5]);
                return [4 /*yield*/, axios_1.default.post("https://api.openai.com/v1/chat/completions", {
                        messages: messages,
                        model: "gpt-4o-mini",
                        temperature: 0,
                    }, {
                        headers: {
                            Authorization: "Bearer ".concat(apiKey),
                            "Content-Type": "application/json",
                        },
                    })];
            case 3:
                response = _c.sent();
                data = response.data;
                return [2 /*return*/, {
                        content: data.choices[0].message.content,
                        inputTokens: data.usage.prompt_tokens,
                        outputTokens: data.usage.completion_tokens,
                    }];
            case 4:
                err_1 = _c.sent();
                console.error("Error in OpenAI completion", err_1);
                throw err_1;
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.getCompletion = getCompletion;
