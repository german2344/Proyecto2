import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost/merndb');
        console.log("Conexión exitosa");
    } catch (error) {
        console.log("Error de conexión:", error);
    }
};
