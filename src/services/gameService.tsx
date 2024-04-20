import http from "./httpService";
import apiConfig from "../config/config.json";
import { CreateMove } from "../models/dto/createMove";

const gamesEndpoint = `${apiConfig.apiUrl}games`;
const historyEndpoint = `${apiConfig.apiUrl}history`;

export async function gethistory() {
	return await http.get(historyEndpoint);
}

export async function creategame(isAgainstPc: boolean) {
	return await http.post(`${gamesEndpoint}/create`, {
		isAgainstPC: isAgainstPc,
	});
}

export async function joingame(id: string) {
	return await http.get(`${gamesEndpoint}/join/${id}`);
}

export async function getgame(id: string) {
	return await http.get(`${gamesEndpoint}/${id}`);
}

export async function makeamove(gameId: string, move: CreateMove) {
	return await http.post(`${gamesEndpoint}/makeamove/${gameId}`, move);
}
