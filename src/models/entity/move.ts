interface IMove {
	_id: string;
	playerId: string;
	xCoord: number;
	yCoord: number;
}

class Move implements IMove {
	_id: string;
	playerId: string;
	xCoord: number;
	yCoord: number;

	constructor(_id: string, playerId: string, xCoord: number, yCoord: number) {
		this._id = _id;
		this.playerId = playerId;
		this.xCoord = xCoord;
		this.yCoord = yCoord;
	}
}

export { Move, IMove };
