import { pool } from "../db.js";

export class playerModel {
  // Obtener todos los jugadores con sus equipos
  static async getAllPlayers() {
    const [players] = await pool.query(`
      SELECT 
        p.*,
        t.team_name AS team_name
      FROM 
        Players p
      JOIN 
        Teams t ON p.team_id = t.team_id;
    `);
    return players;
  }

  // Obtener información resumida de los jugadores
  static async getCardPlayer(season, playerName) {
    const params = [];
    let whereClause = "";

    if (season) {
      whereClause = "WHERE pcs.season = ?";
      params.push(season);
    }

    if (playerName) {
      whereClause += whereClause ? " AND" : "WHERE";
      whereClause += " p.surname LIKE ?";
      params.push(`%${playerName}%`);
    }

    const [players] = await pool.query(
      `
      SELECT
        p.player_id,
        p.surname,
        p.picture_url,
        t.team_name,
        p.national_team,
        p.market_value,
        SUM(pcs.goals)          AS total_goals,
        SUM(pcs.assists)        AS total_assists,
        SUM(pcs.matches_played) AS total_matches,
        SUM(pcs.minutes_played) AS total_minutes,
        SUM(pcs.yellow_cards)   AS total_yellow_cards,
        SUM(pcs.red_cards)      AS total_red_cards
      FROM
        player_competition_stats pcs
      JOIN
        Players p ON pcs.player_id = p.player_id
      JOIN
        Teams t ON p.team_id = t.team_id
      ${whereClause}
      GROUP BY
        p.player_id,
        p.surname,
        p.picture_url,
        t.team_name,
        p.national_team
      ORDER BY
        t.team_name,
        p.surname;
      `,
      params,
    );
    return players;
  }

  // GET THE PLAYER BY ID
  static async getPlayerById(playerId) {
    const [player] = await pool.query(
      `
      SELECT 
        p.*, 
        t.team_name AS team_name, 
        t.picture_url AS pictureTeam_url 
      FROM 
        Players p 
      JOIN 
        Teams t ON p.team_id = t.team_id
      WHERE 
        player_id = ?`,
      [playerId],
    );
    return player[0];
  }

  // GET THE STATS BY PLAYER ID
  static async getAllStatsSeparately(playerId, competitionType, season) {
    const [stats] = await pool.query(
      `
     SELECT
      p.player_id,
      t.league_id,
      l.name AS league_name,
      l.picture_url AS league_logo,
      pcs.competition_type,
      pcs.season,
      pcs.goals,
      pcs.assists,
      pcs.yellow_cards,
      pcs.red_cards,
      pcs.matches_played,
      pcs.minutes_played
    FROM
      Players p
    JOIN
      player_competition_stats pcs ON p.player_id = pcs.player_id
    JOIN
      Teams t ON p.team_id = t.team_id
    JOIN
      Leagues l ON t.league_id = l.league_id
    WHERE
      p.player_id = ? AND
      pcs.season = ? AND
      pcs.competition_type = ?;`,
      [playerId, season, competitionType], // ← orden corregido
    );
    return stats;
  }
}
