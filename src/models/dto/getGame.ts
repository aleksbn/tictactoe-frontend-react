interface IGetGame {
	_id: string;
	name: string;
}

class GetGame implements IGetGame {
	_id: string;
	name: string;

	constructor(_id: string, name: string) {
		this._id = _id;
		this.name = name;
	}
}

export { GetGame, IGetGame };
