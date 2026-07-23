import { MatchesModel } from "../models/matches.js";

export class MatchesController {
  static async getAllMatches(req, res) {
    const matches = await MatchesModel.getAllMatches();
    res.json(matches);
    console.log(matches);
  }

  static async getMatchById(req, res) {
    const matchId = req.params.id;
    const match = await MatchesModel.getMatchById(matchId);
    if (match) {
      res.json(match);
    } else {
      res.status(404).json({ message: "Match not found" });
    }
  }
  static async getLineupsByMatchId(req, res) {
    const matchId = req.params.id;
    const lineups = await MatchesModel.getLineupsByMatchId(matchId);
    if (lineups) {
      res.json(lineups);
    } else {
      res.status(404).json({ message: "Lineups not found" });
    }
  }
  static async getStatsByMatchId(req, res) {
    const matchId = req.params.matchId;
    const team_id = req.params.team_id;
    const stats = await MatchesModel.getMatchStatsByMatchId(matchId, team_id);
    if (stats) {
      res.json(stats);
    } else {
      res.status(404).json({ message: "Stats not found" });
    }
  }
}
