import cors from "cors";

const ACCEPTED_ORIGINS = [
  "http://localhost:8080",
  "http://localhost:1234",
  "http://localhost:5173",
  "https://TU-FRONT-DE-RAILWAY.up.railway.app", // 👈 reemplazá esto por tu dominio real
];

export const corsMiddelware = ({ acceptedOrigins = ACCEPTED_ORIGINS } = {}) => {
  return cors({
    origin: (origin, callback) => {
      // Peticiones sin origin (Postman, curl, mismo servidor) siempre permitidas
      if (!origin) return callback(null, true);

      // Origins explícitamente aceptados
      if (acceptedOrigins.includes(origin)) return callback(null, true);

      // Cualquier puerto de localhost (útil en dev cuando Vite cambia de puerto)
      if (/^http:\/\/localhost:\d+$/.test(origin)) return callback(null, true);

      return callback(new Error("Not allowed by CORS"));
    },
  });
};