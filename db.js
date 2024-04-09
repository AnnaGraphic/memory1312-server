import mongoose from "mongoose";
import dotenv from "dotenv";
import {Card} from "./models/Card.js";
dotenv.config();

const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.URI);
    console.log("Yaay, DB connected");
  } catch (error) {
    console.log("error:", error);
  }
};

export const getCardsData = async (req, res) => {
    try {
        const cardsData = await Card.find();
        console.log(cardsData);
        res.status(200).json(cardsData);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

connectMongoDB();