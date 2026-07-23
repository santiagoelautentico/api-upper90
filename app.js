import express from "express";
import { teamsRouter } from "./routes/teams.js";
import { playersRouter } from "./routes/players.js";
import { matchesRouter } from "./routes/matches.js";
import { corsMiddelware } from "./middleware/cors.js"; // ajustá la ruta según donde lo tengas

const app = express();
app.use(corsMiddelware());


const PORT = process.env.PORT ?? 1234;

app.use("/", teamsRouter);
app.use("/", playersRouter);
app.use("/", matchesRouter)

app.listen(PORT, () => {
  console.log("Server running on port 1234");
});
