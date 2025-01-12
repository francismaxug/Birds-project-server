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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const bird_1 = __importDefault(require("./bird"));
dotenv_1.default.config();
let connected = false;
const connectDB = (db) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(db)
    try {
        yield mongoose_1.default.connect(db.uri || "");
        connected = true;
        console.log(`MongoDB Connected`);
        yield bird_1.default.createCollection();
        return {
            birdModel: bird_1.default
        };
    }
    catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
});
exports.default = connectDB;
