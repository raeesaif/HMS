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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * One-time bootstrap script for creating the first superadmin account.
 *
 * Not exposed over HTTP on purpose: the public /auth/register endpoint
 * deliberately cannot create admin/superadmin accounts (see
 * userValidation.ts), since it has no auth guard. This script is the only
 * way to create the very first privileged account; after that, a protected
 * "create staff" endpoint (once login exists) can create the rest.
 *
 * Usage:
 *   npm run seed:admin -- --email=admin@hms.com --password=Secret123 --firstName=Super --lastName=Admin
 */
require("dotenv/config");
const mongoose_1 = __importDefault(require("mongoose"));
const UserModel_1 = __importStar(require("../models/UserModel"));
const helper_1 = require("../utils/helper");
const parseArgs = (argv) => {
    const args = {};
    for (const raw of argv) {
        const match = /^--([^=]+)=(.*)$/.exec(raw);
        if (match) {
            const [, key, value] = match;
            args[key] = value;
        }
    }
    return args;
};
async function main() {
    const args = parseArgs(process.argv.slice(2));
    const email = args.email?.trim().toLowerCase();
    const firstName = args.firstName?.trim();
    const lastName = args.lastName?.trim();
    const role = UserModel_1.Role.SuperAdmin;
    if (!email || !firstName || !lastName) {
        console.error('Usage: npm run seed:admin -- --email=you@example.com --password=Secret123 --firstName=First --lastName=Last');
        process.exit(1);
    }
    const password = args.password ?? (0, helper_1.generateRandomString)(8);
    if (password.length < 6) {
        console.error('Password must be at least 6 characters.');
        process.exit(1);
    }
    await mongoose_1.default.connect(process.env.MONGO_URI);
    const existing = await UserModel_1.default.findOne({ email });
    if (existing) {
        console.error(`A user with email "${email}" already exists (role: ${existing.role}).`);
        await mongoose_1.default.disconnect();
        process.exit(1);
    }
    const hashedPassword = await (0, helper_1.hashPassword)(password);
    const userId = (0, helper_1.generateStaffId)(role);
    const user = await UserModel_1.default.create({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        role,
        userId,
        isFirstLogin: true,
        isActive: true,
    });
    console.log(`Created ${role} account:`);
    console.log(`  userId:   ${user.userId}`);
    console.log(`  email:    ${user.email}`);
    console.log(`  password: ${password}`);
    console.log('Store this password now — it is not saved anywhere in plaintext.');
    await mongoose_1.default.disconnect();
}
main().catch((error) => {
    console.error(error);
    process.exit(1);
});
