import { Game, Player } from '../models/Game.js';

export const saveGameToDB = async (gameData) => {
    try {
      const game = new Game(gameData);
      await game.save();
      console.log('game saved to DB');
    } catch (error) {
      console.error('error saving game', error);
    }
  };

export const savePlayersToDB = async (playerData) => {
  console.log('playerData:', playerData);
  try {
    const player = new Player(playerData);
    await player.save();
    console.log('players saved to DB');
  } catch (error) {
    console.error('error saving players', error);
  }
};