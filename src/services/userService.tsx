import http from "./httpService";
import apiConfig from "../config/config.json";
import { User } from "../models/entity/user";
import { EditUser } from "../models/dto/editUser";

const userEndpoint = `${apiConfig.apiUrl}users`;

/**
 * Register a new user with the provided username, password, and nickname.
 *
 * @param {string} username - The username of the new user.
 * @param {string} password - The password of the new user.
 * @param {string} nickname - The nickname of the new user.
 * @return {ReturnType} The result of the registration process.
 */
export function register(username: string, password: string, nickname: string) {
  return http.post(userEndpoint, new User(username, password, nickname));
}

/**
 * Retrieves data from the user endpoint.
 *
 * @return {Promise<any>} The data retrieved from the user endpoint.
 */
export async function get() {
  return await http.get(userEndpoint);
}

/**
 * Retrieves the nickname data for a specific user ID.
 *
 * @param {string} userId - The ID of the user to retrieve the nickname for.
 * @return {Promise<any>} The data retrieved for the user's nickname.
 */
export async function getnickname(userId: string) {
  return await http.get(`${userEndpoint}/${userId}`);
}

/**
 * Edit user information with the provided parameters.
 *
 * @param {string} _id - The unique identifier of the user.
 * @param {string} username - The new username of the user.
 * @param {string} password - The new password of the user.
 * @param {string} nickname - The new nickname of the user.
 * @return {Promise<any>} The result of the edit operation.
 */
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
