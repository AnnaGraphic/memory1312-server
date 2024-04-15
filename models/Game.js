import { model, Schema } from "mongoose";

const GameSchema = new Schema ({
  GameID: {
    type: String,
    //required?
  },
  players: [],
});
export const Game = model("Game", GameSchema, "games");