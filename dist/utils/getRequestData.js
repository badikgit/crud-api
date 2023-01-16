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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRequestData = void 0;
function getRequestData(request, callback) {
    return __awaiter(this, void 0, void 0, function* () {
        const contentType = 'application/json';
        if (request.headers['content-type'] === contentType) {
            let body = '';
            request.on('data', (chunk) => {
                body += chunk.toString();
            });
            request.on('end', () => {
                try {
                    callback(JSON.parse(body));
                }
                catch (error) {
                    callback(null);
                }
            });
        }
        else {
            callback(null);
        }
    });
}
exports.getRequestData = getRequestData;
