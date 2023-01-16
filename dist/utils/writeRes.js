"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeRes = void 0;
const writeRes = (result, res) => {
    res.writeHead(result.code, { 'Content-Type': 'application/json' });
    res.write(JSON.stringify(result.data || { message: result.message }));
    res.end();
};
exports.writeRes = writeRes;
