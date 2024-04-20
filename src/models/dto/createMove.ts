interface ICreateMove {
	playerId: string;
	xCoord: number;
	yCoord: number;
}

class CreateMove implements ICreateMove {
	playerId: string;
	xCoord: number;
	yCoord: number;

	constructor(playerId: string, xCoord: number, yCoord: number) {
		this.playerId = playerId;
		this.xCoord = xCoord;
		this.yCoord = yCoord;
	}
}

export { CreateMove, ICreateMove };
