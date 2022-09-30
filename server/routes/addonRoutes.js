import express from "express";
import * as AddonController from "../controllers/addonController.js";
import {requireAuth} from "../middleware/requireAuth.js";

const router = express.Router();

router.use(requireAuth);

router.get('/', AddonController.getAddons);
router.get('/:id', AddonController.getAddon);
router.post('/', AddonController.createAddon);
router.delete('/:id', AddonController.deleteAddon);
router.patch('/:id', AddonController.updateAddon);

export default router;
