import http from './httpService';
import apiConfig from '../config/config.json';
import { User } from '../models/entity/user';
import { EditUser } from '../models/dto/editUser';

const userEndpoint = `${apiConfig.apiUrl}users`;

export function register(username: string, password: string, nickname: string) {
  return http.post(userEndpoint, new User(username, password, nickname));
}

export async function get() {
  return await http.get(userEndpoint);
}

export async function getnickname(userId: string) {
  return await http.get(`${userEndpoint}/${userId}`);
}

export async function edit(
  _id: string,
  username: string,
  password: string,
  nickname: string
) {
  return http.put(
    userEndpoint,
    new EditUser(_id, username, password, nickname)
  );
}
