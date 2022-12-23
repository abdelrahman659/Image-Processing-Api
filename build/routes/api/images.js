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
exports.routes = exports.images = void 0;
var express_1 = __importDefault(require("express"));
var path_1 = __importDefault(require("path"));
var handel_ImageResize_1 = require("../../utils/handel_ImageResize");
var fs_1 = require("fs");
var fs_2 = __importDefault(require("fs"));
exports.images = express_1.default.Router();
exports.routes = express_1.default.Router();
// API That Take a fileName and Hight&Width to Resize Image And check if the bath of file is correct to save Image after Resized .
exports.images.get('/', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var fileName, height, width, saveImgPath, newImage, _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 6, , 7]);
                fileName = req.query.fileName;
                height = parseInt(req.query.height);
                ////check if A height & width are A positive Numbers
                if (Number.isNaN(height) || height < 1 || height === 0) {
                    return [2 /*return*/, res
                            .status(200)
                            .send('height Must be a positive Number and cant` be Zero')];
                }
                width = parseInt(req.query.width);
                if (Number.isNaN(width) || width < 1 || width === 0) {
                    return [2 /*return*/, res
                            .status(200)
                            .send('width Must be a positive Number and cant` be Zero')];
                }
                saveImgPath = (0, handel_ImageResize_1.resizedImage)(fileName, height, width);
                if (!!fs_2.default.existsSync(saveImgPath)) return [3 /*break*/, 5];
                _c.label = 1;
            case 1:
                _c.trys.push([1, 4, , 5]);
                return [4 /*yield*/, (0, handel_ImageResize_1.resizeImage)(fileName, height, width)];
            case 2:
                newImage = _c.sent();
                return [4 /*yield*/, fs_1.promises.writeFile(saveImgPath, newImage)];
            case 3:
                _c.sent();
                return [3 /*break*/, 5];
            case 4:
                _a = _c.sent();
                return [2 /*return*/, res.status(200).send('Image Name is Not Correct')];
            case 5: 
            //Transfer the file at the given path & resolve to an absolute path .
            return [2 /*return*/, res.sendFile(path_1.default.resolve(saveImgPath))];
            case 6:
                _b = _c.sent();
                return [2 /*return*/, res
                        .status(200)
                        .send('Here is an Example of the right path : http://localhost:8000/api/images?fileName=fjord&height=200&width=200')];
            case 7: return [2 /*return*/];
        }
    });
}); });
// Api that Return a Copy of the Images Array
exports.routes.get('/', function (req, res) {
    var imagesNames = fs_2.default
        .readdirSync(path_1.default.resolve('assets/images/before-resize')) ///read a directory.
        .map(function (fileName) { return fileName.slice(); }); //Method returns a Shallow copy of a portion of an array & method does not change the original array.
    // Message on Screen return JSON object
    res.status(200).json({
        message: 'Choose Image that you want to Resize it',
        fileNames: imagesNames
    });
});
