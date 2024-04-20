import { Move } from "../entity/move";

interface IGetGameHistory {
	gameId: string;
	creatorId: string;
	isAgainsPC: boolean;
	moves: Move[];
	opponendId: string;
	winnerId: string;
}

class GetGameHistory implements IGetGameHistory {
	gameId: string;
	creatorId: string;
	isAgainsPC: boolean;
	moves: Move[];
	opponendId: string;
	winnerId: string;

	constructor(
		gameId: string,
		creatorId: string,
		isAgainstPC: boolean,
		moves: Move[],
		opponendId: string,
		winnerId: string
	) {
		this.gameId = gameId;
		this.creatorId = creatorId;
		this.isAgainsPC = isAgainstPC;
		this.moves = moves;
		this.opponendId = opponendId;
		this.winnerId = winnerId;
	}
}

export { GetGameHistory, IGetGameHistory };
