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
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _a, _Users_getErrorFieldMessages;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Users = void 0;
const uuid_1 = require("uuid");
class Users {
    constructor() {
        this.users = {};
    }
    getAll(method = 'GET') {
        return __awaiter(this, void 0, void 0, function* () {
            let res;
            if (method !== 'GET') {
                res = { code: 405, message: 'Wrong method.' };
            }
            else {
                res = { code: 200, data: Object.values(this.users) };
            }
            return res;
        });
    }
    post(user) {
        return __awaiter(this, void 0, void 0, function* () {
            let res;
            if (!user) {
                res = { code: 400, message: 'Invalid JSON format.' };
            }
            else {
                try {
                    const { username, age, hobbies } = user;
                    let id = (0, uuid_1.v4)();
                    while (this.users[id]) {
                        id = (0, uuid_1.v4)();
                    }
                    const errorFields = __classPrivateFieldGet(Users, _a, "m", _Users_getErrorFieldMessages).call(Users, username, age, hobbies);
                    if (errorFields.length) {
                        res = { code: 400, message: `Request data fields error: ${errorFields.join(', ')}.` };
                    }
                    else {
                        const data = {
                            id,
                            username,
                            age,
                            hobbies,
                        };
                        this.users[id] = data;
                        res = { code: 201, data };
                    }
                }
                catch (err) {
                    res = {
                        code: 500,
                        message: err instanceof Error ? err.message : `${err}`,
                    };
                }
            }
            return res;
        });
    }
    put(id, user) {
        return __awaiter(this, void 0, void 0, function* () {
            let res;
            if (!user) {
                res = { code: 400, message: 'Invalid JSON format' };
            }
            else {
                try {
                    if (!(0, uuid_1.validate)(id)) {
                        res = { code: 400, message: 'Invalid id (not uuid)' };
                    }
                    else if (!this.users[id]) {
                        res = { code: 404, message: "Record doesn't exist" };
                    }
                    else {
                        const { username, age, hobbies } = user;
                        const errorFields = __classPrivateFieldGet(Users, _a, "m", _Users_getErrorFieldMessages).call(Users, username, age, hobbies);
                        if (errorFields.length) {
                            res = { code: 400, message: `Request data fields error: ${errorFields.join(', ')}.` };
                        }
                        else {
                            const data = {
                                id,
                                username,
                                age,
                                hobbies,
                            };
                            this.users[id] = data;
                            res = { code: 200, data };
                        }
                    }
                }
                catch (err) {
                    res = {
                        code: 500,
                        message: err instanceof Error ? err.message : `${err}`,
                    };
                }
            }
            return res;
        });
    }
    get(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let res;
            try {
                if (!(0, uuid_1.validate)(id)) {
                    res = { code: 400, message: 'Invalid id (not uuid)' };
                }
                else if (!this.users[id]) {
                    res = { code: 404, message: "Record doesn't exist" };
                }
                else {
                    res = { code: 200, data: this.users[id] };
                }
            }
            catch (err) {
                res = {
                    code: 500,
                    message: err instanceof Error ? err.message : `${err}`,
                };
            }
            return res;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let res;
            try {
                if (!(0, uuid_1.validate)(id)) {
                    res = { code: 400, message: 'Invalid id (not uuid)' };
                }
                else if (!this.users[id]) {
                    res = { code: 404, message: "Record doesn't exist." };
                }
                else {
                    delete this.users[id];
                    res = { code: 204, message: 'Record successfully deleted.' };
                }
            }
            catch (err) {
                res = {
                    code: 500,
                    message: err instanceof Error ? err.message : `${err}`,
                };
            }
            return res;
        });
    }
}
exports.Users = Users;
_a = Users, _Users_getErrorFieldMessages = function _Users_getErrorFieldMessages(username, age, hobbies) {
    const errorFields = [];
    if (username === undefined)
        errorFields.push('missing required field username');
    if (typeof username !== 'string')
        errorFields.push('username should be string');
    if (age === undefined)
        errorFields.push('missing required field age');
    if (typeof age !== 'number')
        errorFields.push('age should be number');
    if (hobbies === undefined)
        errorFields.push('missing required field hobbies');
    if (!Array.isArray(hobbies) || !hobbies.every((hobbie) => typeof hobbie === 'string')) {
        errorFields.push('hobbies should be string[]');
    }
    return errorFields;
};
