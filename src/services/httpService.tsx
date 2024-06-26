import axios, { AxiosResponse } from "axios";

axios.interceptors.response.use(
	(response: AxiosResponse<any>) => response,
	(error) => {
		const expectedError =
			error.response &&
			error.response.status >= 400 &&
			error.response.status < 500;

		if (!expectedError) {
			console.log("Logging the error", error);
		}

		return Promise.reject(error);
	}
);

function setToken(jwt: string) {
	axios.defaults.headers.common["x-auth-token"] = jwt;
}

export default {
	get: axios.get,
	post: axios.post,
	put: axios.put,
	delete: axios.delete,
	setToken,
};
