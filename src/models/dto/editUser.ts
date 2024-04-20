import { User } from "../entity/user";

class EditUser extends User {
	_id: string;

	constructor(_id: string, email: string, password: string, nickname: string) {
		super(email, password, nickname);
		this._id = _id;
	}
}

export { EditUser };
