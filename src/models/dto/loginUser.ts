interface ILoginUser {
	email: string;
	password: string;
}

class LoginUser implements ILoginUser {
	email: string;
	password: string;

	constructor(email: string, password: string) {
		this.email = email;
		this.password = password;
	}
}

export { LoginUser, ILoginUser };
