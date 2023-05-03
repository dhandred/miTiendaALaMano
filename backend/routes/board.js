import express from "express";
import board from "../controllers/board.js";
import validId from "../middlewares/validId.js";
import formatFile from "../middlewares/formatFile.js";
import multiparty from "connect-multiparty";
const mult = multiparty();
const router = express.Router();

router.post("/saveTask", board.saveTask);
router.post("/saveTaskImg", mult, formatFile, board.saveTaskImg);
router.get("/listTask", board.listTask);
router.put("/updateTask", board.updateTask);
router.delete("/deleteTask/:_id", validId, board.deleteTask);

export default router;
