import React from "react";
import { FormState } from "../../models/common";
import { CreateMove } from "../../models/dto/createMove";
import { makeamove } from "../../services/gameService";
import auth from "../../services/authService";
import GameBoard from "./gameBoard";

interface GameContainerProps {
	data: any;
	onPlay: any;
	style?: {
		[key: string]: any;
	};
}

interface GameContainerState extends FormState {}

class GameContainer extends React.Component<
	GameContainerProps,
	GameContainerState
> {
	state = {
		data: {
			creatorId: "",
			isAgainstPC: false,
			moves: [],
			opponentId: "",
			winnerId: "",
			_id: "",
		},
		errors: {},
	};

	async componentDidMount() {
		const { data } = this.props;
		this.setState({ data });
	}

	async componentDidUpdate(prevProps: GameContainerProps) {
		if (prevProps.data !== this.props.data) {
			const { data } = this.props;
			this.setState({ data });
		}
	}

	makeAMove = async (coords: string) => {
		try {
			const x = +coords[0];
			const y = +coords[1];
			const user: any = auth.getCurrentUser();
			const result: any = await makeamove(
				this.state.data._id,
				new CreateMove(user._id, x, y)
			);
			delete result.data.__v;
			this.setState({ data: result.data });
			this.props.onPlay(result.data, "data");
		} catch (ex: any) {
			this.props.onPlay(ex, "error");
		}
	};

	render() {
		const { data } = this.state;
		return (
			<React.Fragment>
				<div className="row">
					<div className="col-2" />
					<div className="col-8">
						<center>
							<table className="gameTable">
								<GameBoard data={data} makeAMove={this.makeAMove} />
							</table>
						</center>
					</div>
				</div>
				<div className="col-2" />
			</React.Fragment>
		);
	}
}

export default GameContainer;
