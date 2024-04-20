import { useEffect } from "react";
import auth from "../../services/authService";

const Logout = () => {
	useEffect(() => {
		const handleLogout = async () => {
			auth.logout();
			window.location.href = "/";
		};

		handleLogout();
	}, []);

	return null;
};

export default Logout;
