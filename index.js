import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import connectToMongoDB from "./db.js";

const PORT = process.env.PORT || 3000

connectToMongoDB()

const server = async () => {
    try {
        // app.listen() hace que el servidor Express escuche en el puerto definido
        app.listen(PORT, () => {
            console.log("Server is running on port: http://localhost:" + PORT);
        });
    } catch (error) {
        // Si hay un error al iniciar, lo mostramos en consola y salimos del proceso
        console.log("Error al iniciar el servidor: ", error);
        process.exit(1); // El código 1 indica un error en la ejecución
    }
}

server()