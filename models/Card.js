import { model, Schema } from "mongoose";

const CardSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  text: String,
});
export const Card = model("Card", CardSchema, "cards");