import { useEffect } from "react";
import auth from "../../services/authService";

/**
 * Executes the logout process by calling the auth service to logout the user and redirecting to the homepage.
 *
 * @return {null} - No return value
 */
const Logout = () => {
  useEffect(() => {
    /**
     * Logs the user out by calling the `logout` method of the `auth` object,
     * and then redirects the user to the homepage.
     *
     * @return {Promise<void>} A Promise that resolves when the logout and redirect are complete.
     */
    const handleLogout = async () => {
      auth.logout();
      window.location.href = "/";
    };

    handleLogout();
  }, []);

  return null;
};

export default Logout;
