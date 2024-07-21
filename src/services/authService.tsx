import http from "./httpService";
import apiConfig from "../config/config.json";
import config from "../config/config.json";
import { LoginUser } from "../models/dto/loginUser";
import { IUser } from "../models/entity/user";
const jwtDecode = require("jwt-decode");

const authEndpoint = `${apiConfig.apiUrl}auth`;

http.setToken(getToken() || "");

/**
 * Asynchronously logs in the user.
 *
 * @param {LoginUser} user - The user object containing login information.
 * @return {Promise<void>} A promise that resolves once the user is logged in.
 */
async function login(user: LoginUser) {
  const { data: jwt } = await http.post(authEndpoint, user);
  localStorage.setItem(config.tokenKey, jwt);
}

/**
 * Retrieves the token from localStorage.
 *
 * @return {string | null} The token stored in localStorage.
 */
function getToken() {
  return localStorage.getItem(config.tokenKey);
}

/**
 * Removes the token key from localStorage.
 */
function logout() {
  localStorage.removeItem(config.tokenKey);
}

/**
 * Sets the JWT token in the localStorage.
 *
 * @param {string} jwt - The JWT token to be stored.
 */
function loginWithJwt(jwt: string) {
  localStorage.setItem(config.tokenKey, jwt);
}

/**
 * Retrieves the current user from localStorage using the JWT token.
 *
 * @return {IUser | null} The current user if available, otherwise null.
 */
function getCurrentUser(): IUser | null {
  try {
    const jwt = localStorage.getItem(config.tokenKey);
    return jwtDecode(jwt);
  } catch (ex) {
    return null;
  }
}

export default {
  login,
  logout,
  getCurrentUser,
  loginWithJwt,
  getToken,
};
