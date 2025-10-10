import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --- Configuración del almacenamiento ---
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, "..", "uploads", "rooms");

    // Si no existe la carpeta, la crea automáticamente
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const filename = `room-${Date.now()}${ext}`;
    cb(null, filename);
  },
});

// --- Filtro de archivos válidos (solo imágenes) ---
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/jpg"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    // Ignora archivos no válidos en vez de lanzar 500
    cb(new Error("Solo se permiten archivos de imagen (jpg, png, webp)"));
  }
};

// --- Configuración final de multer ---
export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // máximo 5 MB por archivo
  },
});
