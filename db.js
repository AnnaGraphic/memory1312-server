import mongoose from "mongoose";
import dotenv from "dotenv";
import {Card} from "./models/Card.js";
import {Game} from "./models/Game.js";
dotenv.config();

const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.URI);
    console.log("Yaay, DB connected");
  } catch (error) {
    console.log("error:", error);
  }
};

export const getCardsData = async () => {
  try {
    return await Card.find();
  } catch (error) {
    throw new Error(error.message);
  }
};

connectMongoDB();