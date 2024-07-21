import React from "react";
import { IFormState } from "../../models/common";
import { CreateMove } from "../../models/dto/createMove";
import { makeamove } from "../../services/gameService";
import auth from "../../services/authService";
import GameBoard from "./gameBoard";

interface GameContainerProps {
  data: {
    winnerId: string;
    _id: string;
  };
  onPlay: any;
  style?: {
    [key: string]: any;
  };
}

interface GameContainerState extends IFormState {}

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

  /**
   * Component lifecycle method that is called after the component is mounted.
   *
   */
  async componentDidMount() {
    const { data } = this.props;
    this.setState({ data });
  }

  /**
   * Updates the component state with new data if the data in props has changed.
   *
   * @param {GameContainerProps} prevProps - The previous props of the component.
   * @return {void}
   */
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
      let result: any = await makeamove(
        this.state.data._id,
        new CreateMove(user._id, x, y)
      );
      delete result.data.__v;
      this.setState({ data: result.data });
      this.props.onPlay(result.data, "data");

      if (
        result.data.isAgainstPC === true &&
        result.data.moves[result.data.moves.length - 1].playerId !== "PC" &&
        !result.data.winnerId
      ) {
        //delay for 2 seconds
        result = await makeamove(
          this.state.data._id,
          new CreateMove("PC", -1, -1)
        );
      }
      delete result.data.__v;
      this.setState({ data: result.data });
      this.props.onPlay(result.data, "data");
    } catch (ex: any) {
      this.props.onPlay(ex, "error");
    }
  };

  /**
   * Renders the game container component.
   *
   * @return {JSX.Element} The rendered game container component.
   */
  render() {
    const { data } = this.state;
    return (
      <React.Fragment>
        <div className="row">
          <div className="col-2" />
          <div className="col-8">
            <center>
              <table className="regularTable gameTable">
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
