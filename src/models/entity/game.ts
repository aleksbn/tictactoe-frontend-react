import { Move } from "./move";

interface IGame {
	_id?: string | null;
	creatorId: string;
	isAgainstPC: boolean;
	opponentId?: string | null;
	winnerId?: string | null;
	moves?: Move[] | null;
}

class Game implements IGame {
	_id?: string | null;
	creatorId: string;
	isAgainstPC: boolean;
	opponentId?: string | null;
	winnerId?: string | null;
	moves?: Move[] | null;

	constructor(creatorId: string, isAgainstPC: boolean) {
		this.creatorId = creatorId;
		this.isAgainstPC = isAgainstPC;
	}
}

export { Game, IGame };
