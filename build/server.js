"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var images_1 = require("./routes/api/images");
var app = (0, express_1.default)();
var port = 8000;
// Run  Apis from routes Folder
app.use('/api', images_1.routes);
//use The images Apis
images_1.routes.use('/images', images_1.images);
//default Port
app.get('/', function (req, res) {
    res.status(200).redirect('/api');
});
app.listen(port, function () {
    console.log("http://localhost:".concat(port));
});
exports.default = app;
