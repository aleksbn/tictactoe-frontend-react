import http from './httpService';
import apiConfig from '../config/config.json';

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

export async function joingame(id:string) {
    return await http.get(`${gamesEndpoint}/join/${id}`);
}