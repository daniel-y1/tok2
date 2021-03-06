'use strict';
import React from 'react';
import './balloon.css';

export default class BalloonGame extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      players: []
    };

    for(let i = 0; i < props.players.length; i++) {
      this.state.players.push({
        id: this.props.players[i].id,
        score: this.props.players[i].score,
        balloonState: this.props.players[i].balloonState,
        balloonScore: this.props.players[i].balloonScore,
        characterState: this.props.players[i].balloonScore
      })
    }
    console.log(this.state);

    this.props.comm;
    this.props.comm.ongamemessage = (players) => {
      this.updatePlayerState(players);
    };
  }

  updatePlayerState(msg) {
    let players = this.state.players.slice();
    this.setState({
      players: players
    });
  }

  renderPlayerSpace(id) {
    console.log(id);
    if(this.props.players[id]){
      return <PlayerSpace
        id={"player-" + id.toString()}
        score={this.props.players[id].score}
        balloonState={this.props.players[id].balloonState}
        characterState={this.props.players[id].characterState}
      />
    } else {
      return null;
    }
  }

  render() {
    return (
      <div className="row">
        {this.renderPlayerSpace(0)}
        {this.renderPlayerSpace(1)}
        {this.renderPlayerSpace(2)}
      </div>
    );
  }
}

class PlayerSpace extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="player-space col-md-4">
        <Character
          id={this.props.id}
          state={this.props.characterState}
        />
        <Balloon 
          id={this.props.id}
          state={this.props.balloonState}
        />
      </div>
    );
  }
}

class Balloon extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      size: this.props.state * 50
    }
  }

  render() {
    return (
      <div 
        className="balloon"
        style={{
          width: this.state.size,
          height: this.state.size
        }}
      >      
      </div>
    );
  }
}

class Character extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      height: this.props.state * 100
    }
  }

  render() {
    return (
      <div 
        className="character"
        style={{
          height: this.state.height,
          width: 100
        }}
      >      
      </div>
    );
  }
}