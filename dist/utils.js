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
exports.convertPdfToImages = exports.downloadFile = exports.isValidUrl = exports.isString = exports.formatMarkdown = exports.encodeImageToBase64 = void 0;
var pdf2pic_1 = require("pdf2pic");
var promises_1 = require("stream/promises");
var axios_1 = __importDefault(require("axios"));
var fs_extra_1 = __importDefault(require("fs-extra"));
var path_1 = __importDefault(require("path"));
var encodeImageToBase64 = function (imagePath) { return __awaiter(void 0, void 0, void 0, function () {
    var imageBuffer;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fs_extra_1.default.readFile(imagePath)];
            case 1:
                imageBuffer = _a.sent();
                return [2 /*return*/, imageBuffer.toString("base64")];
        }
    });
}); };
exports.encodeImageToBase64 = encodeImageToBase64;
// Strip out the ```markdown wrapper
var formatMarkdown = function (text) {
    var formattedMarkdown = text
        .replace(/^```[a-z]*\n([\s\S]*?)\n```$/g, "$1")
        .replace(/^```\n([\s\S]*?)\n```$/g, "$1");
    return formattedMarkdown;
};
exports.formatMarkdown = formatMarkdown;
var isString = function (value) {
    return value !== null;
};
exports.isString = isString;
var isValidUrl = function (string) {
    var url;
    try {
        url = new URL(string);
    }
    catch (_) {
        return false;
    }
    return url.protocol === "http:" || url.protocol === "https:";
};
exports.isValidUrl = isValidUrl;
// Save file to local tmp directory
var downloadFile = function (_a) { return __awaiter(void 0, [_a], void 0, function (_b) {
    var localPdfPath, writer, response;
    var filePath = _b.filePath, tempDir = _b.tempDir;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                localPdfPath = path_1.default.join(tempDir, path_1.default.basename(filePath.split("?")[0]));
                if (!(0, exports.isValidUrl)(filePath)) return [3 /*break*/, 3];
                writer = fs_extra_1.default.createWriteStream(localPdfPath);
                return [4 /*yield*/, (0, axios_1.default)({
                        url: filePath,
                        method: "GET",
                        responseType: "stream",
                    })];
            case 1:
                response = _c.sent();
                if (response.status !== 200) {
                    throw new Error("HTTP error! Status: ".concat(response.status));
                }
                return [4 /*yield*/, (0, promises_1.pipeline)(response.data, writer)];
            case 2:
                _c.sent();
                return [3 /*break*/, 5];
            case 3: 
            // If filePath is a local file, copy it to the temp directory
            return [4 /*yield*/, fs_extra_1.default.copyFile(filePath.split("?")[0], localPdfPath)];
            case 4:
                // If filePath is a local file, copy it to the temp directory
                _c.sent();
                _c.label = 5;
            case 5: return [2 /*return*/, localPdfPath];
        }
    });
}); };
exports.downloadFile = downloadFile;
// Convert each page to a png and save that image to tmp
// @TODO: pull dimensions from the original document. Also, look into rotated pages
var convertPdfToImages = function (_a) { return __awaiter(void 0, [_a], void 0, function (_b) {
    var options, storeAsImage, convertResults, err_1;
    var localPath = _b.localPath, tempDir = _b.tempDir;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                options = {
                    density: 300,
                    format: "png",
                    height: 1056,
                    preserveAspectRatio: true,
                    saveFilename: path_1.default.basename(localPath.split("?")[0], path_1.default.extname(localPath.split("?")[0])),
                    savePath: tempDir,
                };
                storeAsImage = (0, pdf2pic_1.fromPath)(localPath.split("?")[0], options);
                _c.label = 1;
            case 1:
                _c.trys.push([1, 4, , 5]);
                return [4 /*yield*/, storeAsImage.bulk(-1, {
                        responseType: "buffer",
                    })];
            case 2:
                convertResults = _c.sent();
                return [4 /*yield*/, Promise.all(convertResults.map(function (result) { return __awaiter(void 0, void 0, void 0, function () {
                        var paddedPageNumber, imagePath;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (!result || !result.buffer) {
                                        throw new Error("Could not convert page to image buffer");
                                    }
                                    if (!result.page)
                                        throw new Error("Could not identify page data");
                                    paddedPageNumber = result.page.toString().padStart(5, "0");
                                    imagePath = path_1.default.join(tempDir, "".concat(options.saveFilename, "_page_").concat(paddedPageNumber, ".png"));
                                    return [4 /*yield*/, fs_extra_1.default.writeFile(imagePath, result.buffer)];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); }))];
            case 3:
                _c.sent();
                return [2 /*return*/, convertResults];
            case 4:
                err_1 = _c.sent();
                console.error("Error during PDF conversion:", err_1);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.convertPdfToImages = convertPdfToImages;
