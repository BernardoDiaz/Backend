"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = require("../../controllers/UserControllers/user");
const router = (0, express_1.Router)();
router.post('/', user_1.newUser);
router.post('/login', user_1.loginUser);
router.post('/loginT', user_1.loginTeacher);
router.get('/', user_1.getUsers);
router.get('/:username', user_1.getUserById);
router.get('/tokenclass/:name', user_1.getTeacherById);
router.put('/:id', user_1.updateUser);
router.delete('/:id', user_1.deleteUser);
exports.default = router;
