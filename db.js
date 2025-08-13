import mongoose from "mongoose";

const connectToMongoDB = async () => {
    try {
        
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Conexión exitosa a MongoDB");
    } catch (error) {
        
        console.error("Error al conectar a MongoDB:", error);
        process.exit(1);
    }
};

export default connectToMongoDB