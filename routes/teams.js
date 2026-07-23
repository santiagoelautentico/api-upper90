import { Router } from "express";
import { TeamController } from "../controllers/teams.js";

export const teamsRouter = Router();

teamsRouter.get("/teams", TeamController.getAllTeams);
teamsRouter.get("/leagues", TeamController.getLeagues);
teamsRouter.get("/league/:leagueId", TeamController.getLeagueById);
teamsRouter.get("/tableLeague/:leagueId", TeamController.getTableLeague);
teamsRouter.get("/topPlayersLeague/:leagueId", TeamController.getTopPlayersLeague);
// teamsRouter.get("/teamsByLeague/:leagueId", TeamController.getTeamsByLeague);
