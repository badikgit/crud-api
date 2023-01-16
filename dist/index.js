"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const dotenv = __importStar(require("dotenv"));
const http_1 = require("http");
const fs_1 = require("fs");
const utils_1 = require("./utils");
const api_1 = require("./api");
dotenv.config();
const port = process.env.PORT || '4000';
const server = (0, http_1.createServer)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const url = (req.url || '').replace(/^\//gm, '').replace(/\/$/gm, '');
    const adress = url.split('/');
    // Выдача favicon.ico
    if (url === 'favicon.ico') {
        (0, fs_1.createReadStream)('favicon.ico').pipe(res);
        return;
    }
    let result;
    switch (url) {
        // Ответы api/users
        case 'api/users': {
            // POST
            if (req.method === 'POST') {
                yield (0, utils_1.getRequestData)(req, (body) => __awaiter(void 0, void 0, void 0, function* () {
                    result = yield api_1.api.users.post(body);
                    (0, utils_1.writeRes)(result, res);
                }));
            }
            else {
                // другие методы (код 200 только у GET, у остальных 405)
                result = yield api_1.api.users.getAll(req.method);
                (0, utils_1.writeRes)(result, res);
            }
            break;
        }
        // Обработка других эндпоинтов
        default: {
            // Проверка на соответствие url существующим эндпоинтам (api/[modelName]/id)
            if (adress.length === 3 && adress[0] === 'api') {
                const [, modelName, id] = adress;
                // проверка по api/users/id
                if (modelName === 'users') {
                    // Обработка разрешённых методов
                    switch (req.method) {
                        case 'GET': {
                            result = yield api_1.api[modelName].get(id);
                            (0, utils_1.writeRes)(result, res);
                            break;
                        }
                        case 'DELETE': {
                            result = yield api_1.api[modelName].delete(id);
                            (0, utils_1.writeRes)(result, res);
                            break;
                        }
                        case 'PUT': {
                            yield (0, utils_1.getRequestData)(req, (body) => __awaiter(void 0, void 0, void 0, function* () {
                                result = yield api_1.api[modelName].put(id, body);
                                (0, utils_1.writeRes)(result, res);
                            }));
                            break;
                        }
                        default:
                            result = { code: 405, message: 'Wrong method.' };
                            (0, utils_1.writeRes)(result, res);
                    }
                }
            }
            else {
                result = { code: 404, message: 'Requests to non-existing endpoints.' };
                (0, utils_1.writeRes)(result, res);
            }
        }
    }
})).listen(port, () => {
    const address = server.address();
    const binding = typeof address === 'string' ? `pipe/socket ${address}` : `port ${address === null || address === void 0 ? void 0 : address.port}`;
    console.log(`[\x1b[32mINFO\x1b[0m] The server is running on ${binding}`);
});
