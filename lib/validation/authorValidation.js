"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.authorSchema = zod_1.default
    .object({
    fullName: zod_1.default
        .string({
        required_error: "Full name is required.",
        invalid_type_error: "Full name must be a string.",
    })
        .min(4),
    email: zod_1.default
        .string({
        required_error: "Kindly provide your email.",
        invalid_type_error: "Email must be a string.",
    })
        .email(),
    password: zod_1.default
        .string({
        required_error: "Kindly provide your password.",
    })
        .min(6, "Password must be at least 6 characters")
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]+$/, "Password must contain at least one lowercase letter, one uppercase letter, and one number"),
    confirmPassword: zod_1.default.string(),
})
    .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});
