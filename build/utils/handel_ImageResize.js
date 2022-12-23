"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resizedImage = exports.resizeImage = void 0;
var sharp_1 = __importDefault(require("sharp"));
var path_1 = __importDefault(require("path"));
//Get Image From before-resize folder And Change (Hight&Width).
//resizeImage( ) return Promise that using Sharp  Node.js module
var resizeImage = function (fileName, height, width) {
    return (0, sharp_1.default)(path_1.default.resolve("assets/images/before-resize/".concat(fileName, ".jpg")))
        .resize({
        width: width,
        height: height
    })
        .toBuffer();
};
exports.resizeImage = resizeImage;
// save Image in (after-resized folder) with new(Hight&Width)
// resizedImage(): return string which is the new Path of Resized Image.
var resizedImage = function (fileName, height, width) {
    return "assets/images/after-resized/".concat(fileName).concat(height).concat(width, ".jpg");
};
exports.resizedImage = resizedImage;
