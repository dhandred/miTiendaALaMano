import express from "express";
import user from "../controllers/user.js";
import validId from "../middlewares/validId.js";
const router = express.Router();

router.post("/registerUser", user.registerUser);
router.post("/registerAdminUser", user.registerAdminUser);
router.post("/login", user.login);
router.get("/listUsers/:name?", user.listAllUser);
router.get("/getRole/:email", user.getUserRole);
router.get("/findUser/:email", validId, user.findUser);
router.put("/updateUser", user.updateUser);
router.delete("/deleteUser/:_id", user.deleteUser);

export default router;
