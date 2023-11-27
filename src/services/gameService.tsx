import http from "./httpService";
import apiConfig from '../config/config.json';

// const gamesEndpoint = `${apiConfig.apiUrl}games`;
const historyEndpoint = `${apiConfig.apiUrl}history`;

export async function gethistory() {
    return await http.get(historyEndpoint);
}