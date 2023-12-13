import { Router } from "express";
import { createUsers, deleteUser, getUsers, updateUsers } from "../controllers/users.controller";
import { UserSchema } from "./apiRouterSchema/userSchema";

const router = Router();
const {schema} = UserSchema();

router.get('/', getUsers)
router.post('/',schema.postUser, createUsers)
router.put('/:_id',schema.updateUser, updateUsers)
router.delete('/:_id', deleteUser)


export default router