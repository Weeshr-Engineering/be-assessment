import { Router } from "express";

/**
 * @swagger
 * tags:
 *   name: Greetings
 *   description: Greetings API
 */

/**
 * @swagger
 * /greetings:
 *   get:
 *     summary: Returns the list of all the greetings
 *     tags: [Greetings]
 *     responses:
 *       200:
 *         description: The list of the greetings
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 */
import { getGreetings } from "../../../controllers/greeting.controller";

const router = Router();

router.get("/greetings", getGreetings);

module.exports = router;
