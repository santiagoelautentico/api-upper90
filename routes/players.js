import { Router } from "express";
import { PlayerController } from "../controllers/players.js";

export const playersRouter = Router();

playersRouter.get("/players", PlayerController.getAllPlayers);
playersRouter.get("/playersCards", PlayerController.getCardPlayer);
playersRouter.get("/players/:id", PlayerController.getPlayerById);
playersRouter.get("/playerStats/:id/:competitionType",
  PlayerController.getAllStatsSeparately
);
// playersRouter.get("/players/:id/:stats", PlayerController.getStatsByPlayerId);
