import http from "./httpService";
import apiConfig from "../config/config.json";
import config from "../config/config.json";
import { LoginUser } from "../models/dto/loginUser";
import { IUser } from "../models/entity/user";
const jwtDecode = require("jwt-decode");

const authEndpoint = `${apiConfig.apiUrl}auth`;

http.setToken(getToken() || "");

async function login(user: LoginUser) {
	const { data: jwt } = await http.post(authEndpoint, user);
	localStorage.setItem(config.tokenKey, jwt);
}

function getToken() {
	return localStorage.getItem(config.tokenKey);
}

function logout() {
	localStorage.removeItem(config.tokenKey);
}

function loginWithJwt(jwt: string) {
	localStorage.setItem(config.tokenKey, jwt);
}

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
