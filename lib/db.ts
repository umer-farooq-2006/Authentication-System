import mongoose from "mongoose";

const MONGODB_URI = "mongodb+srv://umerfarooq13000_db_user:P%40ssword%40Secure%232024%40mongodb@cluster0.tzlvel4.mongodb.net/taskflow?retryWrites=true&w=majority";

export const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return;

  try {
    await mongoose.connect(MONGODB_URI);
    console.log("MongoDB connected");
  } catch (error) {
    console.log("DB connection error:", error);
  }
};