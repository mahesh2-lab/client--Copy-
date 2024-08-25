import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { ReoprtLoc, getHeatMap } from "../controllers/repotloc.controller.js";

const router = express.Router();

router.post("/", protectRoute, ReoprtLoc);
router.get("/getheatmap", protectRoute, getHeatMap);


export default router;