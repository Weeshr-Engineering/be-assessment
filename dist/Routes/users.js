"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const userCtrl_1 = require("../Controllers/userCtrl");
router.post('/signup', userCtrl_1.signup_post);
router.post('/login', userCtrl_1.login_post);
exports.default = router;
