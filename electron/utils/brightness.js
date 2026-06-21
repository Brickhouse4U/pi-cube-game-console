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
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.detectDisplay = detectDisplay;
exports.applyBrightness = applyBrightness;
exports.loadBrightness = loadBrightness;
const child_process_1 = require("child_process");
const fs = __importStar(require("fs"));
const STATE_FILE = process.env.NODE_ENV === 'production'
    ? '/etc/brightness.state'
    : `${process.env.HOME}/.brightness.state`;
function detectDisplay() {
    try {
        const output = (0, child_process_1.execSync)('ddcutil detect --brief 2>/dev/null').toString();
        const match = output.match(/I2C bus:\s+(\/dev\/i2c-\d+)/);
        return match ? match[1] : null;
    }
    catch {
        return null;
    }
}
function applyBrightness(value) {
    const level = Math.round(value * 100);
    try {
        (0, child_process_1.execSync)(`ddcutil setvcp 10 ${level} 2>/dev/null`);
        fs.writeFileSync(STATE_FILE, String(value));
        return true;
    }
    catch {
        return false;
    }
}
function loadBrightness() {
    try {
        const val = parseFloat(fs.readFileSync(STATE_FILE, 'utf8').trim());
        return isNaN(val) ? 1.0 : Math.min(1.0, Math.max(0.0, val));
    }
    catch {
        return 1.0;
    }
}
