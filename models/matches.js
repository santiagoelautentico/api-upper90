import { pool } from "../db.js";

export class MatchesModel {
  static async getAllMatches() {
    const [matches] = await pool.query(`
    SELECT
      m.match_id AS matchId,
      m.match_date AS matchDate,
      m.stadium,
      m.status,
      m.home_score AS homeScore,
      m.away_score AS awayScore,
      l.name AS leagueName,
      l.picture_url AS leagueLogo,
      ht.team_name AS homeTeamName,
      ht.team_id AS homeTeamId,
      ht.picture_url AS homeTeamLogo,
      at.team_name AS awayTeamName,
      at.team_id AS awayTeamId,
      at.picture_url AS awayTeamLogo
    FROM matches AS m
    INNER JOIN Teams AS ht ON m.home_team_id = ht.team_id
    INNER JOIN Teams AS at ON m.away_team_id = at.team_id
    INNER JOIN Leagues AS l ON m.league_id = l.league_id
    ORDER BY 
      CASE 
        WHEN status = 'Live' THEN 1
        WHEN status = 'Finished' AND m.match_date >= DATE_SUB(CURDATE(), INTERVAL 3 DAY) THEN 2
        WHEN status = 'Scheduled' THEN 3
        WHEN status = 'Finished' THEN 4
        ELSE 5
      END,
      CASE
        WHEN status = 'Scheduled' THEN m.match_date
        WHEN status = 'Finished' THEN m.match_date
        ELSE m.match_date
      END ASC;
    `);
    return matches;
  }
  static async getMatchById(matchId) {
    const [matches] = await pool.query(
      `
        SELECT
            m.match_id AS matchId,
            m.match_date AS matchDate,
            m.stadium,
            m.status,
            m.home_score AS homeScore,
            m.away_score AS awayScore,
            l.name AS leagueName,
            l.picture_url AS leagueLogo,
            ht.team_name AS homeTeamName,
            ht.team_id AS homeTeamId,
            ht.picture_url AS homeTeamLogo,
            at.team_name AS awayTeamName,
            at.team_id AS awayTeamId,
            at.picture_url AS awayTeamLogo
        FROM matches AS m
        INNER JOIN Teams AS ht ON m.home_team_id = ht.team_id
        INNER JOIN Teams AS at ON m.away_team_id = at.team_id
        INNER JOIN Leagues AS l ON m.league_id = l.league_id
        WHERE m.match_id = ?;
    `,
      [matchId]
    );
    return matches;
  }

  static async getLineupsByMatchId(matchId) {
    const [lineups] = await pool.query(
      `
      SELECT
        l.match_id AS matchId,
        l.player_id AS playerId,
        p.surname AS playerSurname,
        p.picture_url AS playerPicture,
        l.team_id AS teamId,
        l.is_starting AS isStarting,
        l.position AS playerPosition,
        l.shirt_number AS shirtNumber,
        l.played AS minutesPlayed,
        COALESCE(pms.goals, 0) AS goals,
        COALESCE(pms.assists, 0) AS assists,
        COALESCE(pms.yellow_cards, 0) AS yellowCards,
        COALESCE(pms.red_cards, 0) AS redCards,
        COALESCE(pms.rating, 0) AS rating
      FROM Lineups AS l
      JOIN Players AS p ON l.player_id = p.player_id
      LEFT JOIN Player_match_stats AS pms 
        ON pms.player_id = l.player_id AND pms.match_id = l.match_id
      WHERE l.match_id = ?;
      `,
      [matchId]
    );
    return lineups;
  }

  static async getMatchStatsByMatchId(matchId, team_id) {
    const [matchStats] = await pool.query(
      `
        SELECT 
            ms.*,
            t.picture_url
        FROM 
            Match_Stats AS ms
        JOIN 
            Teams AS t ON ms.team_id = t.team_id
        WHERE 
            ms.match_id = ? 
            AND ms.team_id = ?;
      `,
      [matchId, team_id]
    );
    return matchStats;
  }
}