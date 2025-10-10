import express, { urlencoded } from "express";
import dotenv from "dotenv";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";

dotenv.config({ quiet: true });

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --- CORS ---
const FRONTEND_URL =
  process.env.FRONTEND_URL?.replace(/\/$/, "") || "http://localhost:5173";

app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Set-Cookie"],
    exposedHeaders: ["Set-Cookie"],
  })
);

// --- Middlewares ---
app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cookieParser());

// --- Carpeta de uploads y public ---
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.static(path.join(__dirname, "public")));

// --- Rutas ---
const routesPath = path.join(__dirname, "src/routes");

for (const file of fs.readdirSync(routesPath)) {
  if (file.endsWith(".js")) {
    try {
      const routeModule = await import(`./src/routes/${file}`);
      const baseName = file.replace(".js", "");
      const baseRoute = `/api/${baseName.replace(".routes", "")}`;
      app.use(baseRoute, routeModule.default);
      console.log(`✅ Ruta cargada: ${baseRoute}`);
    } catch (err) {
      console.error(`❌ Error al cargar la ruta ${file}:`, err);
    }
  }
}

// --- Ruta de prueba ---
app.get("/", (req, res) => {
  res.send("API funcionando 🚀");
});

export default app;
