import express from "express";
import role from "../controllers/role.js";
import validId from "../middlewares/validId.js";
const router = express.Router();

router.post("/registerRole", role.registerRole);
router.get("/listRole", role.listRole);
router.get("/findRole/:_id", validId, role.findRole);
router.put("/updateRole", role.updateRole);
router.delete("/deleteRole/:_id", validId, role.deleteRole);

export default router;
