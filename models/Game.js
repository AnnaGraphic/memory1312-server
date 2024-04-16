import { model, Schema } from "mongoose";
import { Card } from "./Card.js";

const playerSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  id: {
    type: Number,
    required: true
  },
  color: {
    type: String,
    default: "ffffff"
  }
});

const initialStateSchema = new Schema({
  gameId: {
    type: String,
    required: true
  },
  cardsData: {
    type: [Card.schema],
    default: []
  },
  firstCard: {
    type: Card.schema,
    default: null
  },
  secondCard: {
    type: Card.schema,
    default: null
  },
  lockBoard: {
    type: Boolean,
    default: false
  },
  currentPlayerIndex: {
    type: Number,
    default: 0
  },
  arrOfPlayers: {
    type: Map,
    of: playerSchema
  },
  gameState: {
    type: String,
    enum: ['GAME_OVER', 'SOME_OTHER_STATE'],
    default: 'GAME_OVER'
  },
  messages: {
    type: [String],
    default: []
  }
});
export const Game = model("Game", initialStateSchema, "games");
export const Player = model("Player", playerSchema, "players");