import React from 'react';
import Button from '../common/button';
import Form from '../common/form';
// @ts-ignore
import Joi from 'joi-browser';

class Games extends Form {
  state = {
    data: {
      gameId: '',
    },
    errors: {},
  };

  handleClick = (e: any) => {
    switch (e.target.name) {
      case 'againstPC':
        window.location.href = '/games/againstpc';
        break;
      case 'againstPlayer':
        window.location.href = '/games/againstplayer';
        break;
      default:
        window.location.href = `/games/play/${this.state.data.gameId}`;
        break;
    }
  };

  schema = {
    gameId: Joi.string(),
  };

  doSubmit() {
    console.log('Joining game...');
  }

  render() {
    return (
      <React.Fragment>
        <h1 style={{ marginBottom: 50, textAlign: 'center' }}>
          What would you like to do?
        </h1>
        <div className="row">
          <div className="col-3" />
          <div className="col-6">
            <Button
              name={'againstPC'}
              onClick={this.handleClick}
              label={'Create a game against PC'}
            />
          </div>
          <div className="col-3" />
        </div>
        <div className="row">
          <div className="col-3" />
          <div className="col-6">
            <Button
              name={'againstPlayer'}
              onClick={this.handleClick}
              label={'Create a game against other player'}
            />
          </div>
          <div className="col-3" />
        </div>
        <div className="row">
          <div className="col-5" />
          <div className="col-2">
            <h1 style={{ textAlign: 'center' }}>OR</h1>
          </div>
          <div className="col-5" />
        </div>
        <div className="row">
          <div className="col-3" />
          <div className="col-6">
            <form>{this.renderInput('gameId', 'Game ID')}</form>
          </div>
          <div className="col-3" />
        </div>
        <div className="row">
          <div className="col-3" />
          <div className="col-6">
            <Button
              name={'join'}
              onClick={this.handleClick}
              label={'Join an existing game'}
            />
          </div>
          <div className="col-3" />
        </div>
      </React.Fragment>
    );
  }
}

export default Games;
