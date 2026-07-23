import { Router } from "express";
import { MatchesController } from "../controllers/matches.js";

export const matchesRouter = Router();

// Get all matches
matchesRouter.get("/matches", MatchesController.getAllMatches);
matchesRouter.get("/match/:id", MatchesController.getMatchById);
matchesRouter.get('/match/:id/lineups', MatchesController.getLineupsByMatchId);
matchesRouter.get('/match/:matchId/stats/:team_id', MatchesController.getStatsByMatchId);
