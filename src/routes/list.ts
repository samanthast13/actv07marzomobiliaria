import express from "express";
import { ListHttphHandler } from "../handler/list";

const router = express.Router();

const listHttphHandler = new ListHttphHandler();

router.get('/', listHttphHandler.getplotbox);

export default router;