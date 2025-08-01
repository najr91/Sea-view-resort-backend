import express,{urlencoded} from "express"
import dotenv from "dotenv"
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import cors from "cors"
import morgan from "morgan"
import cookieParser from "cookie-parser" 

dotenv.config()

const app=express()
const __filename = fileURLToPath(import.meta.url)
const _dirname = path.dirname(__filename)

// --- Middlewares ---

const corsOptions = {
    
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    
    credentials: true,
    
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    
    allowedHeaders: ['Content-type', 'Authorization', 'Set-Cookie'],
    
    exposedHeaders: ['Set-Cookie']
};
app.use(cors(corsOptions));


app.use(express.json());


app.use(urlencoded({ extended: true }));


app.use(morgan("dev"));


app.use(cookieParser());


app.use(express.static(path.join(_dirname, 'public')));


const routeFiles = fs.readdirSync('./src/routes');


routeFiles.forEach((file) => {
   
    import(`./src/routes/${file}`).then((route) => {
        
        app.use('/api/v1', route.default);
    }).catch((err) => {
        // Manejamos cualquier error que ocurra al cargar una ruta
        console.error(`Error al cargar la ruta ${file}:`, err)
    });
});

// Exportamos la aplicación para que index.js pueda usarla
export default app;
