import { teamModel } from "../models/team.js";

export class TeamController {
  static async getAllTeams(req, res) {
    const teams = await teamModel.getAllTeams();
    res.json(teams);
    console.log(teams);
  }

  static async getLeagues(req, res) {
    const leagues = await teamModel.getLeagues();
    res.json(leagues);
    console.log(leagues);
  }
static async getLeagueById(req, res) {
  const leagueId = req.params.leagueId;
  const league = await teamModel.getLeagueById(leagueId);
  if (league) {
    res.json(league);
  } else {
    res.status(404).json({ message: "League not found" });
  }
}

  static async getTableLeague(req, res) {
    try {
      const leagueId = req.params.leagueId;
      const season = req.query.season || "26/27";
      const table = await teamModel.getTableLeague(leagueId, season);
      if (table && table.length > 0) {
        res.json(table);
      } else {
        res.status(404).json({ message: "Table not found" });
      }
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error fetching table", error: error.message });
    }
  }

  static async getTopPlayersLeague(req, res) {
    try {
      const leagueId = req.params.leagueId;
      const season = req.query.season || "26/27";
      const players = await teamModel.getTopPlayersLeague(leagueId, season);
      if (players && players.length > 0) {
        res.json(players);
      } else {
        res.status(404).json({ message: "Players not found" });
      }
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error fetching top players", error: error.message });
    }
  }

  // static async getTeamsByLeague(req, res) {
  //   const leagueId = req.params.leagueId;
  //   const teams = await teamModel.getTeamsByLeague(leagueId);
  //   if (teams) {
  //     res.json(teams);
  //   } else {
  //     res.status(404).json({ message: "Teams not found" });
  //   }
  // }
}
