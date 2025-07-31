import mongoose from "mongoose";
// Función asíncrona para conectarse a la base de datos
const connectToMongoDB = async () => {
    try {
        // Usamos la URL de conexión desde las variables de entorno
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Conexión exitosa a MongoDB");
    } catch (error) {
        // Si la conexión falla, mostramos el error y salimos de la aplicación
        console.error("Error al conectar a MongoDB:", error);
        process.exit(1);
    }
};

export default connectToMongoDB