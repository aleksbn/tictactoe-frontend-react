import http from "./httpService";
import apiConfig from "../config/config.json";
import { CreateMove } from "../models/dto/createMove";

const gamesEndpoint = `${apiConfig.apiUrl}games`;
const historyEndpoint = `${apiConfig.apiUrl}history`;

/**
 * Retrieves the history data by making a GET request using the historyEndpoint.
 *
 * @return {Promise<any>} The data retrieved from the historyEndpoint.
 */
export async function gethistory() {
  return await http.get(historyEndpoint);
}

/**
 * Create a new game based on the opponent type.
 *
 * @param {boolean} isAgainstPc - Indicates if the game is against the computer or not.
 * @return {Promise<any>} A promise that resolves with the created game data.
 */
export async function creategame(isAgainstPc: boolean) {
  return await http.post(`${gamesEndpoint}/create`, {
    isAgainstPC: isAgainstPc,
  });
}

/**
 * Retrieves the game data by making a GET request to join a game.
 *
 * @param {string} id - The ID of the game to join.
 * @return {Promise<any>} The data retrieved from the join game request.
 */
export async function joingame(id: string) {
  return await http.get(`${gamesEndpoint}/join/${id}`);
}

/**
 * Retrieves a game by its ID.
 *
 * @param {string} id - The ID of the game.
 * @return {Promise<any>} A Promise that resolves with the game data.
 */
export async function getgame(id: string) {
  return await http.get(`${gamesEndpoint}/${id}`);
}

/**
 * Makes a move in the game with the provided gameId using the specified move.
 *
 * @param {string} gameId - The ID of the game where the move should be made.
 * @param {CreateMove} move - The move details to be made in the game.
 * @return {Promise<any>} A promise that resolves with the result of the move action.
 */
export async function makeamove(gameId: string, move: CreateMove) {
  return await http.post(`${gamesEndpoint}/makeamove/${gameId}`, move);
}
