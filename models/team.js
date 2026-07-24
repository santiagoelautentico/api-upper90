import { pool } from "../db.js";

export class teamModel {
  static async getAllTeams() {
    const [teams] = await pool.query("SELECT * FROM Teams");
    return teams;
  }

  static async getLeagues() {
    const [leagues] = await pool.query("SELECT * FROM Leagues");
    return leagues;
  }

  static async getLeagueById(leagueId) {
    const [league] = await pool.query(
      `SELECT * FROM Leagues WHERE league_id = ?`,
      [leagueId],
    );
    return league;
  }

  static async getTableLeague(leagueId, season) {
    const [table] = await pool.query(
      `SELECT 
      ts.*,
      t.team_name,
      t.picture_url
      FROM 
      Team_Stats ts
      JOIN 
      Teams t ON ts.team_id = t.team_id
      WHERE 
      t.league_id = ? AND ts.season = ?
      ORDER BY 
      ts.position ASC;`,
      [leagueId, season],
    );
    return table;
  }

  static async getTopPlayersLeague(leagueId, season) {
    const [topPlayers] = await pool.query(
      `SELECT 
    p.player_id,
    p.surname,
    p.picture_url,
    pcs.goals,
    pcs.assists,
    pcs.clean_sheets
    FROM 
    player_competition_stats pcs
    JOIN 
    Players p ON pcs.player_id = p.player_id
    WHERE 
    pcs.competition_type = 'League'
    AND pcs.season = ?
    AND pcs.league_id = ?;`,
      [season, leagueId],
    );
    return topPlayers;
  }
}