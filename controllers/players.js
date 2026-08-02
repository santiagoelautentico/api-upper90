import { playerModel } from "../models/player.js";

export class PlayerController {
  static async getAllPlayers(req, res) {
    const plyers = await playerModel.getAllPlayers();
    res.json(plyers);
    console.log(plyers);
  }
  static async getCardPlayer(req, res) {
    const { season } = req.query; // ej: /playersCards?season=2024
    const { playerName } = req.query; // ej: /playersCards?playerName=Messi

    try {
      const players = await playerModel.getCardPlayer(season, playerName);
      res.json(players);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al obtener los jugadores" });
    }
  }
  static async getPlayerById(req, res) {
    const playerId = req.params.id;
    const player = await playerModel.getPlayerById(playerId);
    if (player) {
      res.json(player);
    } else {
      res.status(404).json({ message: "Player not found" });
    }
  }
  static async getAllStatsSeparately(req, res) {
    const playerId = req.params.id;
    const competitionType = req.params.competitionType;
    const season = req.query.season;
    const stats = await playerModel.getAllStatsSeparately(
      playerId,
      competitionType,
      season,
    );
    if (stats) {
      res.json(stats);
    } else {
      res.status(404).json({ message: "Stats not found" });
    }
  }

  // static async getStatsByPlayerId(req, res) {
  //   const playerId = req.params.id;
  //   const competitionType = req.params.stats;
  //   console.log("Query Parameters:", { playerId, competitionType });
  //   const stats = await playerModel.getStatsByPlayerId(
  //     playerId,
  //     competitionType
  //   );
  //   if (stats) {
  //     res.json(stats);
  //   } else {
  //     res.status(404).json({ message: "Stats not found" });
  //   }
  // }
}
