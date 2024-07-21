import React, { ReactNode } from "react";
import { RouteComponentProps } from "react-router-dom";
import GameContainer from "../game/gameContainer";
import { joingame, getgame } from "../../services/gameService";
import ErrorComponent from "../common/error";
import { getnickname } from "../../services/userService";
import { toCapitalCase } from "../../utils/helpers";
import { socketServer } from "../../servers/socketServer";
import DialogComponent from "./../common/dialog";

interface MatchParams {
  id: string;
}

interface PlayGameProps extends RouteComponentProps<MatchParams> {}

class PlayGame extends React.Component<PlayGameProps> {
  state = {
    data: {
      winnerId: "",
      _id: "",
    },
    error: null,
    winner: "",
    gameStatus: "waiting",
    displayDialog: true,
  };

  handlePlay = async (data: any, type: string) => {
    if (type === "data") socketServer.emit("move", data);
    else {
      const error = this.generateError(data);
      if (this.state.gameStatus === "finished") {
        error.errorCode = "401";
        error.message = "That game has already been finished.";
      }
      this.setState({ error });
    }
  };

  handleErrorClose = () => {
    if (
      (this.state.error as any).errorCode !== "400" &&
      (this.state.error as any).errorCode !== "405"
    )
      this.props.history.replace("/games");
    this.setState({ error: null });
  };

  handleDialogCLose = () => {
    const displayDialog = false;
    this.setState({ displayDialog });
  };

  /**
   * Asynchronously loads data for the component based on the provided ID.
   *
   * @return {Promise<void>} Promise that resolves once the data is loaded
   */
  async loadData() {
    const { id } = this.props.match.params;
    try {
      let result = await getgame(id);
      if (this.state.gameStatus !== "finished") {
        result = await joingame(id);
        socketServer.emit("join", result.data);
      }
      this.setState({ data: result.data });
    } catch (ex: any) {
      this.setState({ data: {}, error: this.generateError(ex) });
    }
  }

  /**
   * Generates an error object based on the provided error message.
   *
   * @param {any} error - The error message to generate the error object from.
   * @return {Object} An object containing the error code and corresponding error message.
   */
  generateError(error: any) {
    const wordsFromErrorMessage = error.toString().split(" ");
    const errorCode = wordsFromErrorMessage[wordsFromErrorMessage.length - 1];
    let message = "";
    switch (errorCode) {
      case "400":
        message = "That move has already been played. Choose another one.";
        break;
      case "401":
        message = "That game has already been finished.";
        break;
      case "403":
        message = "That game already has all players and you cannot play.";
        break;
      case "404":
        message =
          "That game does not exist. Try joining another, or creating one!";
        break;
      case "405":
        message =
          "It's not your turn! Wait for the other player to make a move.";
        break;
      default:
        message = "An unknown error";
    }
    return { errorCode, message };
  }

  async componentDidMount() {
    if (this.state.gameStatus !== "finished") await this.loadData();

    socketServer.on("playerJoined", (data) => {
      this.setState({ gameStatus: data });
    });

    socketServer.on("playerLeft", (data) => {
      if (this.state.gameStatus !== "finished")
        this.setState({ gameStatus: data });
    });

    socketServer.on("gamefinished", async (data) => {
      const winner =
        data.winnerId === "Draw"
          ? "Draw"
          : data.winnerId === "PC"
          ? "PC"
          : (await getnickname(data.winnerId)).data;
      this.setState({ data, gameStatus: "finished", winner });
    });

    socketServer.on("next", (data) => {
      this.setState({ data });
    });
  }

  async componentWillUnmount() {
    socketServer.emit("leave", this.state.data._id);
  }

  render(): ReactNode {
    const { data, error, winner, gameStatus, displayDialog } = this.state;
    return (
      <React.Fragment>
        {error && (
          <ErrorComponent onClose={this.handleErrorClose} error={error} />
        )}
        {gameStatus !== "left" &&
          gameStatus !== "waiting" &&
          (!error ||
            ((error as { errorCode: string; message: string }).errorCode !==
              "401" &&
              (error as { errorCode: string; message: string }).errorCode !==
                "405")) && (
            <div style={{ textAlign: "center" }}>
              <h1 style={{ paddingBottom: "30px" }}>Play the game!</h1>
              <GameContainer data={data} onPlay={this.handlePlay} />
            </div>
          )}
        {gameStatus === "waiting" && !error && (
          <React.Fragment>
            <h1>Game ID: {data._id}</h1>
            <h1>Waiting for another player to join...</h1>
          </React.Fragment>
        )}
        {gameStatus === "left" && !error && (
          <h1>Your opponent left. You cannot finish the game alone.</h1>
        )}
        {gameStatus === "finished" &&
          !error &&
          winner !== "Draw" &&
          displayDialog && (
            <DialogComponent
              title={"We have a winner!"}
              message={`It's ${toCapitalCase(winner)}!`}
              onClose={this.handleDialogCLose}
            />
          )}
        {gameStatus === "finished" &&
          !error &&
          winner === "Draw" &&
          displayDialog && (
            <DialogComponent
              title={"Winner could not be determined."}
              message={`It's a draw`}
              onClose={this.handleDialogCLose}
            />
          )}
      </React.Fragment>
    );
  }
}

export default PlayGame;
