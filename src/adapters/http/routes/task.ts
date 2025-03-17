import { Router } from "express";
import { postTask } from "../controllers/task";
import expressAdapter from "../express/expressAdapter";

const router = Router();

router.post("/", expressAdapter(postTask));

export default router;
